export type SortType = "none" | "ascending" | "descending";
export type SortField = "name" | "quantity";
export type SortState = {
	[K in SortField]: SortType;
};

export type Action = {
	type: SortField;
};

/**
 * ascenging : 昇順（1, 2, 3...）
 * descending: 降順（9, 8, 7...）
 * @param type
 * @returns
 */

const toggleSort = (type: SortType): SortType => {
	// NOTE: none > ascending > descending > none...
	return type === "none"
		? "ascending"
		: type === "ascending"
			? "descending"
			: "none";
};

export const reducer = (state: SortState, action: Action): SortState => {
	switch (action.type) {
		case "name":
			return {
				quantity: "none",
				name: toggleSort(state.name),
			};
		case "quantity":
			return {
				quantity: toggleSort(state.quantity),
				name: "none",
			};
		default:
			return state;
	}
};
