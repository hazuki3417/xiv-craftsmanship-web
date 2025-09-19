import { Group, Text, ActionIcon, rem } from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";

export interface CraftItem {
	value: string; // recipe id
	label: string;
	quantity: string;
}

export interface CraftItemSelectItemProps {
	item: CraftItem;
	onRemove: (id: string) => void;
}

export const CraftItemSelectItem = (props: CraftItemSelectItemProps) => {
	const { item, onRemove } = props;
	const recipeId = item.value

	return (
		<Group justify="space-between">
			<Text size="xs" style={{
				flex: 1,
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			}} >{item.label}</Text>
			<Group
				justify="flex-end"
				style={(theme) => {
					return { color: theme.colors.gray[6] };
				}}
			>
				<Text size="xs" style={{ width: "5ch" }} span>
					({item.quantity})
				</Text>
				<ActionIcon variant="light" onClick={() => onRemove(recipeId)}>
					<IconMinus style={{ width: rem(16) }} />
				</ActionIcon>
			</Group>
		</Group>
	);
};
