import { NodeDataType } from "@/app/hooks";
import { SortState, SortType } from "@/app/reducers/toggle-sort";
import { ReactNode } from "react";
import {
	IconArrowsSort,
	IconSortAscending,
	IconSortDescending,
} from "@tabler/icons-react";

export const aggregate = (nodes: NodeDataType[]): NodeDataType[] => {
	const idMap: { [id: string]: NodeDataType } = {};

	nodes.forEach((node) => {
		if (idMap[node.itemId]) {
			idMap[node.itemId].quantity += node.quantity;
		} else {
			idMap[node.itemId] = { ...node };
		}
	});

	return Object.values(idMap);
};

export const sorting = (
	nodes: NodeDataType[],
	sort: SortState,
): NodeDataType[] => {
	// TODO: キーが固定なので下辺に対応できるように改修する
	return nodes.sort((a, b) => {
		if (sort.name === "ascending") {
			return a.itemName.localeCompare(b.itemName);
		}
		if (sort.name === "descending") {
			return b.itemName.localeCompare(a.itemName);
		}

		if (sort.quantity === "ascending") {
			return a.quantity - b.quantity;
		}

		if (sort.quantity === "descending") {
			return b.quantity - a.quantity;
		}
		return 0;
	});
};

export const sortingIcon = (sort: SortType, size: string): ReactNode => {
	if (sort === "ascending") {
		return <IconSortAscending size={size} />;
	}
	if (sort === "descending") {
		return <IconSortDescending size={size} />;
	}
	return <IconArrowsSort size={size} />;
};
