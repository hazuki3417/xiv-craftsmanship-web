
"use client"
import { FC, useEffect, useState } from 'react';
import {
  useNodesState,
  useEdgesState,
  Edge,
} from '@xyflow/react';
import { Diagram, InternalTable, LeafTable, DiagramChildNodeProps, DiagramNodeProps, DiagramRootNodeProps, useItemAggregation, ChildItemType, ItemType } from './../index';
import { Grid, Box } from '@mantine/core';
import { Depth } from '@/lib';
// TODO: コンポーネント名をかえる。たとえばレシピ、設計図などの名前にする


interface Item {
  id: string
  name: string
  quantity: number
  children: Item[]
}

// NOTE: rootよりしたの階層構造をもつデータ
const initialParts: Item[] = [
  {
    id: "2",
    name: 'internal item a',
    quantity: 6,
    children: [
      {
        id: "3",
        name: 'leaf item b',
        quantity: 4,
        children: []
      },
      {
        id: "4",
        name: 'internal item c',
        quantity: 3,
        children: [
          {
            id: "5",
            name: 'leaf item d',
            quantity: 1,
            children: []
          },
        ],
      },
    ],
  },
  // {
  //   id: "6",
  //   name: 'Child id 6',
  //   quantity: 1,
  //   children: []
  // },
  // {
  //   id: "7",
  //   name: 'Child id 7',
  //   quantity: 1,
  //   children: []
  // },
  // {
  //   id: "8",
  //   name: 'Child id 8',
  //   quantity: 1,
  //   children: []
  // },
  // {
  //   id: "9",
  //   name: 'Child id 9',
  //   quantity: 1,
  //   children: []
  // },
  // {
  //   id: "10",
  //   name: 'Child id 10',
  //   quantity: 1,
  //   children: []
  // },
  // {
  //   id: "11",
  //   name: 'Child id 11',
  //   quantity: 1,
  //   children: []
  // },
  // {
  //   id: "12",
  //   name: 'Child id 12',
  //   quantity: 1,
  //   children: []
  // },
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

const buildNodeAndEdge = (memo: BuildMemoType): { nodes: DiagramChildNodeProps[], edges: Edge[] } => {
  const nodes: DiagramChildNodeProps[] = [];
  const edges: Edge[] = [];
  // TODO: 外部からせっていできるようにする
  const childBasePoint = { x: 200, y: 180 }
  const childNodeSpace = { x: 380, y: 140 }

  memo.items.forEach((item) => {
    const existsChildNode = item.children.length > 0;
    const tcount = memo.pcount * item.quantity;

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


export interface TabProps {
  tabid: string;
}

export const Tab: FC<TabProps> = (props) => {
  const { ...rest } = props;
  const [rootCount, setRootCount] = useState(1);
  const [nodes, setNodes] = useNodesState<DiagramNodeProps>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const { dispatchTabData } = useItemAggregation();


  useEffect(() => {
    const depthX = new Depth()
    const depthY = new Depth()

    // TODO: imp data fetch
    const rootId = "root";
    const rootNode: DiagramRootNodeProps = {
      id: rootId,
      type: 'rootNode',
      data: {
        id: rootId,
        type: 'root',
        name: "root",
        count: rootCount,
      },
      position: { x: 0, y: 0 },
    }

    const { nodes, edges } = buildNodeAndEdge({
      // items: initialParts,
      items: [],
      parentId: rootId,
      depth: { x: depthX, y: depthY },
      pcount: rootCount
    });

    setNodes([rootNode, ...nodes]);
    setEdges(edges);
    dispatchTabData(props.tabid, nodes.flatMap((node) => node.data));
  }, [rootCount]);

  const onChangeRootItem = (value: string | number) => {
    setRootCount(Number(value));
  }

  const internalItems = nodes.filter((node): node is DiagramChildNodeProps => node.data.type === "internal").flatMap((node) => node.data);
  const leafItems = nodes.filter((node): node is DiagramChildNodeProps => node.data.type === "leaf").flatMap((node) => node.data);;

  return (
    <Box>
      <Grid>
        <Grid.Col span={12} style={{ height: '60vh' }}>
          <Diagram nodes={nodes} edges={edges} onChangeRootItemCount={onChangeRootItem} />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={4}>
          <InternalTable>
            <InternalTable.Header />
            <InternalTable.Body items={internalItems} />
          </InternalTable>
        </Grid.Col>
        <Grid.Col span={8}>
          <LeafTable>
            <LeafTable.Header />
            <LeafTable.Body items={leafItems} />
          </LeafTable>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
