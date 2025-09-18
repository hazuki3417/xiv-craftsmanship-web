import { ActionIcon, Divider, Flex, Grid, rem } from "@mantine/core";
import { defaultRecipeContext, Recipe, RecipeSearch } from "../Recipe";
import { useMemo } from "react";
import { RecipeProvider } from "../Recipe/RecipeProvider";
import { useMaterialManager } from "../MaterialManagerProvider";
import { CraftItem, CraftItemSelect } from "@/component";
import { IconPlus } from "@tabler/icons-react";

export type CraftProps = {};

export const Craft = (props: CraftProps) => {
	const manager = useMaterialManager();

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

	return (
		<Grid>
			<Grid.Col
				span={12}
				style={{ display: "flex", flexDirection: "column", gap: "8px" }}
			>
				<RecipeProvider value={defaultRecipeContext}>
					<Flex gap={4} w={"100%"} style={{}}>
						<RecipeSearch style={{ flex: "1" }} />
						<ActionIcon variant="light">
							<IconPlus style={{ width: rem(16) }} />
						</ActionIcon>
						<CraftItemSelect items={items} />
					</Flex>
					<Divider />
					<Recipe />
				</RecipeProvider>
			</Grid.Col>
		</Grid>
	);
};
