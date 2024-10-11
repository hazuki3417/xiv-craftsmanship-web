"use client";
import { FC, useState } from "react";
import {
	MaterialManagerProvider,
	Recipe,
	withCrystalItemHOC,
	withInternalItemHOC,
	withLeafItemHOC,
} from "./_component/presentations";
import {
	Grid,
	MantineTheme,
	ScrollArea,
	SegmentedControl,
	SegmentedControlItem,
	Stack,
	Tabs,
	Title,
	useMantineTheme,
} from "@mantine/core";

// NOTE: 仮実装（いずれ消す）
import axios from "axios";
import { MaterialTable } from "@/component/presentations/MaterialTable";
axios.defaults.baseURL = "http://localhost:3000/api/";

const segments: SegmentedControlItem[] = [
	{ value: "crafts", label: "crafts" },
	{ value: "materials", label: "materials" },
];

const CrystalTableBodyWithNodes = withCrystalItemHOC(MaterialTable);
const InternalTableBodyWithNodes = withInternalItemHOC(MaterialTable);
const LeafTableBodyWithNodes = withLeafItemHOC(MaterialTable);

const makeStyle = (theme: MantineTheme) => {
	return {
		tabPanel: {
			padding: "8px",
		},
	};
};

const CraftSegment: FC = () => {
	const style = makeStyle(useMantineTheme());
	return (
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
	);
};

const MaterialSegment: FC = () => {
	return (
		<>
			<Grid.Col span={5}>
				<Stack gap={0}>
					<Title order={6}>クリスタル</Title>
					<ScrollArea h={384}>
						<CrystalTableBodyWithNodes
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
				<Stack gap={0}>
					<Title order={6}>中間素材</Title>
					<ScrollArea h={384}>
						<InternalTableBodyWithNodes
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
			</Grid.Col>
			<Grid.Col span={7}>
				<Stack gap={0}>
					<Title order={6}>素材</Title>
					<ScrollArea h={740}>
						<LeafTableBodyWithNodes
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
			</Grid.Col>
		</>
	);
};

export default function Home() {
	const [segment, setSegment] = useState<string>("crafts");

	return (
		<>
			{/** segment */}
			<section>
				<Grid>
					<Grid.Col span={12}>
						<SegmentedControl
							value={segment}
							onChange={setSegment}
							data={segments}
						/>
					</Grid.Col>
				</Grid>
			</section>
			<section>
				<Grid>
					<MaterialManagerProvider>
						{segment === "crafts" ? <CraftSegment /> : <MaterialSegment />}
					</MaterialManagerProvider>
				</Grid>
			</section>
		</>
	);
}
