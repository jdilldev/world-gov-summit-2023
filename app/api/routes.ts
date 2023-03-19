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
		.aggregate([
			{ $match: { region: `${region}` } },
			{
				$project: {
					country: "$name",
					spec: { $objectToArray: [`$${metric}`] },
				},
			},
			{ $unwind: "$spec" },
			{
				$project: {
					country: "$country",
					key: "$spec.k",
					val: { $toDouble: "$spec.v" },
				},
			},
			{
				$group: {
					_id: "$country",
					val: {
						$push: {
							k: "$key",
							v: "$val",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					country: "$_id",
					years: { $arrayToObject: "$val" },
				},
			},
		])
		.toArray();

	return result as { year: string; val: number }[];
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

	return result as { year: string; val: number }[];
};

const _getMetricWorldwide = async (metric: CountryMetrics) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const result = await collection
		.aggregate([
			{
				$project: {
					_id: 0,
					country: "$name",
					spec: { $objectToArray: [`$${metric}`] },
				},
			},
			{ $unwind: "$spec" },
			{
				$project: {
					country: "$country",
					key: "$spec.k",
					val: { $toDouble: "$spec.v" },
				},
			},
			{
				$group: {
					_id: "$country",
					val: {
						$push: {
							k: "$key",
							v: "$val",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					country: "$_id",
					years: { $arrayToObject: "$val" },
				},
			},
		])
		.toArray();

	return result as { year: string; val: number }[];
};

const _getRegionAvg = async (metric: CountryMetrics, region: M49_subregion) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const result = await collection
		.aggregate([
			{ $match: { region: { $eq: region } } },
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
					year: "$spec.k",
					val: { $toDouble: "$spec.v" },
				},
			},
			{
				$group: {
					_id: "$year",
					val: { $avg: "$val" },
				},
			},
			{
				$sort: {
					_id: -1,
				},
			},
			{
				$project: {
					_id: 0,
					year: "$_id",
					val: "$val",
				},
			},
		])
		.toArray();

	return result;
};

const _getWorldAvg = async (metric: CountryMetrics) => {
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
				$project: {
					key: "$spec.k",
					val: { $toDouble: "$spec.v" },
				},
			},
			{
				$group: {
					_id: "$key",
					val: { $avg: "$val" },
				},
			},
			{
				$sort: {
					_id: -1,
				},
			},
			{
				$project: {
					_id: 0,
					year: "$_id",
					val: "$val",
				},
			},
		])
		.toArray();

	return result;
};

export const getAvg = async (fields: BasicData | SingleRegionData) => {
	const { metric, grouping } = fields;

	switch (grouping) {
		case "world":
		case "allRegions":
			return _getWorldAvg(metric);
		case "singleRegion":
			const { region } = fields;
			return _getRegionAvg(metric, region);
	}
};

const _getMinAndMaxCountries = async (
	metric: CountryMetrics,
	region?: M49_subregion
) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const pipeline: any[] = [
		{
			$project: {
				_id: 0,
				name: "$name",
				spec: { $objectToArray: [`$${metric}`] },
			},
		},
		{ $unwind: "$spec" },
		{ $match: { "spec.v": { $exists: true, $ne: null } } },
		{
			$group: {
				_id: "$spec.k",
				max: { $max: { v: "$spec.v", country: "$name" } },
				min: { $min: { v: "$spec.v", country: "$name" } },
			},
		},
		{
			$project: {
				_id: 0,
				year: "$_id",
				max: "$max",
				min: "$min",
			},
		},
		{ $sort: { year: -1 } },
	];

	if (region) pipeline.unshift({ $match: { region: { $eq: region } } });

	const res = await collection.aggregate(pipeline).toArray();

	return res;
};

const _getMinAndMaxRegions = async (metric: CountryMetrics) => {
	const client = await clientPromise;
	const db = client.db("presentFutureDB");
	const collection = db.collection("data");

	const pipeline: any[] = [
		{
			$project: {
				_id: 0,
				region: "$region",
				spec: { $objectToArray: [`$${metric}`] },
			},
		},
		{ $unwind: "$spec" },
		{ $match: { "spec.v": { $exists: true, $ne: null } } },
		{
			$group: {
				_id: "$spec.k",
				max: { $max: { v: "$spec.v", region: "$region" } },
				min: { $min: { v: "$spec.v", region: "$region" } },
			},
		},
		{
			$project: {
				_id: 0,
				year: "$_id",
				max: "$max",
				min: "$min",
			},
		},
		{ $sort: { year: -1 } },
	];

	const res = await collection.aggregate(pipeline).toArray();

	return res;
};

export const getMinMax = async (fields: BasicData | SingleRegionData) => {
	const { metric, grouping } = fields;

	switch (grouping) {
		case "singleRegion":
			const { region } = fields;
			return _getMinAndMaxCountries(metric, region);
		case "allRegions":
			return _getMinAndMaxRegions(metric);
		case "world":
			return _getMinAndMaxCountries(metric);
	}
};

export const getMetric = async (
	fields: BasicData | SingleRegionData
): Promise<{ year: string; val: number }[]> => {
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

	/* 
		convert gini from string to object 
		collection.find().forEach((item) => {
				collection.findOneAndUpdate(
					{
						_id: item._id,
					},
					{
						$set: {
							gini: {
								varies:
									item.gini.varies.varies.gini.varies.gini.varies.gini.varies.gini
										.varies.gini.varies.gini.varies.gini,
							},
						},
					},
					{
						upsert: true,
					}
				);
			}); */
};
