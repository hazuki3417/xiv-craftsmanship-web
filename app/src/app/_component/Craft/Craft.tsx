import { ActionIcon, Divider, Flex, Grid, rem, Stack } from "@mantine/core";
import { CraftItem, CraftItemSelect, RecipeSearch, useRecipe } from "../Recipe";
import { useCallback, useMemo } from "react";
import { useMaterialManager } from "../MaterialManagerProvider";
import { IconPlus } from "@tabler/icons-react";
import { RecipeInfoPanel } from "../Recipe/RecipeInfoPanel";
import { Diagram } from "../Diagram";
import { MaterialMiniTableSwitcher } from "../Recipe/MaterialMiniTableSwitcher";

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
			<Grid.Col span={7}>
				<Flex>
					<RecipeSearch style={{ flex: "1" }} />
				</Flex>
			</Grid.Col>
			<Grid.Col span={5}>
				<CraftItemSelect items={items} onRemove={removeRecipe} />
			</Grid.Col>
			<Grid.Col
				span={12}
				style={{ display: "flex", flexDirection: "column", gap: "8px" }}
			>
				<Divider />
				<Grid>
					<Grid.Col span={7}>
						<Stack gap={4}>
							<RecipeInfoPanel onAddRecipe={addRecipe} />
							<div style={{ height: "740px" }}>
								<Diagram />
							</div>
						</Stack>
					</Grid.Col>
					<Grid.Col span={5}>
						<Stack gap={0}>
							<MaterialMiniTableSwitcher />
						</Stack>
					</Grid.Col>
				</Grid>
			</Grid.Col>
		</Grid>
	);
};
