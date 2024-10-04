import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from '@storybook/test';

import { ClipBoardCopyButton } from "./ClipBoardCopyButton";

const meta = {
	title: "ClipBoardCopyButton",
	component: ClipBoardCopyButton,
} satisfies Meta<typeof ClipBoardCopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: "string",
	},
};
