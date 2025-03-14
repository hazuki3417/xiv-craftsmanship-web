import { FC, memo } from "react";
import { ClipBoardCopyInput } from "@/component/presentations";
import { Table } from "@mantine/core";

const MemoizedClipBoardCopyInput = memo(ClipBoardCopyInput);

const styleTdProps = {
	pt: 0,
	pb: 0,
};

export type MaterialLeafTableRowProps = {
	name: string;
	quantity: number;
};

export const MaterialLeafTableRow: FC<MaterialLeafTableRowProps> = (
	props: MaterialLeafTableRowProps,
) => {
	const { name, quantity } = props;

	const total = quantity.toString();

	return (
		<Table.Tr>
			<Table.Td {...styleTdProps}>
				<MemoizedClipBoardCopyInput size="xs" variant="unstyled" value={name} />
			</Table.Td>
			<Table.Td {...styleTdProps}>
				<MemoizedClipBoardCopyInput
					size="xs"
					variant="unstyled"
					value={total}
				/>
			</Table.Td>
		</Table.Tr>
	);
};
MaterialLeafTableRow.displayName =
	"@/_component/presentations/MaterialLeafTable/MaterialLeafTableRow";
