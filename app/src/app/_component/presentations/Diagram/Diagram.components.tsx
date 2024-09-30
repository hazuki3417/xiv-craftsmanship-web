import { FC } from "react";
import { Box, Checkbox, Grid, Input, InputProps } from "@mantine/core";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { ClipBoardCopyButton } from "../ClipBoardCopyButton";

const MemolizeClipBoardCopyButton = memo(ClipBoardCopyButton);

type NodeInputProps = Pick<InputProps, "style"> & {
	value: string;
};

const NodeInput: FC<NodeInputProps> = (props) => {
	const { value, ...rest } = props;

	return (
		<Input
			size="xs"
			leftSectionPointerEvents="all"
			leftSection={<MemolizeClipBoardCopyButton value={value} />}
			value={value}
			readOnly
			{...rest}
		/>
	);
};

const MemorizedNodeInput = memo(NodeInput);

type ItemNodeProps = {
	name: string;
	unit: string;
	total: string;
};

const ItemNode: FC<ItemNodeProps> = (props) => {
	const { name, unit, total } = props;

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
						<Grid.Col span={2}>total:</Grid.Col>
						<Grid.Col span={4}>
							<MemorizedNodeInput value={total} style={{ width: "7ch" }} />
						</Grid.Col>
					</Grid>
				</Grid.Col>
			</Grid>
		</Box>
	);
};
const MemorizedItemNode = memo(ItemNode);

/**
 * TODO: ドメインに関する型定義なので実装箇所を変更する
 */
export type NodeType = "root" | "internal" | "leaf";

export type ItemType = {
	nodeType: NodeType;
	itemId: string;
	itemName: string;
	unit: number;
	total: number;
	type: string;
	source: string;
};

export type ChildItemType = ItemType;

export type DiagramChildNodeProps = Node<ChildItemType>;

export const DiagramChildNode = (props: NodeProps<DiagramChildNodeProps>) => {
	const { itemName, unit, total } = props.data;

	const item: ItemNodeProps = {
		name: itemName,
		unit: unit.toString(),
		total: total.toString(),
	};

	return (
		<>
			<MemorizedItemNode {...item} />
			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</>
	);
};
DiagramChildNode.displayName =
	"component/presentations/Diagram/DiagramChildNode";

export type DiagramNodeProps = DiagramChildNodeProps;
