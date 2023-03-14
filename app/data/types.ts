export type TooltipPlacement =
	| "bottom"
	| "left"
	| "right"
	| "top"
	| "topStart"
	| "topEnd"
	| "leftStart"
	| "leftEnd"
	| "bottomStart"
	| "bottomEnd"
	| "rightStart"
	| "rightEnd"
	| undefined;

export type ChartDimensions = { width: number; height: number };

export type AggregatorType = "world" | "multiRegions" | "singleRegion";

type YearsOfData = {
	[year: string]: number;
};

export type DataPerCountry = {
	country: string;
	years: YearsOfData;
};

export type DataPerRegion = {
	region: string;
	years: YearsOfData;
};

export type ChartType =
	| "linear"
	| "hierarchical"
	| "percentile"
	| "categorical";

// scatter, radialbar, line, heatmap, bump
export type LinearData = {
	id: string;
	data: { x: string | keyof CountryProfile; y: number }[];
};

// sunburst, circle packing
export type HierarchicalData = {
	id: string;
	value?: number;
	children: HierarchicalData[];
};

// pie, waffle, funnel
export type PercentileData = {
	id: string;
	value: number;
	label?: string;
	color?: string;
	//subregion: M49_subregion;
};

// radar, parallel cooridnates, stream, swarm, bar
export type CategoricalData = {
	[key: string]: number | string;
};

export type ChartDataType =
	| LinearData[]
	| HierarchicalData
	| PercentileData[]
	| CategoricalData[];

export type RegionCountries = { [region: M49_subregion]: CountryProfile[] };

export interface ChartInputs {
	aggregator: AggregatorType;
	metrics: CountryMetrics[];
	regions?: M49_subregion[];
	countries?: Alpha3_country_codes[];
}

export type CountryProfile = {
	iso_3: Alpha3_country_codes;
	name: string;
	region: M49_subregion;
	gii?: { [key: number]: number };
	gini?: { [key: number]: number };
	seda?: { [key: number]: number };
	population: { [key: number]: number };
	health_expenditure_per_person?: { [key: number]: number };
	access_to_electricity?: { [key: number]: number };
	government_gdp?: { [key: number]: number };
	military_gdp?: { [key: number]: number };
	inflation?: { [key: number]: number };
	happy_planet_index?: { [key: number]: number };
	HDI?: { [key: number]: number };
	economic_growth?: { [key: number]: number };
	infant_mortality?: { [key: number]: number };
	health_gdp?: { [key: number]: number };
	education_gdp?: { [key: number]: number };
	primary_school_aged_kids_out?: { [key: number]: number };
	unemployment?: { [key: number]: number };
	regulatory_quality?: { [key: number]: number };
	rule_of_law?: { [key: number]: number };
	control_of_corruption: { [key: number]: number };
	political_instability: { [key: number]: number };
	government_effectiveness?: { [key: number]: number };
	government_integrity?: { [key: number]: number };
	CO2e_emissions_per_capita?: { [key: number]: number };
	electricity_from_renewables?: { [key: number]: number };
};

export type CountryMetrics = keyof CountryProfile | undefined;

export const M49_subregions: string[] = [
	"Northern Africa",
	"Sub-Saharan Africa",
	"Northern America",
	"Latin America and the Caribbean",
	"Central Asia",
	"Eastern Asia",
	"South-eastern Asia",
	"Southern Asia",
	"Western Asia",
	"Eastern Europe",
	"Northern Europe",
	"Southern Europe",
	"Western Europe",
	"Australia and New Zealand",
	"Melanesia",
	"",
];

export type M49_subregion = typeof M49_subregions[number];

export type Alpha3_country_codes =
	| "AFG"
	| "ALA"
	| "ALB"
	| "DZA"
	| "ASM"
	| "AND"
	| "AGO"
	| "AIA"
	| "ATA"
	| "ATG"
	| "ARG"
	| "ARM"
	| "ABW"
	| "AUS"
	| "AUT"
	| "AZE"
	| "BHS"
	| "BHR"
	| "BGD"
	| "BRB"
	| "BLR"
	| "BEL"
	| "BLZ"
	| "BEN"
	| "BMU"
	| "BTN"
	| "BOL"
	| "BIH"
	| "BWA"
	| "BVT"
	| "BRA"
	| "IOT"
	| "BRN"
	| "BGR"
	| "BFA"
	| "BDI"
	| "KHM"
	| "CMR"
	| "CAN"
	| "CPV"
	| "CYM"
	| "CAF"
	| "TCD"
	| "CHL"
	| "CHN"
	| "CXR"
	| "CCK"
	| "COL"
	| "COM"
	| "COG"
	| "COD"
	| "COK"
	| "CRI"
	| "CIV"
	| "HRV"
	| "CUB"
	| "CYP"
	| "CZE"
	| "DNK"
	| "DJI"
	| "DMA"
	| "DOM"
	| "ECU"
	| "EGY"
	| "SLV"
	| "GNQ"
	| "ERI"
	| "EST"
	| "ETH"
	| "FLK"
	| "FRO"
	| "FJI"
	| "FIN"
	| "FRA"
	| "GUF"
	| "PYF"
	| "ATF"
	| "GAB"
	| "GMB"
	| "GEO"
	| "DEU"
	| "GHA"
	| "GIB"
	| "GRC"
	| "GRL"
	| "GRD"
	| "GLP"
	| "GUM"
	| "GTM"
	| "GGY"
	| "GIN"
	| "GNB"
	| "GUY"
	| "HTI"
	| "HMD"
	| "VAT"
	| "HND"
	| "HKG"
	| "HUN"
	| "ISL"
	| "IND"
	| "IDN"
	| "IRN"
	| "IRQ"
	| "IRL"
	| "IMN"
	| "ISR"
	| "ITA"
	| "JAM"
	| "JPN"
	| "JEY"
	| "JOR"
	| "KAZ"
	| "KEN"
	| "KIR"
	| "KOR"
	| "PRK"
	| "KWT"
	| "KGZ"
	| "LAO"
	| "LVA"
	| "LBN"
	| "LSO"
	| "LBR"
	| "LBY"
	| "LIE"
	| "LTU"
	| "LUX"
	| "MAC"
	| "MDG"
	| "MWI"
	| "MYS"
	| "MDV"
	| "MLI"
	| "MLT"
	| "MHL"
	| "MTQ"
	| "MRT"
	| "MUS"
	| "MYT"
	| "MEX"
	| "FSM"
	| "MDA"
	| "MCO"
	| "MNG"
	| "MNE"
	| "MSR"
	| "MAR"
	| "MOZ"
	| "MMR"
	| "NAM"
	| "NRU"
	| "NPL"
	| "NLD"
	| "NCL"
	| "NZL"
	| "NIC"
	| "NER"
	| "NGA"
	| "NIU"
	| "NFK"
	| "MNP"
	| "NOR"
	| "OMN"
	| "PAK"
	| "PLW"
	| "PSE"
	| "PAN"
	| "PNG"
	| "PRY"
	| "PER"
	| "PHL"
	| "PCN"
	| "POL"
	| "PRT"
	| "PRI"
	| "QAT"
	| "MKD"
	| "REU"
	| "ROU"
	| "RUS"
	| "RWA"
	| "BLM"
	| "SHN"
	| "KNA"
	| "LCA"
	| "MAF"
	| "SPM"
	| "VCT"
	| "WSM"
	| "SMR"
	| "STP"
	| "SAU"
	| "SEN"
	| "SRB"
	| "SYC"
	| "SLE"
	| "SGP"
	| "SXM"
	| "SVK"
	| "SVN"
	| "SLB"
	| "SOM"
	| "ZAF"
	| "SGS"
	| "SSD"
	| "ESP"
	| "LKA"
	| "SDN"
	| "SUR"
	| "SJM"
	| "SWZ"
	| "SWE"
	| "CHE"
	| "SYR"
	| "TWN"
	| "TJK"
	| "TZA"
	| "THA"
	| "TLS"
	| "TGO"
	| "TKL"
	| "TON"
	| "TTO"
	| "TUN"
	| "TUR"
	| "TKM"
	| "TCA"
	| "TUV"
	| "UGA"
	| "UKR"
	| "ARE"
	| "GBR"
	| "UMI"
	| "USA"
	| "URY"
	| "UZB"
	| "VUT"
	| "VEN"
	| "VNM"
	| "VGB"
	| "VIR"
	| "WLF"
	| "ESH"
	| "YEM"
	| "ZMB"
	| "ZWE"
	| "XXK";
