import {
	Combobox,
} from "@mantine/core";
import { useMemo } from "react";
import { Craft } from "@/openapi";
import { RecipeSearchDropdownItem, } from "./RecipeSearchDropdownItem";

export type RecipeSearchDropdownProps = {
	items: Craft[];
};

export const RecipeSearchDropdown = (props: RecipeSearchDropdownProps) => {
	const { items } = props;
	const MemorizeOptions = useMemo(() => {
		if (items.length === 0) {
			return <Combobox.Empty>Nothing found</Combobox.Empty>;
		}
		return items.map((item) => (
			<Combobox.Option key={item.recipeId} value={item.recipeId}>
				<RecipeSearchDropdownItem value={item} />
			</Combobox.Option>
		));
	}, [items]);

	return <Combobox.Dropdown>{MemorizeOptions}</Combobox.Dropdown>;
};
