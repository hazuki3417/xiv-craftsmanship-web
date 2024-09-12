"use client";
import { useState } from "react";
import {
	CrystalTable,
	InternalTable,
	LeafTable,
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

const segments: SegmentedControlItem[] = [
	{ value: "crafts", label: "crafts" },
	{ value: "materials", label: "materials" },
];

const CrystalTableBodyWithNodes = withCrystalItemHOC(CrystalTable.Body);
const InternalTableBodyWithNodes = withInternalItemHOC(InternalTable.Body);
const LeafTableBodyWithNodes = withLeafItemHOC(LeafTable.Body);

const makeStyle = (theme: MantineTheme) => {
	return {
		tabPanel: {
			padding: "8px",
		},
	};
};

export default function Home() {
	const style = makeStyle(useMantineTheme());
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
						{/** TODO: レンダリングに時間がかかっているので最適化する */}
						{segment === "crafts" && (
							<Grid.Col span={12}>
								{/** tab panel */}
								<Tabs variant="outline" defaultValue={"1"}>
									<Tabs.List>
										<Tabs.Tab value="1">1</Tabs.Tab>
										<Tabs.Tab value="2">2</Tabs.Tab>
										<Tabs.Tab value="3">3</Tabs.Tab>
										{/* <Tabs.Tab value="4">4</Tabs.Tab>
									<Tabs.Tab value="5">5</Tabs.Tab>
									<Tabs.Tab value="6">6</Tabs.Tab>
									<Tabs.Tab value="7">7</Tabs.Tab>
									<Tabs.Tab value="8">8</Tabs.Tab>
									<Tabs.Tab value="9">9</Tabs.Tab>
									<Tabs.Tab value="10">10</Tabs.Tab>
									<Tabs.Tab value="11">11</Tabs.Tab>
									<Tabs.Tab value="12">12</Tabs.Tab> */}
									</Tabs.List>
									<Tabs.Panel style={style.tabPanel} value="1">
										<Recipe id="1" />
									</Tabs.Panel>
									<Tabs.Panel style={style.tabPanel} value="2">
										<Recipe id="2" />
									</Tabs.Panel>
									<Tabs.Panel style={style.tabPanel} value="3">
										<Recipe id="3" />
									</Tabs.Panel>
									{/* <Tabs.Panel style={style.tabPanel} value="4">
									<Recipe id="4" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="5">
									<Recipe id="5" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="6">
									<Recipe id="6" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="7">
									<Recipe id="7" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="8">
									<Recipe id="8" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="9">
									<Recipe id="9" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="10">
									<Recipe id="10" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="11">
									<Recipe id="11" />
								</Tabs.Panel>
								<Tabs.Panel style={style.tabPanel} value="12">
									<Recipe id="12" />
								</Tabs.Panel> */}
								</Tabs>
							</Grid.Col>
						)}
						{segment === "materials" && (
							<>
								<Grid.Col span={5}>
									<Stack gap={0}>
										<Title order={6}>クリスタル</Title>
										<ScrollArea h={370}>
											<CrystalTable>
												<CrystalTable.Header />
												<CrystalTableBodyWithNodes />
											</CrystalTable>
										</ScrollArea>
									</Stack>
									<Stack gap={0}>
										<Title order={6}>中間素材</Title>
										<ScrollArea h={370}>
											<InternalTable>
												<InternalTable.Header />
												<InternalTableBodyWithNodes />
											</InternalTable>
										</ScrollArea>
									</Stack>
								</Grid.Col>
								<Grid.Col span={7}>
									<Stack gap={0}>
										<Title order={6}>素材</Title>
										<ScrollArea h={740}>
											<LeafTable>
												<LeafTable.Header />
												<LeafTableBodyWithNodes />
											</LeafTable>
										</ScrollArea>
									</Stack>
								</Grid.Col>
							</>
						)}
					</MaterialManagerProvider>
				</Grid>
			</section>
		</>
	);
}
