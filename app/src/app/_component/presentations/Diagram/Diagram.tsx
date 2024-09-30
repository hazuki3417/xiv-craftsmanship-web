import { FC } from "react";
import { DiagramChildNode } from "./Diagram.components";
import { ReactFlow } from "@xyflow/react";
import { useRecipe } from "../Recipe";
import { Center, useMantineTheme } from "@mantine/core";

export type DiagramProps = {};

type CompoundedComponent = FC<DiagramProps> & {};

export const Diagram: CompoundedComponent = (props) => {
	const theme = useMantineTheme();
	const { fetch, nodes, edges } = useRecipe();
	const data = fetch.craftItem();

	// TODO: 下記のエラーに対応をする
	// index.mjs:572 [React Flow]: The React Flow parent container needs a width and a height to render the graph. Help: https://reactflow.dev/error#004
	return (
		<ReactFlow
			nodeTypes={{
				childNode: DiagramChildNode,
			}}
			nodes={nodes}
			edges={edges}
			maxZoom={0.7}
			zoomOnScroll={false}
			zoomOnPinch={false}
			zoomOnDoubleClick={false}
			style={{ border: `1px solid ${theme.colors.gray[3]}` }}
		>
			{data === null && (
				<Center style={{ width: "100%", height: "100%" }}>No tree</Center>
			)}
		</ReactFlow>
	);
};
Diagram.displayName = "component/presentations/Diagram";
