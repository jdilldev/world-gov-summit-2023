import { SortType } from "../app/data/types";

export const replaceSpacesWithUnderscore = (val: string) =>
	val.replace(/ /g, "_");

export const replaceUnderscoreWithSpace = (val: string) =>
	val.replace(/_/g, " ");

export const sortData = (data: any[], sort: SortType, latestYear: string) => {
	return data.sort((a, b) => {
		const aVal = a.years[latestYear] ?? null;
		const bVal = b.years[latestYear] ?? null;

		// https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
		if (aVal === bVal) {
			return 0;
		}

		// nulls sort after anything else
		if (aVal === null) {
			return 1;
		}
		if (bVal === null) {
			return -1;
		}

		// otherwise, if we're ascending, lowest sorts first
		if (sort === "ascending") {
			return aVal < bVal ? -1 : 1;
		}

		// if descending, highest sorts first
		return aVal < bVal ? 1 : -1;
	});
};
