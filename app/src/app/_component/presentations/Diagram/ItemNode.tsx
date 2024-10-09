import { Box, Checkbox, Grid } from "@mantine/core";
import { memo } from "react";
import { NodeInput } from "./NodeInput";

const MemorizedNodeInput = memo(NodeInput);

export type ItemNodeProps = {
	name: string;
	unit: string;
	quantity: string;
};

export const ItemNode = (props: ItemNodeProps) => {
	const { name, unit, quantity } = props;

	return (
		<Box
			maw={500}
			mx="auto"
			style={{
				padding: 10,
				border: "1px solid #aaa",
				borderRadius: 5,
				position: "relative",
			}}
		>
			<Grid align="center">
				<Grid.Col span={1}>
					<Checkbox size="xs" />
				</Grid.Col>
				<Grid.Col span={11}>
					<Grid align="center">
						<Grid.Col span={12}>
							<MemorizedNodeInput value={name} />
						</Grid.Col>
					</Grid>
					<Grid align="center">
						<Grid.Col span={2}>unit:</Grid.Col>
						<Grid.Col span={4}>
							<MemorizedNodeInput value={unit} style={{ width: "7ch" }} />
						</Grid.Col>
						<Grid.Col span={2}>unit:</Grid.Col>
						<Grid.Col span={4}>
							<MemorizedNodeInput value={quantity} style={{ width: "7ch" }} />
						</Grid.Col>
					</Grid>
				</Grid.Col>
			</Grid>
		</Box>
	);
};
