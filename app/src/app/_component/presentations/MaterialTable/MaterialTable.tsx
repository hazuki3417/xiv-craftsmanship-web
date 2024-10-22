import { Table } from "@mantine/core";
import { MaterialTableBody } from "./MaterialTableBody";
import { MaterialTableHeader } from "./MaterialTableHeader";
import { NodeDataType, useAggregateItems } from "@/app/hooks";
import { SortField, SortState, useMaterialTable } from "./useMaterialTable";
import { useMemo } from "react";
import { sorting, sortingIcon } from "@/app/functions/material";

export type MaterialTableProps = {
	items: NodeDataType[];
	sort: SortState<SortField>;
};

export const MaterialTable = (props: MaterialTableProps) => {
	const { sort, name, quantity } = useMaterialTable(props.sort);

	const iconSize = "16";
	const iconName = useMemo(() => sortingIcon(sort.name, iconSize), [sort.name]);
	const iconQuantity = useMemo(
		() => sortingIcon(sort.quantity, iconSize),
		[sort.quantity],
	);

	const aggregateItems = useAggregateItems(props.items)
	const sortedItems = sorting(aggregateItems, sort)

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

MaterialTable.displayName = "@/_component/prestations/MaterialTable";
