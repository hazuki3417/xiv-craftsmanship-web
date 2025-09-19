import { ActionIcon, Divider, Flex, Grid, rem } from "@mantine/core";
import { CraftItem, CraftItemSelect, Recipe, RecipeSearch, useRecipe } from "../Recipe";
import { useCallback, useMemo } from "react";
import { useMaterialManager } from "../MaterialManagerProvider";
import { IconPlus } from "@tabler/icons-react";

export type CraftProps = {};

export const Craft = (props: CraftProps) => {
	const manager = useMaterialManager();
	const recipe = useRecipe();

	const items = useMemo((): CraftItem[] => {
		const recipes = manager.value.recipes;
		return recipes.map((recipe) => {
			return {
				value: recipe.id,
				label: recipe.value.spec?.name || "",
				quantity: recipe.value.quantity.count.toString(),
			};
		});
	}, [manager.value.recipes]);

	const addRecipe = useCallback(() => {
		console.debug("debug", recipe.value);
		if (recipe.value.spec === null) {
			// 選択されていないときの処理
			return;
		}
		// 選択されているときの処理
		const recipeId = recipe.value.spec.recipeId;
		manager.action.add(recipeId, () => recipe.value);
	}, [recipe.value.spec]);

	const removeRecipe = useCallback(
		(id: string) => {
			manager.action.remove(id);
		},
		[recipe.value.spec],
	);

	return (
		<Grid>
			<Grid.Col
				span={12}
				style={{ display: "flex", flexDirection: "column", gap: "8px" }}
			>
				<Flex gap={4} w={"100%"} style={{}}>
					<RecipeSearch style={{ flex: "1" }} />
					<ActionIcon variant="light" onClick={addRecipe}>
						<IconPlus style={{ width: rem(16) }} />
					</ActionIcon>
					<CraftItemSelect items={items} onRemove={removeRecipe} />
				</Flex>
				<Divider />
				<Recipe />
			</Grid.Col>
		</Grid>
	);
};
