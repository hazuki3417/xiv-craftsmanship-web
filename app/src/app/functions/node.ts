import { Node, NodeDataType } from "../hooks";

/**
 * array.{function}用のコールバック関数
 */
export const node = {
	filter: {
		crystal: (node: NodeDataType) => {
			return node.itemType === "crystal";
		},
		internal: (node: NodeDataType) => {
			return node.nodeType === "internal" && node.itemType === "material";
		},
		leaf: (node: NodeDataType) => {
			return node.nodeType === "leaf" && node.itemType === "material";
		},
	},
	extract: {
		data: (node: Node) => node.data,
	},
};
