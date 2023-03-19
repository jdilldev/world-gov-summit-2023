import { create } from "zustand";
import {
	DEFAULT_THEME_PROMPT,
	WORLD_SUMMIT_THEMES,
} from "../app/constants/constants";
import { CountryMetrics, M49_subregion } from "../app/data/types";

type DataGrouping = "world" | "allRegions" | "singleRegion";

type State = {
	filter: string;
	hideMissingData: boolean;
	theme: string;
	region: M49_subregion;
	metric: CountryMetrics;
	grouping: DataGrouping;
};

type Actions = {
	setFilter: (updatedFilter: string) => void;
	setHideMissingData: (updatedVal: boolean) => void;
	setTheme: (updatedTheme: string) => void;
	setRegion: (updatedRegion: M49_subregion) => void;
	setMetric: (updatedMetric: CountryMetrics) => void;
	setGrouping: (
		updatedGrouping: "world" | "allRegions" | "singleRegion"
	) => void;
};

export const useGlobalStore = create<State & Actions>((set) => ({
	filter: "",
	theme: DEFAULT_THEME_PROMPT,
	region: "",
	metric: undefined,
	grouping: "world",
	hideMissingData: false,
	setFilter: (updatedFilter: string) => set(() => ({ filter: updatedFilter })),
	setHideMissingData: (updatedVal: boolean) =>
		set(() => ({ hideMissingData: updatedVal })),
	setTheme: (updatedTheme: string) => set(() => ({ theme: updatedTheme })),
	setRegion: (updatedRegion: M49_subregion) =>
		set(() => ({ region: updatedRegion })),
	setMetric: (updatedMetric: CountryMetrics) =>
		set(() => ({ metric: updatedMetric })),
	setGrouping: (updatedGrouping: DataGrouping) =>
		set(() => ({ grouping: updatedGrouping })),
}));
