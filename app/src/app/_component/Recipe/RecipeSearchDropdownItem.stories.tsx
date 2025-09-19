import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from '@storybook/test';

import { RecipeSearchDropdownItem } from "./RecipeSearchDropdownItem";

const meta = {
	title: "RecipeSearchDropdownItem",
	component: RecipeSearchDropdownItem,
} satisfies Meta<typeof RecipeSearchDropdownItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: {
			craftLevel: 1,
			itemId: "",
			itemLevel: 1,
			job: "錬金術師",
			name: "アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名",
			pieces: 1,
			recipeId: "",
		},
	},
};
