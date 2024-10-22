import { FC } from "react";
import { Diagram } from "../index";
import { Grid, Stack } from "@mantine/core";
import { RecipeSearch } from "./RecipeSearch";
import { RecipeInfoPanel } from "./RecipeInfoPanel";
import { MaterialMiniTableSwitcher } from "./MaterialMiniTableSwitcher";
import { RecipeProvider } from "./RecipeProvider";

export interface RecipeProps {
	id: string;
}

export const Recipe: FC<RecipeProps> = (props) => {
	const { id, ...rest } = props;
	return (
		<RecipeProvider
			id={id}
			value={{
				spec: null,
				tree: null,
				nodes: [],
				edges: [],
				quantity: {
					count: 1,
				},
			}}
		>
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
