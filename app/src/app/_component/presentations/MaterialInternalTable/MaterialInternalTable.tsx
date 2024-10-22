import { Table } from "@mantine/core";
import { MaterialInternalTableBody } from "./MaterialInternalTableBody";
import { MaterialInternalTableHeader } from "./MaterialInternalTableHeader";
import { NodeDataType, useAggregateItems } from "@/app/hooks";
import {
	SortField,
	SortState,
	useMaterialInternalTable,
} from "./useMaterialInternalTable";
import { useMemo } from "react";
import { sorting, sortingIcon } from "@/app/functions/material";

export type MaterialInternalTableProps = {
	items: NodeDataType[];
	sort: SortState<SortField>;
};

export const MaterialInternalTable = (props: MaterialInternalTableProps) => {
	const { sort, name, quantity } = useMaterialInternalTable(props.sort);

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
			<MaterialInternalTableHeader
				name={{
					icon: iconName,
					sort: name,
				}}
				quantity={{
					icon: iconQuantity,
					sort: quantity,
				}}
			/>
			<MaterialInternalTableBody items={sortedItems} />
		</Table>
	);
};

MaterialInternalTable.displayName =
	"@/_component/prestations/MaterialInternalTable";
