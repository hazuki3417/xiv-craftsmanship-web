import { useCallback, useReducer } from "react";
import { reducer, SortState } from "../reducers/toggle-sort";
export type * from "../reducers/toggle-sort";

export type SortField = "name" | "quantity";
export interface UseToggleSort {
	sort: SortState<SortField>;
	name: () => void;
	quantity: () => void;
}

export const useMaterialMiniTable = (
	value: SortState<SortField>,
): UseToggleSort => {
	const [sort, dispatch] = useReducer(reducer<SortField>, value);

	return {
		sort,
		name: useCallback(() => dispatch({ field: "name" }), []),
		quantity: useCallback(() => dispatch({ field: "quantity" }), []),
	};
};
