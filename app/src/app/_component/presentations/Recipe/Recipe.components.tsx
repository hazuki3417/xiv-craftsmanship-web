import { ReactNode, FC, useState, useEffect, useCallback } from "react";
import { CraftItem, RecipeContext, useRecipe } from "./Recipe.context";
import { Depth } from "@/lib";
import {
	DiagramChildNodeProps,
	DiagramNodeProps,
	DiagramRootNodeProps,
} from "../Diagram";
import { Edge, useEdgesState, useNodesState } from "@xyflow/react";
import { LeafTable } from "../LeafTable";
import { InternalTable } from "../InternalTable";
import { useMaterialManager } from "../MaterialManagerProvider";

type MaterialNode = {
	id: string;
	name: string;
	unit: number;
	total: number;
	children: MaterialNode[];
};

/**
 * 選択したアイテムのレシピツリーを構築する
 */
const buidRecipeTree = (craftItem: CraftItem) => {
	const { id, materials } = craftItem;
	const map: { [key: string]: MaterialNode } = {};

	materials.forEach((material) => {
		const exists = {
			parent: map[material.parentId],
			child: map[material.childId],
		};
		if (!exists.parent) {
			map[material.parentId] = {
				id: material.parentId,
				name: material.parentName,
				unit: material.unit,
				total: material.total,
				children: [],
			};
		}
		if (!exists.child) {
			map[material.childId] = {
				id: material.childId,
				name: material.childName,
				unit: material.unit,
				total: material.total,
				children: [],
			};
		}
	});

	materials.forEach((material) => {
		const parent = map[material.parentId];
		const child = map[material.childId];
		parent.children.push(child);
	});

	const tree = map[id];
	return tree;
};

type TreeNode = {
	nodes: MaterialNode[];
	id: string;
	count: number;
	depth: { x: Depth; y: Depth };
};

/**
 * レシピツリーを解析して、Diagram用のノードとエッジを構築する
 */
const parseRecipeTree = (
	current: TreeNode,
): { nodes: DiagramChildNodeProps[]; edges: Edge[] } => {
	const nodes: DiagramChildNodeProps[] = [];
	const edges: Edge[] = [];

	const childBasePoint = { x: 260, y: 180 };
	const childNodeSpace = { x: 380, y: 140 };

	current.nodes.forEach((node) => {
		const exists = node.children.length > 0;
		const total = current.count * node.total;

		nodes.push({
			id: node.id,
			type: "childNode",
			data: {
				id: node.id,
				type: exists ? "internal" : "leaf",
				name: node.name,
				ucount: node.unit,
				tcount: total,
				depth: { x: current.depth.x.getDepth(), y: current.depth.y.getDepth() },
			},
			position: {
				x: childBasePoint.x + current.depth.x.getDepth() * childNodeSpace.x,
				y: childBasePoint.y + current.depth.y.getDepth() * childNodeSpace.y,
			},
		});
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
				depth: { x: current.depth.x, y: current.depth.y },
			});
			current.depth.x.decrease();
			nodes.push(...childNodes);
			edges.push(...childEdges);
		} else {
			current.depth.y.increase();
		}
	});

	return { nodes, edges };
};

export interface RecipeProviderProps {
	recipeId: string;
	children: ReactNode;
}

export const RecipeProvider: FC<RecipeProviderProps> = (props) => {
	const { recipeId, children, ...rest } = props;

	const { fetch, dispatch } = useMaterialManager();

	// craftするアイテムの情報を管理
	const [craftItem, setCraftItem] = useState<CraftItem | null>(
		fetch.craftItem(recipeId),
	);

	//  rootのアイテム数を管理
	const [rootCount, setRootCount] = useState(fetch.quantity(recipeId));

	// diagramのノードとエッジを管理
	const [nodes, setNodes] = useNodesState<DiagramNodeProps>([]);
	const [edges, setEdges] = useEdgesState<Edge>([]);

	const onChangeRootCount = useCallback((value: string | number) => {
		setRootCount(Number(value));
	}, []);

	const rootCountUp = useCallback(() => {
		setRootCount((value) => {
			return Math.min(99, value + 1);
		});
	}, []);

	const rootCountDown = useCallback(() => {
		setRootCount((value) => {
			return Math.max(1, value - 1);
		});
	}, []);

	useEffect(() => {
		const rootId = "root";
		const rootNode: DiagramRootNodeProps = {
			id: rootId,
			type: "rootNode",
			data: {
				id: rootId,
				type: "root",
				name: "root",
				count: rootCount,
			},
			position: { x: 0, y: 0 },
		};

		if (!craftItem) {
			// 選択されていないとき
			setNodes([rootNode]);
			return;
		}

		// 選択されたとき
		const tree = buidRecipeTree(craftItem);
		const { nodes, edges } = parseRecipeTree({
			nodes: tree.children,
			id: rootId,
			count: rootCount,
			depth: { x: new Depth(), y: new Depth() },
		});

		setNodes([rootNode, ...nodes]);
		setEdges(edges);
		dispatch.craftItem({ recipeId, craftItem });
		dispatch.materials({ recipeId, materials: nodes.map((node) => node.data) });
		dispatch.quantity({ recipeId, quantity: rootCount });
	}, [craftItem, rootCount]);

	return (
		<RecipeContext.Provider
			value={{
				root: {
					quantity: rootCount,
					countUp: rootCountUp,
					countDown: rootCountDown,
					onChange: onChangeRootCount,
				},
				dispatch: { craftitem: setCraftItem },
				fetch: { craftItem: () => craftItem },
				nodes,
				edges,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};
RecipeProvider.displayName = "component/presentations/Recipe/RecipeProvider";

export const RecipeLeafTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes
		.filter((node): node is DiagramChildNodeProps => node.data.type === "leaf")
		.flatMap((node) => node.data);

	return (
		<LeafTable>
			<LeafTable.Header />
			<LeafTable.Body items={items} />
		</LeafTable>
	);
};

export const RecipeInternalTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes
		.filter(
			(node): node is DiagramChildNodeProps => node.data.type === "internal",
		)
		.flatMap((node) => node.data);

	return (
		<InternalTable>
			<InternalTable.Header />
			<InternalTable.Body items={items} />
		</InternalTable>
	);
};
