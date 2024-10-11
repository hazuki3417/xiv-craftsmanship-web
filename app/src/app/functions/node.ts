import { Node } from "../hooks";

/**
 * array.{function}用のコールバック関数
 */
export const node = {
	filter: {
		crystal: (node: Node) => {
			return node.data.itemType === "crystal";
		},
		internal: (node: Node) => {
			return (
				node.data.nodeType === "internal" && node.data.itemType === "material"
			);
		},
		leaf: (node: Node) => {
			return node.data.nodeType === "leaf" && node.data.itemType === "material";
		},
	},
	extract: {
		data: (node: Node) => node.data,
	},
};
