import { Table } from "@mantine/core";
import { MaterialLeafTableBody } from "./MaterialLeafTableBody";
import { MaterialLeafTableHeader } from "./MaterialLeafTableHeader";
import { NodeDataType, useAggregateItems } from "@/app/hooks";
import {
	SortField,
	SortState,
	useMaterialLeafTable,
} from "./useMaterialLeafTable";
import { useMemo } from "react";
import { sorting, sortingIcon } from "@/app/functions/material";
import { node } from "@/app/functions/node";

export type MaterialLeafTableProps = {
	items: NodeDataType[];
	sort: SortState<SortField>;
};

export const MaterialLeafTable = (props: MaterialLeafTableProps) => {
	const { sort, name, quantity } = useMaterialLeafTable(props.sort);

	const iconSize = "16";
	const iconName = useMemo(() => sortingIcon(sort.name, iconSize), [sort.name]);
	const iconQuantity = useMemo(
		() => sortingIcon(sort.quantity, iconSize),
		[sort.quantity],
	);

	const filterItems = useMemo(() => {
		return props.items.filter(node.filter.leaf);
	}, [props.items]);
	const aggregateItems = useAggregateItems(filterItems);
	const sortedItems = sorting(aggregateItems, sort);

	return (
		<Table stickyHeader stickyHeaderOffset={0}>
			<MaterialLeafTableHeader
				name={{
					icon: iconName,
					sort: name,
				}}
				quantity={{
					icon: iconQuantity,
					sort: quantity,
				}}
			/>
			<MaterialLeafTableBody items={sortedItems} />
		</Table>
	);
};

MaterialLeafTable.displayName = "@/_component/prestations/MaterialLeafTable";
