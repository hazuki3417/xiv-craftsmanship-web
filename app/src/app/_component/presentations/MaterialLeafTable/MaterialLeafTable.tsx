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

	const aggregateItems = useAggregateItems(props.items);
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
