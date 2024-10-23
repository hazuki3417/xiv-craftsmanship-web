import { FC, useMemo } from "react";
import { Diagram, useMaterialManager } from "../index";
import { Grid, Stack } from "@mantine/core";
import { RecipeSearch } from "./RecipeSearch";
import { RecipeInfoPanel } from "./RecipeInfoPanel";
import { MaterialMiniTableSwitcher } from "./MaterialMiniTableSwitcher";
import { RecipeProvider } from "./RecipeProvider";

export interface RecipeProps {
	id: string;
}

export const Recipe = (props: RecipeProps) => {
	const { id } = props;
	const manager = useMaterialManager();
	const context = useMemo(() => {
		return manager.action.fetch(id);
	}, [id]);
	return (
		<RecipeProvider id={id} value={context}>
			<Grid>
				<Grid.Col span={7}>
					<Stack gap={2}>
						<RecipeSearch />
						<RecipeInfoPanel />
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
		</RecipeProvider>
	);
};
Recipe.displayName = "component/presentations/Recipe";
