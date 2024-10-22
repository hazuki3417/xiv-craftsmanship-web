export type SortType = "none" | "ascending" | "descending";
export type SortFieldType = string;
export type SortState<T extends SortFieldType = SortFieldType> = {
	[K in T]: SortType;
};

export type Action<T> = {
	field: T;
};

/**
 * ascenging : 昇順（1, 2, 3...）
 * descending: 降順（9, 8, 7...）
 */

const toggleSort = (type: SortType): SortType => {
	// NOTE: none > ascending > descending > none...
	return type === "none"
		? "ascending"
		: type === "ascending"
			? "descending"
			: "none";
};

export const reducer = <T extends SortFieldType>(
	state: SortState<T>,
	action: Action<T>,
): SortState<T> => {
	const data = {} as SortState<T>;
	for (const field in state) {
		if (field === action.field) {
			data[field] = toggleSort(state[field]);
		} else {
			// 他のフィールドのソート状態は "none" にリセット
			data[field] = "none";
		}
	}
	return data;
};
