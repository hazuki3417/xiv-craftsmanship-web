import {
	Combobox,
	Group,
	MantineTheme,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { useMemo } from "react";
import { Craft } from "@/openapi";

const makeStyle = (theme: MantineTheme) => {
	return {
		text: {
			color: theme.colors.gray[6],
		},
	};
};

export type RecipeSearchDropdownProps = {
	items: Craft[];
};

export const RecipeSearchDropdown = (props: RecipeSearchDropdownProps) => {
	const { items } = props;
	const style = makeStyle(useMantineTheme());

	const MemorizeOptions = useMemo(() => {
		if (items.length === 0) {
			return <Combobox.Empty>Nothing found</Combobox.Empty>;
		}
		return items.map((item) => (
			<Combobox.Option key={item.recipeId} value={item.recipeId}>
				<Group justify="space-between" grow>
					<Text size="xs">{item.name}</Text>
					<Group justify="flex-end" style={style.text}>
						<Text size="xs" style={{ width: "10ch" }}>
							craft lv: {item.craftLevel}
						</Text>
						<Text size="xs" style={{ width: "10ch" }}>
							item lv: {item.itemLevel ?? "-"}
						</Text>
						<Text size="xs" style={{ width: "11ch" }}>
							job: {item.job}
						</Text>
					</Group>
				</Group>
			</Combobox.Option>
		));
	}, [items]);

	return <Combobox.Dropdown>{MemorizeOptions}</Combobox.Dropdown>;
};
