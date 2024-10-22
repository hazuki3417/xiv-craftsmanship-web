import { memo } from "react";
import { Table } from "@mantine/core";
import { NodeDataType } from "@/app/hooks";
import { MaterialTableRow } from "./MaterialTableRow";

const MemoizedMaterialTableRow = memo(MaterialTableRow);

export type MaterialTableBodyProps = {
	items: NodeDataType[];
};

export const MaterialTableBody = (props: MaterialTableBodyProps) => {
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
				<MemoizedMaterialTableRow
					key={item.itemId}
					name={item.itemName}
					quantity={item.quantity}
				/>
			))}
		</Table.Tbody>
	);
};
MaterialTableBody.displayName =
	"@/_component/presentations/MaterialTable/MaterialTableBody";
