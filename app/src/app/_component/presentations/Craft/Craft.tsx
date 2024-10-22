import { Grid, MantineTheme, Tabs, useMantineTheme } from "@mantine/core";
import { Recipe } from "../Recipe";

const makeStyle = (theme: MantineTheme) => {
	return {
		tabPanel: {
			padding: "8px",
		},
	};
};

export type CraftProps = {};

export const Craft = (props: CraftProps) => {
	const style = makeStyle(useMantineTheme());
	return (
		<Grid>
			<Grid.Col span={12}>
				<Tabs variant="outline" defaultValue={"1"}>
					<Tabs.List>
						<Tabs.Tab value="1">1</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel style={style.tabPanel} value="1">
						<Recipe id="1" />
					</Tabs.Panel>
				</Tabs>
			</Grid.Col>
		</Grid>
	);
};
