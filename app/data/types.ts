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

export type AggregatorType =
	| "world"
	| "multiRegions"
	| "singleRegion"
	| "country";

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
	gii?: number;
	gini?: number;
	seda?: number;
	population: string;
	health_expenditure_per_person?: number;
	access_to_electricity?: number;
	government_gdp?: number;
	military_gdp?: string;
	inflation?: number;
	"2016_happy_planet_index"?: number;
	"2019_happy_planet_index"?: number;
	"2017_HDI"?: number;
	"2021_HDI"?: number;
	"2018_economic_growth"?: number;
	"2021_economic_growth"?: number;
	"2020_infant_mortality"?: number;
	"2017_health_gdp"?: number;
	"2018_health_gdp"?: number;
	"2019_health_gdp"?: number;
	"2018_education_gdp"?: number;
	"2021_education_gdp"?: number;
	"2018_primary_school_aged_kids_out"?: number;
	"2021_primary_school_aged_kids_out"?: number;
	"2018_unemployment"?: number;
	"2021_unemployment"?: number;
	"2017_regulatory_quality"?: number;
	"2021_regulatory_quality"?: number;
	"2017_rule_of_law"?: number;
	"2021_rule_of_law"?: number;
	"2017_control_of_corruption"?: number;
	"2021_control_of_corruption"?: number;
	"2017_political_instability"?: number;
	"2021_political_instability"?: number;
	"2017_government_effectiveness"?: number;
	"2021_government_effectiveness"?: number;
	"2018_government_integrity"?: number;
	"2022_government_integrity"?: number;
	"2019_CO2e_emissions_per_capita"?: number;
	"2015_electricity_from_renewables"?: string;
	"2020_electricity_from_renewables"?: string;
};

export type CountryMetrics = keyof CountryProfile;

export const M49_subregions = [
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
