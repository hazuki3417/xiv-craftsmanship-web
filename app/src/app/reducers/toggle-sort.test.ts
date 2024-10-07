import { describe, it, expect } from "vitest";
import { reducer, SortState } from "./toggle-sort";

describe("toggle-sort reducer test", () => {
	describe("toggle name", () => {
		const pattern: {
			name: string;
			input: SortState;
			expected: SortState;
		}[] = [
			// 対象のkeyがトグルで値が変わるかテスト
			{
				name: "name: none > ascending",
				input: { name: "none", quantity: "none" },
				expected: { name: "ascending", quantity: "none" },
			},
			{
				name: "name: ascending > descending",
				input: { name: "ascending", quantity: "none" },
				expected: { name: "descending", quantity: "none" },
			},
			{
				name: "name: descending > none",
				input: { name: "descending", quantity: "none" },
				expected: { name: "none", quantity: "none" },
			},
			// 他のkeyがソートされている状態ならnoneに戻るかテスト
			{
				name: "quantity: none > none",
				input: { name: "none", quantity: "none" },
				expected: { name: "ascending", quantity: "none" },
			},
			{
				name: "quantity: ascending > none",
				input: { name: "none", quantity: "ascending" },
				expected: { name: "ascending", quantity: "none" },
			},
			{
				name: "quantity: descending > none",
				input: { name: "none", quantity: "descending" },
				expected: { name: "ascending", quantity: "none" },
			},
		];
		pattern.forEach((test) => {
			it(test.name, () => {
				const state = reducer(test.input, { type: "name" });
				expect(test.expected).toEqual(state);
			});
		});
	});

	describe("toggle quantity", () => {
		const pattern: {
			name: string;
			input: SortState;
			expected: SortState;
		}[] = [
			// 対象のkeyがトグルで値が変わるかテスト
			{
				name: "name: none > ascending",
				input: { name: "none", quantity: "none" },
				expected: { name: "none", quantity: "ascending" },
			},
			{
				name: "name: ascending > descending",
				input: { name: "none", quantity: "ascending" },
				expected: { name: "none", quantity: "descending" },
			},
			{
				name: "name: descending > none",
				input: { name: "none", quantity: "descending" },
				expected: { name: "none", quantity: "none" },
			},
			// 他のkeyがソートされている状態ならnoneに戻るかテスト
			{
				name: "quantity: none > none",
				input: { name: "none", quantity: "none" },
				expected: { name: "none", quantity: "ascending" },
			},
			{
				name: "quantity: ascending > none",
				input: { name: "ascending", quantity: "none" },
				expected: { name: "none", quantity: "ascending" },
			},
			{
				name: "quantity: descending > none",
				input: { name: "descending", quantity: "none" },
				expected: { name: "none", quantity: "ascending" },
			},
		];
		pattern.forEach((test) => {
			it(test.name, () => {
				const state = reducer(test.input, { type: "quantity" });
				expect(test.expected).toEqual(state);
			});
		});
	});
});
