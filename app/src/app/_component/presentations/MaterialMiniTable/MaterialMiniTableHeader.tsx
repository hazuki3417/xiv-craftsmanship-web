import { memo, ReactNode } from "react";
import { rem, Table } from "@mantine/core";
import { LabelButton } from "../../../../component/presentations/Table/LabelButton";

const MemoizedLabelButton = memo(LabelButton);

type ColumnProps = {
	icon: ReactNode;
	sort: () => void;
};

export type MaterialMiniTableHeaderProps = {
	name: ColumnProps;
	quantity: ColumnProps;
};

export const MaterialMiniTableHeader = (
	props: MaterialMiniTableHeaderProps,
) => {
	const { name, quantity } = props;

	return (
		<Table.Thead>
			<Table.Tr>
				<Table.Th>
					<MemoizedLabelButton
						label="name"
						right={name.icon}
						onClick={name.sort}
					/>
				</Table.Th>
				<Table.Th w={rem(120)}>
					<MemoizedLabelButton
						label="quantity"
						right={quantity.icon}
						onClick={quantity.sort}
					/>
				</Table.Th>
			</Table.Tr>
		</Table.Thead>
	);
};
MaterialMiniTableHeader.displayName =
	"@/_component/presentations/MaterialMiniTable/MaterialMiniTableHeader";
