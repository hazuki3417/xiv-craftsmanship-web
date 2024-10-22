import { FC, memo } from "react";
import { ClipBoardCopyInput } from "@/component/presentations";
import { Table } from "@mantine/core";

const MemoizedClipBoardCopyInput = memo(ClipBoardCopyInput);

export type MaterialCrystalTableRowProps = {
	name: string;
	quantity: number;
};

export const MaterialCrystalTableRow: FC<MaterialCrystalTableRowProps> = (
	props: MaterialCrystalTableRowProps,
) => {
	const { name, quantity } = props;

	const total = quantity.toString();

	return (
		<Table.Tr>
			<Table.Td>
				<MemoizedClipBoardCopyInput size="xs" variant="unstyled" value={name} />
			</Table.Td>
			<Table.Td>
				<MemoizedClipBoardCopyInput
					size="xs"
					variant="unstyled"
					value={total}
				/>
			</Table.Td>
		</Table.Tr>
	);
};
MaterialCrystalTableRow.displayName =
	"@/_component/presentations/MaterialCrystalTable/MaterialCrystalTableRow";
