import { useCallback, useReducer } from "react";
import { QuantityState, reducer } from "../reducers/quantity";

export interface UseQuantity {
	quantity: number;
	countUp: () => void;
	countDown: () => void;
}

export const useQuantity = (value: QuantityState): UseQuantity => {
	const [state, dispatch] = useReducer(reducer, value);

	return {
		quantity: state.count,
		countUp: useCallback(() => dispatch({ type: "countUp" }), []),
		countDown: useCallback(() => dispatch({ type: "countDown" }), []),
	};
};

export const defaultQuantityState: QuantityState = {
	count: 1,
};
