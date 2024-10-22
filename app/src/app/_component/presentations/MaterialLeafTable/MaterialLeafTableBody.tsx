import { memo } from "react";
import { Table } from "@mantine/core";
import { NodeDataType } from "@/app/hooks";
import { MaterialLeafTableRow } from "./MaterialLeafTableRow";

const MemoizedMaterialLeafTableRow = memo(MaterialLeafTableRow);

export type MaterialLeafTableBodyProps = {
	items: NodeDataType[];
};

export const MaterialLeafTableBody = (props: MaterialLeafTableBodyProps) => {
	const { items } = props;

	if (items.length === 0) {
		return (
			<Table.Tbody>
				<Table.Tr>
					<Table.Td colSpan={3} align="center">
						No data
					</Table.Td>
				</Table.Tr>
			</Table.Tbody>
		);
	}

	return (
		<Table.Tbody>
			{items.map((item) => (
				<MemoizedMaterialLeafTableRow
					key={item.itemId}
					name={item.itemName}
					quantity={item.quantity}
				/>
			))}
		</Table.Tbody>
	);
};
MaterialLeafTableBody.displayName =
	"@/_component/presentations/MaterialLeafTable/MaterialLeafTableBody";
