import clientPromise from "../../lib/mongodb";
import { CountryMetrics, M49_subregion } from "../data/types";

interface BasicData {
	metric: CountryMetrics;
	grouping: "world" | "allRegions";
}

interface SingleRegionData {
	metric: CountryMetrics;
	grouping: "singleRegion";
	region: M49_subregion;
}

const _getMetricForSingleRegion = async (
	metric: CountryMetrics,
	region: M49_subregion
) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const result = await collection
		.find(
			{ region: region },
			{ projection: { _id: 0, name: 1, [`${metric}`]: 1 } }
		)
		.toArray();

	return result;
};

const _getMetricPerRegion = async (metric: CountryMetrics) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const result = await collection
		.aggregate([
			{ $match: { [`${metric}`]: { $exists: true } } },
			{
				$project: {
					_id: 0,
					region: "$region",
					spec: { $objectToArray: [`$${metric}`] },
				},
			},
			{ $unwind: "$spec" },
			{
				$project: {
					region: "$region",
					key: "$spec.k",
					val: { $toDouble: "$spec.v" },
				},
			},
			{
				$group: {
					_id: {
						region: "$region",
						key: "$key",
					},
					val: { $avg: "$val" },
				},
			},
			{
				$group: {
					_id: "$_id.region",
					val: {
						$push: {
							k: "$_id.key",
							v: "$val",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					region: "$_id",
					years: { $arrayToObject: "$val" },
				},
			},
		])
		.toArray();

	return result;
};

const _getMetricWorldwide = async (metric: CountryMetrics) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const result = await collection
		.find(
			{},
			{
				projection: {
					_id: 0,
					name: 1,
					[`${metric}`]: 1,
				},
			}
		)
		.toArray();

	return result;
};

export const getWorldAvg = async (metric: CountryMetrics) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const result = await collection
		.aggregate([
			{
				$project: {
					_id: 0,
					region: "$region",
					spec: { $objectToArray: [`$${metric}`] },
				},
			},
			{ $unwind: "$spec" },
			{
				$group: {
					_id: "$spec.k",
					val: { $avg: "$spec.v" },
				},
			},
		])
		.toArray();

	return result;
};

export const getMinAndMaxCountries = async (
	metric: CountryMetrics,
	region?: M49_subregion
) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const max = await collection
		.find({ [`${metric}`]: { $ne: null } })
		.sort({ [`${metric}`]: -1 })
		.limit(1)
		.toArray();

	const min = await collection
		.find({ [`${metric}`]: { $ne: null } })
		.sort({ [`${metric}`]: 1 })
		.limit(1)
		.toArray();

	const maxVal = max[0];
	const minVal = min[0];
	return {
		max: { country: maxVal.name, val: maxVal[metric!] },
		min: { country: minVal.name, val: minVal[metric!] },
	};
};

export const getMetric = async (fields: BasicData | SingleRegionData) => {
	const { metric, grouping } = fields;
	switch (grouping) {
		case "singleRegion":
			const { region } = fields;
			return _getMetricForSingleRegion(metric, region);
		case "allRegions":
			return _getMetricPerRegion(metric);
		case "world":
			return _getMetricWorldwide(metric);
	}
};

/** only needed if data is being imported from CSV
 * Because of the way mongo imports, you cannot import objects and it uses single quotes
 * in order to get object data, we need to convert single quotes to double quotes and JSON parse
 * the result. Then we need to convert undefined and numeric values to be undefined and floats, respectively
 *
 * There is potentially a more efficient way todo this, but this is never run in production.
 * Also, I created the mongodb equivalent aggregatio using $function but it requires a paid tier and I dont wanna pay!
 **/

export const cleanseData = async () => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	collection.find().forEach((item) => {
		Object.keys(item).forEach((key) => {
			let s = String(item[key]).replace(/'/g, '"');
			let obj: { [key: string]: any } = {};

			if (s.includes("{"))
				try {
					obj = JSON.parse(s);
					Object.keys(obj).forEach((k) => {
						if (obj[k] === "undefined") obj[k] = undefined;
						if (parseInt(obj[k])) obj[k] = parseFloat(obj[k]);
						if (obj[k] === "...") obj[k] = undefined;
					});
					item[key] = obj;
				} catch (e) {
					console.log("parsing error " + item[key]);
				}
			collection.findOneAndReplace({ _id: item._id }, item);
		});
	});
};
