import { RFItemNode } from "./RFItemNode";
import { ReactFlow } from "@xyflow/react";
import { useRecipe } from "../Recipe";
import { Center, useMantineTheme } from "@mantine/core";

export type DiagramProps = {};

export const Diagram = (props: DiagramProps) => {
	const { ...rest } = props;
	const theme = useMantineTheme();
	const { value } = useRecipe();

	// TODO: 下記のエラーに対応をする
	// index.mjs:572 [React Flow]: The React Flow parent container needs a width and a height to render the graph. Help: https://reactflow.dev/error#004
	return (
		<ReactFlow
			nodeTypes={{
				childNode: RFItemNode,
			}}
			nodes={value.nodes}
			edges={value.edges}
			maxZoom={0.7}
			zoomOnScroll={false}
			zoomOnPinch={false}
			zoomOnDoubleClick={false}
			style={{ border: `1px solid ${theme.colors.gray[3]}` }}
		>
			{value.tree === null && (
				<Center style={{ width: "100%", height: "100%" }}>No tree</Center>
			)}
		</ReactFlow>
	);
};
Diagram.displayName = "@/component/presentations/Diagram";
