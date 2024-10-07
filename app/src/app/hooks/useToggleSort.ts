import { useCallback, useReducer } from "react";
import { reducer, SortState } from "../reducers/toggle-sort";
export type * from "../reducers/toggle-sort"

export interface UseToggleSort {
	sort: SortState;
	name: () => void;
	quantity: () => void;
}

export const useToggleSort = (value: SortState): UseToggleSort => {
	const [sort, dispatch] = useReducer(reducer, value);

	return {
		sort,
		name: useCallback(() => dispatch({ type: "name" }), []),
		quantity: useCallback(() => dispatch({ type: "quantity" }), []),
	};
};

export const defaultState: SortState = {
	name: "none",
	quantity: "none",
};
