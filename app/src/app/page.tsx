"use client"
import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Edge,
} from '@xyflow/react';

import { Diagram, InternalTable, LeafTable, DiagramChildNodeProps, NodeType, DiagramNodeProps } from './_component/presentations';
import { Box, Button, Container, Grid, Input, NumberInput, ScrollArea, Table } from '@mantine/core';
import { Depth } from '@/lib';

interface Item {
  id: string
  name: string
  quantity: number
  children: Item[]
}

const initialParts: Item[] = [
  {
    id: "1",
    name: 'rooot',
    quantity: 1,
    children: [
      {
        id: "2",
        name: 'a',
        quantity: 6,
        children: [
          {
            id: "3",
            name: 'Sub Child Part C',
            quantity: 4,
            children: []
          },
          {
            id: "4",
            name: 'd',
            quantity: 3,
            children: [
              {
                id: "5",
                name: 'Child Part E',
                quantity: 1,
                children: []
              },
            ],
          },
        ],
      },
      {
        id: "6",
        name: 'Child id 6',
        quantity: 1,
        children: []
      },
      {
        id: "7",
        name: 'Child id 7',
        quantity: 1,
        children: []
      },
      {
        id: "8",
        name: 'Child id 8',
        quantity: 1,
        children: []
      },
      {
        id: "9",
        name: 'Child id 9',
        quantity: 1,
        children: []
      },
      {
        id: "10",
        name: 'Child id 10',
        quantity: 1,
        children: []
      },
      {
        id: "11",
        name: 'Child id 11',
        quantity: 1,
        children: []
      },
      {
        id: "12",
        name: 'Child id 12',
        quantity: 1,
        children: []
      },
    ],
  },
];

/**
 * 再起処理するときに前の情報を引き継ぐもの
 */
type BuildMemoType = {
  items: Item[]
  parentId: string
  pcount: number
  depth: { x: Depth, y: Depth }
}

const buildNodeAndEdge = (memo: BuildMemoType): { nodes: DiagramNodeProps[], edges: Edge[] } => {
  const nodes: DiagramNodeProps[] = [];
  const edges: Edge[] = [];
  // TODO: 外部からせっていできるようにする
  const childBasePoint = { x: -140, y: 160 }
  const childNodeSpace = { x: 380, y: 140 }

  // let type: NodeType = 'root';
  memo.items.forEach((item) => {
    const existsParentNode = memo.parentId !== "";
    const existsChildNode = item.children.length > 0;
    const tcount = memo.pcount * item.quantity;

    if (!existsParentNode) {
      // Rootに対する処理
      nodes.push({
        id: item.id,
        type: 'rootNode',
        data: {
          id: item.id,
          type: 'root',
          name: item.name,
          count: item.quantity,
        },
        position: { x: 0, y: 0 },
      });
    } else {
      // Rootよりしたの階層に対する処理
      nodes.push({
        id: item.id,
        type: 'childNode',
        data: {
          id: item.id,
          type: existsChildNode ? 'internal' : 'leaf',
          name: item.name,
          ucount: item.quantity,
          tcount: tcount,
          depth: { x: memo.depth.x.getDepth(), y: memo.depth.y.getDepth() },
        },
        position: {
          x: childBasePoint.x + (memo.depth.x.getDepth() * childNodeSpace.x),
          y: childBasePoint.y + (memo.depth.y.getDepth() * childNodeSpace.y)
        },
      });

      edges.push({
        id: `${memo.parentId}-${item.id}`,
        source: memo.parentId,
        target: item.id,
        type: "smoothstep",
      });
    }

    if (existsChildNode) {
      memo.depth.x.increase();
      const { nodes: childNodes, edges: childEdges } = buildNodeAndEdge({ items: item.children, parentId: item.id, depth: { x: memo.depth.x, y: memo.depth.y }, pcount: tcount });
      memo.depth.x.decrease();
      nodes.push(...childNodes);
      edges.push(...childEdges);
    } else {
      memo.depth.y.increase();
    }
  })

  return { nodes, edges };
};



export default function Home() {
  const [rootCount, setRootCount] = useState(1);
  const [nodes, setNodes] = useNodesState<DiagramNodeProps>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);


  useEffect(() => {
    const depthX = new Depth()
    const depthY = new Depth()

    const { nodes, edges } = buildNodeAndEdge({
      items: initialParts,
      parentId: "",
      depth: { x: depthX, y: depthY },
      pcount: rootCount
    });
    setNodes(nodes);
    setEdges(edges);
  }, [rootCount]);

  const onChangeRootItem = (value: string | number) => {
    setRootCount(Number(value));
  }

  return (
    <Container fluid style={{ height: '100vh' }}>
      <Grid>
        <Grid.Col span={12}>h</Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12}>
          {/* <Button onClick={() => {
            console.debug(nodes);
          }}>debug</Button> */}
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12} style={{ height: '60vh' }}>
          <Diagram nodes={nodes} edges={edges} onChangeRootItemCount={onChangeRootItem} />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={4}>
          <InternalTable>
            <InternalTable.Header />
            <InternalTable.Body nodes={nodes.filter((node): node is DiagramChildNodeProps => node.data.type === "internal")} />
          </InternalTable>
        </Grid.Col>
        <Grid.Col span={8}>
          <LeafTable>
            <LeafTable.Header />
            <LeafTable.Body nodes={nodes.filter((node): node is DiagramChildNodeProps => node.data.type === "leaf")} />
          </LeafTable>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
