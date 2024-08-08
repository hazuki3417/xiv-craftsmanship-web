import { ReactNode, FC, useState, useEffect, useCallback } from "react";
import { CraftItem, RecipeContext, useRecipe } from "./index";
import { Depth } from "@/lib";
import { DiagramChildNodeProps, DiagramNodeProps } from "../Diagram";
import { Edge, useEdgesState, useNodesState } from "@xyflow/react";

export interface RecipeProviderProps {
  children: ReactNode;
}

type MaterialNode = {
  id: string;
  name: string;
  unit: number;
  total: number;
  children: MaterialNode[];
}

/**
 * 選択したアイテムのレシピツリーを構築する
 */
const buidRecipeTree = (craftItem: CraftItem) => {
  const { id, materials } = craftItem;
  const map: { [key: string]: MaterialNode } = {};

  materials.forEach((material) => {
    const exists = {
      parent: map[material.parentId],
      child: map[material.childId]
    }
    if (!exists.parent) {
      map[material.parentId] = {
        id: material.parentId,
        name: material.parentName,
        unit: material.unit,
        total: material.total,
        children: []
      }
    }
    if (!exists.child) {
      map[material.childId] = {
        id: material.childId,
        name: material.childName,
        unit: material.unit,
        total: material.total,
        children: []
      }
    }
  });

  materials.forEach((material) => {
    const parent = map[material.parentId];
    const child = map[material.childId];
    parent.children.push(child);
  })

  const tree = map[id];
  return tree
}

type TreeNode = {
  nodes: MaterialNode[];
  id: string
  count: number
  depth: { x: Depth, y: Depth }
}

/**
 * レシピツリーを解析して、Diagram用のノードとエッジを構築する
 */
const parseRecipeTree = (current: TreeNode): { nodes: DiagramChildNodeProps[], edges: Edge[] } => {
  const nodes: DiagramChildNodeProps[] = [];
  const edges: Edge[] = [];

  const childBasePoint = { x: 260, y: 180 }
  const childNodeSpace = { x: 380, y: 140 }

  current.nodes.forEach((node) => {
    const exists = node.children.length > 0
    const total = current.count * node.total;

    nodes.push({
      id: node.id,
      type: 'childNode',
      data: {
        id: node.id,
        type: exists ? "internal" : "leaf",
        name: node.name,
        ucount: node.unit,
        tcount: total,
        depth: { x: current.depth.x.getDepth(), y: current.depth.y.getDepth() },
      },
      position: {
        x: childBasePoint.x + (current.depth.x.getDepth() * childNodeSpace.x),
        y: childBasePoint.y + (current.depth.y.getDepth() * childNodeSpace.y)
      }
    })
    edges.push({
      id: `${current.id}-${node.id}`,
      source: current.id,
      target: node.id,
      type: "smoothstep",
    });

    if (exists) {
      current.depth.x.increase();
      const { nodes: childNodes, edges: childEdges } = parseRecipeTree({
        nodes: node.children,
        id: node.id,
        count: total,
        depth: { x: current.depth.x, y: current.depth.y }
      });
      current.depth.x.decrease();
      nodes.push(...childNodes);
      edges.push(...childEdges);
    } else {
      current.depth.y.increase();
    }
  })

  return { nodes, edges }
}

export const RecipeProvider: FC<RecipeProviderProps> = (props) => {
  const { children, ...rest } = props;

  // craftするアイテムの情報を管理
  const [craftItem, setCraftItem] = useState<CraftItem | null>(null)

  //  rootのアイテム数を管理
  const [rootCount, setRootCount] = useState(1);

  // diagramのノードとエッジを管理
  const [nodes, setNodes] = useNodesState<DiagramNodeProps>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const onChangeRootCount = useCallback((value: string | number) => {
    setRootCount(Number(value));
  }, [])

  useEffect(() => {
    if (!craftItem) {
      // 選択されていないとき
      setNodes([{
        id: "",
        type: 'rootNode',
        data: {
          id: "",
          type: 'root',
          name: "",
          count: rootCount,
        },
        position: { x: 0, y: 0 },
      }]);
      return;
    }

    // 選択されたとき

    // レシピツリーを構築
    const tree = buidRecipeTree(craftItem);
    // レシピツリーを解析
    const { nodes, edges } = parseRecipeTree({
      nodes: [tree],
      id: craftItem.id,
      count: rootCount,
      depth: { x: new Depth(), y: new Depth() }
    });

    setNodes([{
      id: craftItem.id,
      type: 'rootNode',
      data: {
        id: craftItem.id,
        type: 'root',
        name: craftItem.name,
        count: rootCount,
      },
      position: { x: 0, y: 0 },
    }, ...nodes]);
    setEdges(edges);
  }, [craftItem, rootCount]);

  return (
    <RecipeContext.Provider value={{
      rootCount,
      onChangeRootCount,
      setCraftItem,
      nodes,
      edges,
    }}>
      {children}
    </RecipeContext.Provider >
  );
};
RecipeProvider.displayName = "component/presentations/Recipe/RecipeProvider";
