"use client";
import { useState } from "react";
import { Select, Group, Text } from "@mantine/core";

export interface CraftItem {
	value: string; // id
	label: string;
	quantity: string;
}

export interface CraftItemSelectProps {
	items: CraftItem[];
}

export const CraftItemSelect = (props: CraftItemSelectProps) => {
	const { items } = props;
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
						</Group>
					</Group>
				);
			}}
		/>
	);
};
