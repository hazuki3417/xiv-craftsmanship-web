import { Table } from "@mantine/core";
import { MaterialMiniTableBody } from "./MaterialMiniTableBody";
import { MaterialMiniTableHeader } from "./MaterialMiniTableHeader";
import {
	NodeDataType,
	SortField,
	SortState,
	useMaterialMiniTable,
} from "@/app/hooks";
import { useMemo } from "react";
import { aggregate, sorting, sortingIcon } from "@/app/functions/material";

export type MaterialMiniTableProps = {
	items: NodeDataType[];
	sort: SortState<SortField>;
};

export const MaterialMiniTable = (props: MaterialMiniTableProps) => {
	const { sort, name, quantity } = useMaterialMiniTable(props.sort);

	const iconSize = "16";
	const iconName = useMemo(() => sortingIcon(sort.name, iconSize), [sort.name]);
	const iconQuantity = useMemo(
		() => sortingIcon(sort.quantity, iconSize),
		[sort.quantity],
	);

	const aggregateItems = useMemo(() => aggregate(props.items), [props.items]);
	const sortedItems = useMemo(
		() => sorting(aggregateItems, sort),
		[aggregateItems, sort],
	);

	return (
		<Table stickyHeader stickyHeaderOffset={0}>
			<MaterialMiniTableHeader
				name={{
					icon: iconName,
					sort: name,
				}}
				quantity={{
					icon: iconQuantity,
					sort: quantity,
				}}
			/>
			<MaterialMiniTableBody items={sortedItems} />
		</Table>
	);
};

MaterialMiniTable.displayName = "@/_component/prestations/MaterialMiniTable";
