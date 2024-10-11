import { Table } from "@mantine/core";
import { MaterialTableBody } from "./MaterialTableBody";
import { MaterialTableHeader } from "./MaterialTableHeader";
import { NodeDataType, SortState, SortType, useToggleSort } from "@/app/hooks";
import { ReactNode, useMemo } from "react";
import {
	IconArrowsSort,
	IconSortAscending,
	IconSortDescending,
} from "@tabler/icons-react";

const aggregate = (nodes: NodeDataType[]): NodeDataType[] => {
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

const sorting = (nodes: NodeDataType[], sort: SortState): NodeDataType[] => {
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

const sortIcon = (sort: SortType, size: string): ReactNode => {
	if (sort === "ascending") {
		return <IconSortAscending size={size} />;
	}
	if (sort === "descending") {
		return <IconSortDescending size={size} />;
	}
	return <IconArrowsSort size={size} />;
};

export type MaterialTableProps = {
	items: NodeDataType[];
	sort: SortState;
};

export const MaterialTable = (props: MaterialTableProps) => {
	const { sort, name, quantity } = useToggleSort(props.sort);

	const iconSize = "16";
	const iconName = useMemo(() => sortIcon(sort.name, iconSize), [sort.name]);
	const iconQuantity = useMemo(
		() => sortIcon(sort.quantity, iconSize),
		[sort.name],
	);

	const aggregateItems = useMemo(() => aggregate(props.items), [props.items]);
	const sortedItems = useMemo(
		() => sorting(aggregateItems, sort),
		[aggregateItems, sort],
	);


	return (
		<Table stickyHeader stickyHeaderOffset={0}>
			<MaterialTableHeader
				name={{
					icon: iconName,
					sort: name,
				}}
				quantity={{
					icon: iconQuantity,
					sort: quantity,
				}}
			/>
			<MaterialTableBody items={sortedItems} />
		</Table>
	);
};

MaterialTable.displayName = "@/component/prestations/MaterialTable";
