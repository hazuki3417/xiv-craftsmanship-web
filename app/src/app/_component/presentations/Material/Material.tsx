import { Grid, ScrollArea, Stack, Title } from "@mantine/core";
import { MaterialTable } from "../MaterialTable";

export type MaterialProps = {};

export const Material = (props: MaterialProps) => {
	return (
		<Grid>
			<Grid.Col span={12}>
				<Stack gap={0}>
					<Title order={6}>クリスタル</Title>
					<ScrollArea h={384}>
						<MaterialTable
							items={[]}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
				<Stack gap={0}>
					<Title order={6}>中間素材</Title>
					<ScrollArea h={384}>
						<MaterialTable
							items={[]}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
				<Stack gap={0}>
					<Title order={6}>素材</Title>
					<ScrollArea h={740}>
						<MaterialTable
							items={[]}
							sort={{ name: "none", quantity: "descending" }}
						/>
					</ScrollArea>
				</Stack>
			</Grid.Col>
		</Grid>
	);
};
