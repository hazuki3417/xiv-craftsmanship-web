import { memo } from "react";
import { Table } from "@mantine/core";
import { NodeDataType } from "@/app/hooks";
import { MaterialMiniTableRow } from "./MaterialMiniTableRow";

const MemoizedMaterialMiniTableRow = memo(MaterialMiniTableRow);

export type MaterialMiniTableBodyProps = {
	items: NodeDataType[];
};

export const MaterialMiniTableBody = (props: MaterialMiniTableBodyProps) => {
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
				<MemoizedMaterialMiniTableRow
					key={item.itemId}
					name={item.itemName}
					quantity={item.quantity}
				/>
			))}
		</Table.Tbody>
	);
};
MaterialMiniTableBody.displayName =
	"@/_component/presentations/MaterialMiniTable/MaterialMiniTableBody";
