"use client";
import { useState } from "react";
import { Select, Group, Text, ActionIcon, rem } from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";

export interface CraftItem {
	value: string; // recipe id
	label: string;
	quantity: string;
}

/**
 * TODO: onRemoveとかの実装がびみょうなのでもっときれいな実装がないか検討する
 * TODO: アイテム名が長いとoption内の文字が折り返されるのでデザイン面を修正する
 */

export interface CraftItemSelectProps {
	items: CraftItem[];
	onRemove: (id: string) => void
}

export const CraftItemSelect = (props: CraftItemSelectProps) => {
	const { items, onRemove } = props;
	const [value, setValue] = useState<string | null>(null);

	return (
		<Select
			size="xs"
			placeholder="craft items"
			data={items}
			value={value}
			onChange={setValue}
			searchable
			renderOption={({ option }) => {
				const item = option as CraftItem;
				const recipeId = item.value
				return (
					<Group w="100%" display="flex" justify="space-between" grow>
						<Text size="xs">{item.label}</Text>
						<Group
							justify="flex-end"
							style={(theme) => {
								return { color: theme.colors.gray[6] };
							}}
						>
							<Text size="xs" style={{ width: "11ch" }}>
								({item.quantity})
							</Text>
							<ActionIcon variant="light" onClick={() => onRemove(recipeId)}>
								<IconMinus style={{ width: rem(16) }} />
							</ActionIcon>
						</Group>
					</Group>
				);
			}}
		/>
	);
};
