import { useCallback } from "react";
import { Stack } from "../../lib";
import {
	Node as ReactFlowNode,
	Edge as ReactFlowEdge,
	useNodesState,
	useEdgesState,
} from "@xyflow/react";

export type NodeType = "root" | "internal" | "leaf";
export type NodeDataType = {
	nodeType: NodeType;
	itemType: string;
	itemId: string;
	itemName: string;
	pieces: number; // 製作アイテムなら1以上の値、それ以外なら0固定
	unit: number;
	quantity: number;
	source: string;
	depth: { x: number; y: number };
};

export type Node = ReactFlowNode<NodeDataType>;
export type Edge = ReactFlowEdge;

export type MaterialTreeState = {
	nodes: Node[];
	edges: Edge[];
};

export const calcQuantity = (nodes: Node[], request: number): Node[] => {
	const parents = new Stack<Node>();

	return nodes.map((node) => {
		if (node.data.nodeType === "root") {
			const quantity = node.data.unit * request;

			const newNode: Node = {
				...node,
				data: {
					...node.data,
					quantity: quantity,
				},
			};
			// 親がないので自身をstackする
			parents.push(newNode);
			return newNode;
		}

		let parent = parents.peek();
		if (parent === undefined) {
			throw new Error("想定していないエラー");
		}

		// ループ中のNodeから、ループ中のNodeの親となるNodeを参照したい。
		// 親子関係の参照となるように、Nodeの階層情報から親を参照できるようStackを制御する
		const isCurrentParentChildNode = parent.data.depth.x === node.data.depth.x;
		if (isCurrentParentChildNode) {
			parents.pop();
			parent = parents.peek();
			if (parent === undefined) {
				throw new Error("想定していないエラー");
			}
		}

		// 必要な素材数の算出
		const unit = Math.ceil(parent.data.quantity / parent.data.pieces);
		const quantity = unit * node.data.unit;

		if (node.data.nodeType === "leaf") {
			// leafの時の処理
			const newNode: Node = {
				...node,
				data: {
					...node.data,
					quantity: quantity,
				},
			};
			return newNode;
		}

		// internalの時の処理
		const newNode: Node = {
			...node,
			data: {
				...node.data,
				quantity: quantity,
			},
		};

		// 中間素材なので次のループで親となるようにstackする
		parents.push(newNode);
		return newNode;
	});
};

export interface UseMaterialTree {
	nodes: Node[];
	edges: Edge[];
	setTree: (nodes: Node[], edges: Edge[]) => void;
	setQuantity: (quantity: number) => void;
}

export const useMaterialTree = (value: MaterialTreeState): UseMaterialTree => {
	const [nodes, setNodes] = useNodesState<Node>(value.nodes);
	const [edges, setEdges] = useEdgesState<Edge>(value.edges);

	const setTree = useCallback((nodes: Node[], edges: Edge[]) => {
		setNodes(nodes);
		setEdges(edges);
	}, []);

	const setQuantity = useCallback((quantity: number) => {
		setNodes((prev) => calcQuantity(prev, quantity));
	}, []);

	return {
		nodes: nodes,
		edges: edges,
		setTree,
		setQuantity,
	};
};

export const defaultMaterialTreeState: MaterialTreeState = {
	nodes: [],
	edges: [],
};
