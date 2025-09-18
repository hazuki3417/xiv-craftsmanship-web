import { memo } from "react";
import { Table } from "@mantine/core";
import { NodeDataType } from "@/hooks";
import { MaterialInternalTableRow } from "./MaterialInternalTableRow";

const MemoizedMaterialInternalTableRow = memo(MaterialInternalTableRow);

export type MaterialInternalTableBodyProps = {
	items: NodeDataType[];
};

export const MaterialInternalTableBody = (
	props: MaterialInternalTableBodyProps,
) => {
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
				<MemoizedMaterialInternalTableRow
					key={item.itemId}
					name={item.itemName}
					quantity={item.quantity}
				/>
			))}
		</Table.Tbody>
	);
};
MaterialInternalTableBody.displayName =
	"@/_component/presentations/MaterialInternalTable/MaterialInternalTableBody";
