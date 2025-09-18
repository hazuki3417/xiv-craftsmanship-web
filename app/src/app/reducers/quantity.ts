export type QuantityState = {
	count: number;
};

export type QuantityAction =
	| { type: "set"; value: string | number }
	| { type: "countUp" }
	| { type: "countDown" };

export const reducer = (
	state: QuantityState,
	action: QuantityAction,
): QuantityState => {
	const min = 1;
	const max = 999;

	const setCountCalc = (value: string | number) => {
		const quantity = typeof value === "number" ? value : Number(value);
		return Math.min(max, Math.max(min, quantity));
	};
	switch (action.type) {
		case "set":
			return { count: setCountCalc(action.value) };
		case "countUp":
			return { count: Math.min(max, state.count + 1) };
		case "countDown":
			return { count: Math.max(min, state.count - 1) };
	}
};

export const defaultState: QuantityState = {
	count: 1,
};
