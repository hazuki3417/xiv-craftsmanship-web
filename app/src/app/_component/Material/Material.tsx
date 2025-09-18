import { Grid, ScrollArea, Stack, Title } from "@mantine/core";
import { MaterialCrystalTable } from "../MaterialCrystalTable";
import { MaterialInternalTable } from "../MaterialInternalTable";
import { MaterialLeafTable } from "../MaterialLeafTable";
import { useMaterialManager } from "../MaterialManagerProvider";
import { useMemo } from "react";

export type MaterialProps = {};

export const Material = (props: MaterialProps) => {
	const manager = useMaterialManager();

	const items = useMemo(() => manager.action.aggregate(), [manager.value.recipes]);

	return (
		<Grid>
			<Grid.Col span={12}>
				<Stack gap={0}>
					<Title order={6}>クリスタル</Title>
					<ScrollArea h={384}>
						<MaterialCrystalTable
							items={items}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
				<Stack gap={0}>
					<Title order={6}>中間素材</Title>
					<ScrollArea h={384}>
						<MaterialInternalTable
							items={items}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
				<Stack gap={0}>
					<Title order={6}>素材</Title>
					<ScrollArea h={740}>
						<MaterialLeafTable
							items={items}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
			</Grid.Col>
		</Grid>
	);
};
