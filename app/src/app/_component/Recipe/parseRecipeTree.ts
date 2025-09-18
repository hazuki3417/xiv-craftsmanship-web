import { Depth } from "@/lib";
import { Recipe } from "@/openapi";
import { nanoid } from "nanoid";
import { Node, Edge } from "@/hooks";

/**
 * レシピツリーを解析して、Diagram用のノードとエッジを構築する
 */
export const parseRecipeTree = (
	recipe: Recipe,
	parent: Node,
	depth: { x: Depth; y: Depth },
): { nodes: Node[]; edges: Edge[] } => {
	const nodes: Node[] = [];
	const edges: Edge[] = [];

	const childBasePoint = { x: 0, y: 0 };
	const childNodeSpace = { x: 380, y: 140 };

	depth.x.increase();

	const materials = recipe.materials;
	materials.forEach((material, i) => {
		if (i > 0) {
			// 1つ目の素材だけ親素材と同じ位置に配置する
			// 2つ目以降の素材は親素材から1つ下の位置から配置する
			depth.y.increase();
		}

		const parentNodeId = parent.id;
		const childNodeId = nanoid();
		const unit = Math.ceil(parent.data.quantity / parent.data.pieces);
		const quantity = unit * material.quantity;

		const node: Node = {
			id: childNodeId,
			type: "childNode",
			data: {
				nodeType: "leaf",
				itemType: material.type,
				itemId: material.itemId,
				itemName: material.itemName,
				pieces: 0,
				unit: material.quantity,
				quantity: quantity,
				source: "",
				depth: { x: depth.x.getDepth(), y: depth.y.getDepth() },
			},
			position: {
				x: childBasePoint.x + depth.x.getDepth() * childNodeSpace.x,
				y: childBasePoint.y + depth.y.getDepth() * childNodeSpace.y,
			},
		};

		const edge: Edge = {
			id: `${parentNodeId}-${childNodeId}`,
			source: parentNodeId,
			target: childNodeId,
			type: "smoothstep",
		};

		if (material.recipes.length === 0) {
			// レシピが存在しないときの処理
			nodes.push(node);
			edges.push(edge);
			return; // NOTE: continue
		}

		if (material.recipes.length > 0) {
			// レシピが存在するとき
			const recipe = material.recipes[0];
			// NOTE: nodeの情報を一部上書きして追加する。
			node.data.nodeType = "internal";
			node.data.pieces = recipe.pieces;
			nodes.push(node);
			edges.push(edge);

			const { nodes: childNodes, edges: childEdges } = parseRecipeTree(
				recipe,
				node,
				{ x: depth.x, y: depth.y },
			);

			nodes.push(...childNodes);
			edges.push(...childEdges);
		}
	});
	depth.x.decrease();

	return { nodes, edges };
};
