import { Grid, MantineTheme, Tabs, useMantineTheme } from "@mantine/core";
import { Recipe } from "../Recipe";
import { useCallback, useMemo, useState } from "react";

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

	const [activeTab, setActiveTab] = useState<string>("1");

	const max = 12;
	const tabHeader = useMemo(() => {
		const tabs = [];
		for (let i = 0; i < max; i++) {
			const id = i + 1;
			tabs.push(
				<Tabs.Tab key={id} value={id.toString()}>
					{id}
				</Tabs.Tab>,
			);
		}
		return tabs;
	}, [max]);

	const tabPanels = useCallback(
		(activeTab: string) => {
			const tabs = [];
			for (let i = 0; i < max; i++) {
				const id = (i + 1).toString();
				/**
				 * NOTE: Tabs.Panelは要素の表示の切り替えをCSSで行う。
				 *       DOMとして存在するためstateの更新がある場合はレンダリングの対象となる。
				 *       非表示のコンポーネントレンダリングは避けたいため、非表示の時はパネルの枠だけ残し、
				 *       DOMはアクティブなときのみレンダリングするようにする。
				 */
				tabs.push(
					<Tabs.Panel style={style.tabPanel} value={id}>
						{activeTab === id && <Recipe id={id} />}
					</Tabs.Panel>,
				);
			}
			return tabs;
		},
		[max],
	);

	const onChangeTab = useCallback((value: string | null) => {
		if (value === null) {
			throw new Error("logic error.");
		}
		setActiveTab(value);
	}, []);

	return (
		<Grid>
			<Grid.Col span={12}>
				<Tabs variant="outline" value={activeTab} onChange={onChangeTab}>
					<Tabs.List>{tabHeader}</Tabs.List>
					{tabPanels(activeTab)}
				</Tabs>
			</Grid.Col>
		</Grid>
	);
};
