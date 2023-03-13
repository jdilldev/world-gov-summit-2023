import clientPromise from "../../lib/mongodb";
import { CountryMetrics, M49_subregion } from "../data/types";

export async function GET() {
	const res = await fetch("https://dummyjson.com/products", {});
	const data = await res.json();

	return data;
}

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

const getWorldAvg = async (metric: CountryMetrics) => {
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

export async function get_metric(fields: BasicData | SingleRegionData) {
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
}
