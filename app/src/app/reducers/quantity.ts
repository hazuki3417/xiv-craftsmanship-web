export type QuantityState = {
	count: number;
};

export type QuantityAction = {
	type: "countUp" | "countDown";
};

export const reducer = (
	state: QuantityState,
	action: QuantityAction,
): QuantityState => {
	switch (action.type) {
		case "countUp":
			return { count: Math.min(99, state.count + 1) };
		case "countDown":
			return { count: Math.max(1, state.count - 1) };
	}
};

export const defaultState: QuantityState = {
	count: 1,
};
