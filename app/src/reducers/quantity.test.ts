import { describe, it, expect } from "vitest";
import { reducer } from "./quantity";

describe("quanitity reducer test", () => {
	it("coutUp:インクリメントされることを確認", () => {
		const pattern: {
			input: number;
			expected: number;
		}[] = [
			{ input: 1, expected: 2 },
			{ input: 2, expected: 3 },
			{ input: 3, expected: 4 },
			{ input: 4, expected: 5 },
			{ input: 5, expected: 6 },
		];
		pattern.forEach((data) => {
			const state = reducer({ count: data.input }, { type: "countUp" });
			expect(data.expected).toBe(state.count);
		});
	});

	it("countUp:99より大きくならないことを確認", () => {
		const pattern: {
			input: number;
			expected: number;
		}[] = [
			{ input: 96, expected: 97 },
			{ input: 97, expected: 98 },
			{ input: 98, expected: 99 },
			{ input: 99, expected: 99 },
			{ input: 100, expected: 99 },
		];
		pattern.forEach((data) => {
			const state = reducer({ count: data.input }, { type: "countUp" });
			expect(data.expected).toBe(state.count);
		});
	});

	it("coutDown:デクリメントされることを確認", () => {
		const pattern: {
			input: number;
			expected: number;
		}[] = [
			{ input: 95, expected: 94 },
			{ input: 96, expected: 95 },
			{ input: 97, expected: 96 },
			{ input: 98, expected: 97 },
			{ input: 99, expected: 98 },
		];
		pattern.forEach((data) => {
			const state = reducer({ count: data.input }, { type: "countDown" });
			expect(data.expected).toBe(state.count);
		});
	});

	it("countDown:1より小さくならないことを確認", () => {
		const pattern: {
			input: number;
			expected: number;
		}[] = [
			{ input: 0, expected: 1 },
			{ input: 1, expected: 1 },
			{ input: 2, expected: 1 },
			{ input: 3, expected: 2 },
			{ input: 4, expected: 3 },
		];
		pattern.forEach((data) => {
			const state = reducer({ count: data.input }, { type: "countDown" });
			expect(data.expected).toBe(state.count);
		});
	});
});
