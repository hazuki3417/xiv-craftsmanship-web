import { FC } from "react";
import { DiagramRootNode, DiagramChildNode } from "./Diagram.components";
import { ReactFlow } from "@xyflow/react";
import { useRecipe } from "../Recipe";

export type DiagramProps = {};

type CompoundedComponent = FC<DiagramProps> & {};

export const Diagram: CompoundedComponent = (props) => {
	const { nodes, edges } = useRecipe();
	// TODO: 下記のエラーに対応をする
	// index.mjs:572 [React Flow]: The React Flow parent container needs a width and a height to render the graph. Help: https://reactflow.dev/error#004
	return (
		<ReactFlow
			nodeTypes={{
				rootNode: DiagramRootNode,
				childNode: DiagramChildNode,
			}}
			nodes={nodes}
			edges={edges}
			maxZoom={0.8}
			zoomOnScroll={false}
			zoomOnPinch={false}
			zoomOnDoubleClick={false}
		/>
	);
};
Diagram.displayName = "component/presentations/Diagram";
