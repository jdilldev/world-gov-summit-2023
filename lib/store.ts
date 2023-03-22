import { create } from "zustand";
import {
	DEFAULT_THEME_PROMPT,
	WORLD_SUMMIT_THEMES,
} from "../app/constants/constants";
import { CountryMetrics, M49_subregion, SortType } from "../app/data/types";

type DataGrouping = "world" | "allRegions" | "singleRegion";

type State = {
	sortOrder: SortType;
	filter: string;
	hideMissingData: boolean;
};

type Actions = {
	setFilter: (updatedFilter: string) => void;
	setHideMissingData: (updatedVal: boolean) => void;
	setSortOrder: (updatedSortOrder: SortType) => void;
};

export const useGlobalStore = create<State & Actions>((set) => ({
	sortOrder: "descending",
	filter: "",
	hideMissingData: false,
	setFilter: (updatedFilter: string) => set(() => ({ filter: updatedFilter })),
	setHideMissingData: (updatedVal: boolean) =>
		set(() => ({ hideMissingData: updatedVal })),
	setSortOrder: (updatedOrder: SortType) =>
		set(() => ({ sortOrder: updatedOrder })),
}));
