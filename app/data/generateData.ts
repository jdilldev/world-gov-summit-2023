import _ from "lodash";
import data, { source_data_obj as dataObj } from "./source_data";
import {
	CountryProfile,
	M49_subregion,
	M49_subregions,
	CountryMetrics,
	AggregatorType,
	CategoricalData,
	ChartInputs,
	ChartType,
	HierarchicalData,
	LinearData,
	PercentileData,
	RegionCountries,
} from "./types";

const extractMetricValue = (
	country: CountryProfile,
	metric: CountryMetrics
): number | false => {
	const metricValue = country[metric];

	if (!metricValue) return false;

	return typeof metricValue === "string"
		? parseFloat(metricValue as string)
		: (metricValue as number);
};

const getAllRegions = (): RegionCountries => {
	const countriesByRegion: RegionCountries = {};
	for (const key of M49_subregions) {
		const countries = data
			.filter((country) => country.region && country.region === key)
			.map((country) => country);

		countriesByRegion[key] = countries;
	}

	return countriesByRegion;
};

const COUNTRIES_BY_REGION = getAllRegions();

const getSpecificRegions = (specificRegions = [] as M49_subregion[]) => {
	if (specificRegions.length === 0) return COUNTRIES_BY_REGION;
	const filteredRegions = Object.keys(COUNTRIES_BY_REGION)
		.filter((region) => specificRegions.includes(region))
		.reduce(
			(acc, currRegion) => ({
				...acc,
				[currRegion]: COUNTRIES_BY_REGION[currRegion],
			}),
			{} as RegionCountries
		);

	return filteredRegions;
};

const getAggregatorIndicies = (
	aggregator: AggregatorType,
	regions = [] as M49_subregion[]
) => {
	switch (aggregator) {
		case "world":
		case "country":
			return dataObj;
		case "multiRegions":
		case "singleRegion":
			return getSpecificRegions(regions);
	}
};

// supports multiple metrics
// does not support world (all indiviuda)
const generateLinearData = (inputs: ChartInputs) => {
	let linearData: LinearData[] = [];

	const { aggregator, metrics, regions } = inputs;
	const r = getAggregatorIndicies(aggregator, regions) as RegionCountries;

	//if it's a single region, we want to index by country; otherwise, get avg of all regions or specified regions
	if (regions && aggregator === "singleRegion") {
		const region = regions[0];
		linearData = r[region].reduce((acc, currCountry) => {
			const tmp: { x: string; y: number }[] = [];
			metrics.forEach((metric) => {
				const extractedVal = extractMetricValue(currCountry, metric);

				if (extractedVal) tmp.push({ x: metric, y: extractedVal });
			});
			acc.push({ id: currCountry.name, data: tmp });
			return acc;
		}, [] as LinearData[]);
	} else if (aggregator === "multiRegions") {
		linearData = Object.keys(r).reduce((acc, currRegion) => {
			let val = 0;
			let total = 0;
			const tmp: { x: string; y: number }[] = [];

			metrics.forEach((metric) => {
				r[currRegion].forEach((country) => {
					const extractedVal = extractMetricValue(country, metric);

					if (extractedVal) {
						total++;
						val += extractedVal;
					}
				});
				tmp.push({ x: metric, y: val / total });
			});
			acc.push({ id: currRegion, data: tmp });

			return acc;
		}, [] as LinearData[]);
	} else if (aggregator === "world") {
		data.forEach((country) => {
			const tmp: { x: string; y: number }[] = [];

			for (const metric of metrics) {
				const extractedVal = extractMetricValue(country, metric);

				if (extractedVal) tmp.push({ x: metric, y: extractedVal });
			}

			linearData.push({ id: country.name, data: tmp });
		});
	}

	return linearData;
};

//supports a single metric
const generateHierarchicalData = (inputs: ChartInputs) => {
	let hierarchicalData = {
		id: "world",
		value: 0,
		children: [],
	} as HierarchicalData;

	const { aggregator, metrics, regions } = inputs;

	const metric = metrics[0];
	const r = getAggregatorIndicies(aggregator, regions) as RegionCountries;

	if (aggregator === "world") {
		data.forEach((country) => {
			const extractedVal = extractMetricValue(country, metric);

			if (extractedVal)
				hierarchicalData.children.push({
					id: country.name,
					value: extractedVal,
					children: [],
				});
		});
	} else if (aggregator === "multiRegions") {
		Object.keys(r).reduce((acc, currRegion) => {
			let val = 0;
			let total = 0;

			r[currRegion].forEach((country) => {
				const extractedVal = extractMetricValue(country, metric);

				if (extractedVal) {
					total++;
					val += extractedVal;
				}
			});
			const regionalAvg = val / total;
			acc.children.push({ id: currRegion, value: regionalAvg, children: [] });
			return acc;
		}, hierarchicalData);
	} else if (regions && aggregator === "singleRegion") {
		const region = regions[0];

		r[region].forEach((country) => {
			const extractedVal = extractMetricValue(country, metric);

			if (extractedVal)
				hierarchicalData.children.push({
					id: country.name,
					value: extractedVal,
					children: [],
				});
		});
	}

	hierarchicalData.value = hierarchicalData.children.reduce(
		(acc, curr) => (curr.value ? (acc += curr.value) : (acc += 0)),
		0
	);
	return hierarchicalData;
};

// supports a single metric
const generatePercentileData = (inputs: ChartInputs) => {
	let percentileData: PercentileData[] = [];

	const { aggregator, metrics, regions } = inputs;
	const metric = metrics[0];
	const r = getAggregatorIndicies(aggregator, regions) as RegionCountries;

	if (aggregator === "world") {
		data.forEach((country) => {
			const extractedVal = extractMetricValue(country, metric);

			if (extractedVal)
				percentileData.push({ id: country.name, value: extractedVal });
		});
	} else if (aggregator === "multiRegions") {
		percentileData = Object.keys(r).reduce((acc, currRegion) => {
			let val = 0;
			let total = 0;

			r[currRegion].forEach((country) => {
				const extractedVal = extractMetricValue(country, metric);

				if (extractedVal) {
					total++;
					val += extractedVal;
				}
			});
			const regionalAvg = val / total;
			acc.push({ id: currRegion, value: regionalAvg });
			return acc;
		}, [] as PercentileData[]);
	} else if (regions && aggregator === "singleRegion") {
		const region = regions[0];

		r[region].forEach((country) => {
			const extractedVal = extractMetricValue(country, metric);

			if (extractedVal)
				percentileData.push({ id: country.name, value: extractedVal });
		});
	}

	return percentileData;
};

//supports multiple metrics
const generateCategoricalData = (inputs: ChartInputs) => {
	let categoricalData: CategoricalData[] = [];
	const { aggregator, metrics, regions } = inputs;
	const r = getAggregatorIndicies(aggregator, regions) as RegionCountries;

	switch (aggregator) {
		case "world":
			data.forEach((country) => {
				const tmp: { [key: string]: number | string } = {};

				for (const metric of metrics) {
					const extractedVal = extractMetricValue(country, metric);

					if (extractedVal) tmp[metric] = extractedVal;
				}
				tmp["country"] = country.name;
				categoricalData.push(tmp);
			});
			break;
		case "multiRegions":
			categoricalData = Object.keys(r).reduce((acc, currRegion) => {
				let val = 0;
				let total = 0;
				const tmp: { [key: string]: number | string } = {};

				metrics.forEach((metric) => {
					r[currRegion].forEach((country) => {
						const extractedVal = extractMetricValue(country, metric);

						if (extractedVal) {
							total++;
							val += extractedVal;
						}
					});
					const avgVal = val / total;
					tmp[metric] = avgVal;
				});
				tmp["name"] = currRegion;
				acc.push(tmp);

				return acc;
			}, [] as CategoricalData[]);
			break;
		case "singleRegion":
			if (!regions || regions.length !== 1)
				throw Error(
					"a single region must be defined in the regions array for a singleRegion chart"
				);
			const region = regions[0];
			categoricalData = r[region].reduce((acc, currCountry) => {
				const tmp: { [key: string]: number | string } = {};
				metrics.forEach((metric) => {
					const extractedVal = extractMetricValue(currCountry, metric);

					if (extractedVal) tmp[metric] = extractedVal;
				});
				tmp["country"] = currCountry.name;
				acc.push(tmp);

				return acc;
			}, [] as CategoricalData[]);
			break;
		default:
			throw Error("unmatched case");
	}

	return categoricalData;
};

export const getWorldAvg = (metric: CountryMetrics) => {
	let totalCountries = 0;
	const totalVal = data.reduce((acc, curr) => {
		const extractedVal = extractMetricValue(curr, metric);

		if (extractedVal) {
			totalCountries++;
			acc += extractedVal;
		}

		return acc;
	}, 0);

	return totalVal / totalCountries;
};

const getRegion = (region: M49_subregion) => COUNTRIES_BY_REGION[region];

export const getMax = (
	metric: CountryMetrics,
	geographicArea: "world" | M49_subregion
) => {
	let countryName = "";
	let maxValue = Number.MIN_SAFE_INTEGER;
	let countries = geographicArea === "world" ? data : getRegion(geographicArea);

	countries.forEach((country) => {
		const checkVal = extractMetricValue(country, metric);
		if (checkVal && checkVal > maxValue) {
			maxValue = checkVal;
			countryName = country.name;
		}
	});
	return { country: countryName, value: maxValue };
};

export const getMin = (
	metric: CountryMetrics,
	geographicArea: "world" | M49_subregion
) => {
	let countryName = "";
	let minValue = Number.MAX_SAFE_INTEGER;
	let countries = geographicArea === "world" ? data : getRegion(geographicArea);

	countries.forEach((country) => {
		const checkVal = extractMetricValue(country, metric);
		if (checkVal && checkVal < minValue) {
			minValue = checkVal;
			countryName = country.name;
		}
	});
	return { country: countryName, value: minValue };
};

export const countNumberOfIncreaseAndDecrease = (
	metric: CountryMetrics,
	geographicArea: "world" | M49_subregion
) => {
	let countries = geographicArea === "world" ? data : getRegion(geographicArea);
	let increased = 0;
	let decreased = 0;

	countries.forEach((country) => {
		const checkVal = extractMetricValue(country, metric);

		if (checkVal) {
			if (checkVal > 0) increased++;
			if (checkVal < 0) decreased++;
		}
	});
	return { increased, decreased };
};

export const retrieveData = (inputs: ChartInputs, type: ChartType) => {
	switch (type) {
		case "linear":
			return generateLinearData(inputs);
		case "hierarchical":
			return generateHierarchicalData(inputs);
		case "percentile":
			return generatePercentileData(inputs);
		case "categorical":
			return generateCategoricalData(inputs);
		default:
			throw Error("trying to create a Chart of an invalid type");
	}
};
