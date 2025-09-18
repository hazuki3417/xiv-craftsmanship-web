import { useCallback, useReducer } from "react";
import { QuantityState, reducer } from "../reducers/quantity";

export interface UseQuantity {
	quantity: number;
	set: (value: string | number) => void;
	countUp: () => void;
	countDown: () => void;
}

export const useQuantity = (value: QuantityState): UseQuantity => {
	const [state, dispatch] = useReducer(reducer, value);

	return {
		quantity: state.count,
		set: useCallback(
			(value: string | number) => dispatch({ type: "set", value }),
			[],
		),
		countUp: useCallback(() => dispatch({ type: "countUp" }), []),
		countDown: useCallback(() => dispatch({ type: "countDown" }), []),
	};
};

export const defaultQuantityState: QuantityState = {
	count: 1,
};
