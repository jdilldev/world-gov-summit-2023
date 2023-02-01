import { createContext } from "react";

export const BRICS = ["Brazil", "Russia", "India", "China", "South Africa"];

export const DEFAULT_THEME_PROMPT = "Themes";

export const SummitThemeContext = createContext(DEFAULT_THEME_PROMPT);

export const PRE_CONTENT_ICON_SIZE =
	"self-start md:self-center basis-1/3 lg:basis-1/2 mb-2";

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
	fontFamily: "equinox",
	axis: {
		domain: {
			line: {
				stroke: "#777777",
				strokeWidth: 1,
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
				strokeWidth: 1,
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
			strokeWidth: 1,
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
