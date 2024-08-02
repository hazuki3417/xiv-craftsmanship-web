import { FC } from "react"
import { DiagramRootNode, DiagramChildNode, DiagramProvider } from "./Diagram.components"
import { ReactFlow, Edge, Node } from "@xyflow/react"

export type DiagramProps = {
  nodes: Node[]
  edges: Edge[]
  onChangeRootItemCount: (value: number | string) => void
}

type CompoundedComponent = FC<DiagramProps> & {
}

export const Diagram: CompoundedComponent = (props) => {
  const { nodes, edges, onChangeRootItemCount } = props
  // TODO: 下記のエラーに対応をする
  // index.mjs:572 [React Flow]: The React Flow parent container needs a width and a height to render the graph. Help: https://reactflow.dev/error#004
  return (
    <DiagramProvider onChangeRootItemCount={onChangeRootItemCount}>
      <ReactFlow
        nodeTypes={{
          rootNode: DiagramRootNode,
          childNode: DiagramChildNode,
        }}
        nodes={nodes}
        edges={edges}
        maxZoom={0.6}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      />
    </DiagramProvider>
  )
}
Diagram.displayName = "component/presentations/Diagram"
