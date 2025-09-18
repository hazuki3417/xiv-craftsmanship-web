import { memo } from "react";
import { Table } from "@mantine/core";
import { NodeDataType } from "@/hooks";
import { MaterialCrystalTableRow } from "./MaterialCrystalTableRow";

const MemoizedMaterialCrystalTableRow = memo(MaterialCrystalTableRow);

export type MaterialCrystalTableBodyProps = {
	items: NodeDataType[];
};

export const MaterialCrystalTableBody = (
	props: MaterialCrystalTableBodyProps,
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
				<MemoizedMaterialCrystalTableRow
					key={item.itemId}
					name={item.itemName}
					quantity={item.quantity}
				/>
			))}
		</Table.Tbody>
	);
};
MaterialCrystalTableBody.displayName =
	"@/_component/presentations/MaterialCrystalTable/MaterialCrystalTableBody";
