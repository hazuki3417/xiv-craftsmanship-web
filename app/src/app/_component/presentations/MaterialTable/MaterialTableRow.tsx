import { FC, memo } from "react";
import { ClipBoardCopyInput } from "@/component/presentations";
import { Table } from "@mantine/core";

const MemoizedClipBoardCopyInput = memo(ClipBoardCopyInput);

export type MaterialTableRowProps = {
	name: string;
	quantity: number;
};

export const MaterialTableRow: FC<MaterialTableRowProps> = (
	props: MaterialTableRowProps,
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
MaterialTableRow.displayName =
	"@/_component/presentations/MaterialTable/MaterialTableRow";
