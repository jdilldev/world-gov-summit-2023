import { CountryMetrics, M49_subregion } from "../data/types";
// assets
import Economy from "../../public/icons/global-economy.svg";
import SustainableWorld from "../../public/icons/global-sustainability.svg";
import Health from "../../public/icons/global-health.svg";
import Education from "../../public/icons/global-education.svg";
import Exploring from "../../public/icons/global-connectivity.svg";
import Development from "../../public/icons/009-overpopulation.svg";

export const DEFAULT_THEME_PROMPT = "Select a theme";
export const DEFAULT_REGION = "Select a subregion";
export const CHART_CATEGORY = "CHART";
export const METRIC_CATEGORY = "METRICS";
export const CONTEXT_CATEGORY = "CONTEXT";

export const AGGREGATOR_TO_TITLE = {
	world: "Global",
	multiRegions: "All Regions",
	singleRegion: "Select Region",
};

export const AGGREGATOR_TO_TABLE_HEADING = {
	world: "Country",
	multiRegions: "Region",
	singleRegion: "",
};

export const CHART_MARGINS = { top: 15, right: 20, bottom: 10, left: 20 };

export const PRE_CONTENT_ICON_SIZE =
	"self-center w-8 h-8 md:w-14 md:h-14 lg:w-18 lg:h-18";

export const LIGHT_COLOR = "#78cce2";

export const BRICS = ["Brazil", "Russia", "India", "China", "South Africa"];

export const WORLD_SUMMIT_THEMES: {
	name: string;
	icon: any;
	metrics: CountryMetrics[];
}[] = [
	{
		name: "Accelerating Development and Governance",
		icon: Development,
		metrics: [
			"HDI",
			"government_effectiveness",
			"government_gdp",
			"rule_of_law",
			"political_instability",
			"control_of_corruption",
			"regulatory_quality",
		],
	},
	{
		name: "Global City Design and Sustainability",
		icon: SustainableWorld,
		metrics: [
			//add water sustainability
			"electricity_from_renewables",
			"CO2e_emissions_per_capita",
			"happy_planet_index",
		],
	},
	{
		name: "Exploring the Frontiers",
		icon: Exploring,
		// add space metrics
		metrics: ["gii", "economic_growth"],
	},
	{
		name: "Governing Economic Resilience and Connectivity",
		icon: Economy,
		//add inflation
		metrics: ["gini", "economic_growth"],
	},
	{
		name: "Future of Societies and Healthcare",
		icon: Health,
		//add lifespan
		metrics: ["health_expenditure_per_person"],
	},
	{
		name: "Prioritizing Learning and Work",
		icon: Education,
		metrics: [
			"primary_school_aged_kids_out",
			"unemployment",
			"access_to_electricity",
		],
	},
];

export const UN_PERMANENT = [
	"China",
	"France",
	"Russia",
	"United Kingdom",
	"United States",
];

export const NIVO_THEME = {
	background: "transparent",
	textColor: "#9fd0dcb1",
	fontSize: 12,
	fontFamily: "avenir",
	axis: {
		domain: {
			line: {
				stroke: "#777777",
				strokeWidth: 0,
			},
		},
		legend: {
			text: {
				fontSize: 12,
				fill: "white",
			},
		},
		ticks: {
			line: {
				stroke: "#777777",
				strokeWidth: 0,
			},
			text: {
				fontSize: 11,
				fill: "#9fd0dcb1",
				fontFamily: "avenir",
				fontWeight: 200,
			},
		},
	},
	grid: {
		line: {
			stroke: "rgb(163 163 163)",
			strokeWidth: 0,
		},
	},
	annotations: {
		text: {
			fontSize: 13,
			fill: "red",
			outlineWidth: 2,
			outlineColor: "#ffffff",
			outlineOpacity: 1,
		},
		link: {
			stroke: "#000000",
			strokeWidth: 1,
			outlineWidth: 2,
			outlineColor: "#ffffff",
			outlineOpacity: 1,
		},
		outline: {
			stroke: "#000000",
			strokeWidth: 2,
			outlineWidth: 2,
			outlineColor: "#ffffff",
			outlineOpacity: 1,
		},
		symbol: {
			fill: "#000000",
			outlineWidth: 2,
			outlineColor: "#ffffff",
			outlineOpacity: 1,
		},
	},
	tooltip: {
		container: {
			background: "rgba(0, 70, 102, .8)",
			color: "white",
			fontSize: 13,
			fontWeight: 100,
			fontFamily: "avenir",
		},
	},
};
