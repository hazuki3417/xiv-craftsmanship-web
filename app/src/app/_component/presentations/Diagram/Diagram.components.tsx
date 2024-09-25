import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import {
	ActionIcon,
	Box,
	Checkbox,
	Combobox,
	Grid,
	Group,
	Input,
	Loader,
	NumberInput,
	useCombobox,
} from "@mantine/core";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { ClipBoardCopyButton } from "../ClipBoardCopyButton";
import {
	IconCheck,
	IconMinus,
	IconPlus,
	IconSearch,
	IconX,
} from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { rem } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import { GetCraftsDocument, GetMaterialsDocument, Material } from "@/graphql";
import { useRecipe } from "../Recipe";

export type NodeType = "root" | "internal" | "leaf";

/**
 * TODO: ドメインに関する型定義なので実装箇所を変更する
 * 共通のプロパティ
 */
export type ItemType = {
	nodeType: NodeType;
	itemId: string;
	itemName: string;
	unit: number;
	total: number;
	type: string;
	source: string;
};

/**
 * TODO: ドメインに関する型定義なので実装箇所を変更する
 */
export type RootItemType = ItemType;

export type DiagramRootNodeProps = Node<RootItemType>;

export const DiagramRootNode = memo(
	(props: NodeProps<DiagramRootNodeProps>) => {
		const { fetch } = useRecipe();
		const craft = fetch.craftItem();

		return (
			<>
				<Box
					miw={450}
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
									<Input
										size="xs"
										placeholder="name"
										rightSectionPointerEvents="all"
										rightSection={
											<ClipBoardCopyButton value={craft?.spec.name || ""} />
										}
										value={craft?.spec.name || ""}
										readOnly
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
					</Grid>
				</Box>
				<Handle type="source" position={Position.Bottom} />
			</>
		);
	},
);
DiagramRootNode.displayName = "component/presentations/Diagram/DiagramRootNode";

/**
 * TODO: ドメインに関する型定義なので実装箇所を変更する
 */
export type ChildItemType = ItemType;

export type DiagramChildNodeProps = Node<ChildItemType>;

export const DiagramChildNode = memo(
	(props: NodeProps<DiagramChildNodeProps>) => {
		const { itemId, itemName, unit, total } = props.data;

		return (
			<>
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
									<Input
										size="xs"
										placeholder="name"
										rightSectionPointerEvents="all"
										rightSection={<ClipBoardCopyButton value={itemName} />}
										value={itemName}
										readOnly
									/>
								</Grid.Col>
							</Grid>
							<Grid align="center">
								<Grid.Col span={2}>unit:</Grid.Col>
								<Grid.Col span={4}>
									<NumberInput
										size="xs"
										style={{ width: "7ch" }}
										rightSection={
											<ClipBoardCopyButton value={unit.toString()} />
										}
										value={unit}
										hideControls
										readOnly
									/>
								</Grid.Col>
								<Grid.Col span={2}>total:</Grid.Col>
								<Grid.Col span={4}>
									<NumberInput
										size="xs"
										style={{ width: "7ch" }}
										rightSection={
											<ClipBoardCopyButton value={total.toString()} />
										}
										value={total}
										hideControls
										readOnly
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
					</Grid>
				</Box>
				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</>
		);
	},
);
DiagramChildNode.displayName =
	"component/presentations/Diagram/DiagramChildNode";

export type DiagramNodeProps = DiagramRootNodeProps | DiagramChildNodeProps;
