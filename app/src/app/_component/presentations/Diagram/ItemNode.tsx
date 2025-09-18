import { Box, Group, Stack } from "@mantine/core";
import { memo } from "react";
import { ClipBoardCopyInput } from "@/component";

const MemorizedClipBoardCopyInput = memo(ClipBoardCopyInput);

const Unit = ({ unit }: { unit: string }) => (
	<Group gap={"8px"}>
		unit:
		<MemorizedClipBoardCopyInput
			size="xs"
			value={unit}
			style={{ width: "7ch" }}
		/>
	</Group>
);

const Quantity = ({ quantity }: { quantity: string }) => (
	<Group gap={"8px"}>
		total:
		<MemorizedClipBoardCopyInput
			size="xs"
			value={quantity}
			style={{ width: "7ch" }}
		/>
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
				<MemorizedClipBoardCopyInput value={name} />
				<Group gap={"xs"}>
					<MemoizedUnit unit={unit} />
					<Quantity quantity={quantity} />
				</Group>
			</Stack>
		</Box>
	);
};
