import { Grid, ScrollArea, Stack, Title } from "@mantine/core";
import { MaterialCrystalTable } from "../MaterialCrystalTable";
import { MaterialInternalTable } from "../MaterialInternalTable";
import { MaterialLeafTable } from "../MaterialLeafTable";

export type MaterialProps = {};

export const Material = (props: MaterialProps) => {
	return (
		<Grid>
			<Grid.Col span={12}>
				<Stack gap={0}>
					<Title order={6}>クリスタル</Title>
					<ScrollArea h={384}>
						<MaterialCrystalTable
							items={[]}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
				<Stack gap={0}>
					<Title order={6}>中間素材</Title>
					<ScrollArea h={384}>
						<MaterialInternalTable
							items={[]}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
				<Stack gap={0}>
					<Title order={6}>素材</Title>
					<ScrollArea h={740}>
						<MaterialLeafTable
							items={[]}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
			</Grid.Col>
		</Grid>
	);
};
