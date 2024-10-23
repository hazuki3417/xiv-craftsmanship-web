import { Table } from "@mantine/core";
import { MaterialCrystalTableBody } from "./MaterialCrystalTableBody";
import { MaterialCrystalTableHeader } from "./MaterialCrystalTableHeader";
import { NodeDataType, useAggregateItems } from "@/app/hooks";
import {
	SortField,
	SortState,
	useMaterialCrystalTable,
} from "./useMaterialCrystalTable";
import { useMemo } from "react";
import { sorting, sortingIcon } from "@/app/functions/material";
import { node } from "@/app/functions/node";

export type MaterialCrystalTableProps = {
	items: NodeDataType[];
	sort: SortState<SortField>;
};

export const MaterialCrystalTable = (props: MaterialCrystalTableProps) => {
	const { sort, name, quantity } = useMaterialCrystalTable(props.sort);

	const iconSize = "16";
	const iconName = useMemo(() => sortingIcon(sort.name, iconSize), [sort.name]);
	const iconQuantity = useMemo(
		() => sortingIcon(sort.quantity, iconSize),
		[sort.quantity],
	);

	const filterItems = useMemo(() => {
		return props.items.filter(node.filter.crystal);
	}, [props.items]);
	const aggregateItems = useAggregateItems(filterItems);
	const sortedItems = sorting(aggregateItems, sort);

	return (
		<Table stickyHeader stickyHeaderOffset={0}>
			<MaterialCrystalTableHeader
				name={{
					icon: iconName,
					sort: name,
				}}
				quantity={{
					icon: iconQuantity,
					sort: quantity,
				}}
			/>
			<MaterialCrystalTableBody items={sortedItems} />
		</Table>
	);
};

MaterialCrystalTable.displayName =
	"@/_component/prestations/MaterialCrystalTable";
