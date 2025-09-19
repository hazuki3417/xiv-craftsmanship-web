import { Group, Text } from "@mantine/core";
import { Craft } from "@/openapi";

export type RecipeSearchDropdownItemProps = {
	value: Craft;
};

export const RecipeSearchDropdownItem = (
	props: RecipeSearchDropdownItemProps,
) => {
	const { value } = props;

	return (
		<Group justify="space-between">
			<Text
				size="xs"
				style={{
					flex: 1,
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{value.name}
			</Text>
			<Group
				justify="flex-end"
				style={(theme) => {
					return { color: theme.colors.gray[6] };
				}}
			>
				<Text size="xs" style={{ width: "10ch" }}>
					craft lv: {value.craftLevel}
				</Text>
				<Text size="xs" style={{ width: "10ch" }}>
					item lv: {value.itemLevel ?? "-"}
				</Text>
				<Text size="xs" style={{ width: "11ch" }}>
					job: {value.job}
				</Text>
			</Group>
		</Group>
	);
};
