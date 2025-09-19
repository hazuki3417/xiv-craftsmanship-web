import type { Meta, StoryObj } from "@storybook/react";
import { CraftItemSelectItem } from "./CraftItemSelectItem";

const meta = {
	title: "CraftItemSelectItem",
	component: CraftItemSelectItem,
} satisfies Meta<typeof CraftItemSelectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		item: {
			value: "1",
			label:
				"アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名アイテム名",
			quantity: "1",
		},
		onRemove: () => {},
	},
};
