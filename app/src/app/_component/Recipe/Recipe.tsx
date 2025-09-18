import { Diagram } from "../index";
import { Grid, Stack } from "@mantine/core";
import { RecipeInfoPanel } from "./RecipeInfoPanel";
import { MaterialMiniTableSwitcher } from "./MaterialMiniTableSwitcher";

export interface RecipeProps {}

export const Recipe = (props: RecipeProps) => {
	const {} = props;
	return (
		<Grid>
			<Grid.Col span={7}>
				<Stack gap={4}>
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
	);
};
Recipe.displayName = "component/Recipe";
