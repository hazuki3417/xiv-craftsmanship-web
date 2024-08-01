import { FC } from "react"
import { DiagramRootNode, DiagramChildNode, Diagram1Provider } from "./Diagram.components"
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
  return (
    <Diagram1Provider onChangeRootItemCount={onChangeRootItemCount}>
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
    </Diagram1Provider>
  )
}

