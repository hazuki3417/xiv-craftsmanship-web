import { Box, Checkbox, Grid, Group, Stack } from "@mantine/core";
import { memo, ReactNode } from "react";
import { NodeInput } from "./NodeInput";

const MemorizedNodeInput = memo(NodeInput);

const Unit = ({ unit }: { unit: string }) => (
	<Group gap={"8px"}>
		unit:
		<MemorizedNodeInput value={unit} style={{ width: "7ch" }} />
	</Group>
);

const Quantity = ({ quantity }: { quantity: string }) => (
	<Group gap={"8px"}>
		total:
		<MemorizedNodeInput value={quantity} style={{ width: "7ch" }} />
	</Group>
);

const MemoizedUnit = memo(Unit);

export type ItemNodeProps = {
	name: string;
	unit: string;
	quantity: string;
};

export const ItemNode = (props: ItemNodeProps) => {
	const { name, unit, quantity } = props;

	// 7ch: 3桁の数字の表示幅
	return (
		<Box
			maw={500}
			mx="auto"
			style={{
				padding: 6,
				border: "1px solid #aaa",
				borderRadius: 5,
				position: "relative",
			}}
		>
			<Stack gap={"4px"}>
				<MemorizedNodeInput value={name} />
				<Group gap={"xs"}>
					<MemoizedUnit unit={unit} />
					<Quantity quantity={quantity} />
				</Group>
			</Stack>
		</Box>
	);
};
