import { memo, ReactNode } from "react";
import { rem, Table } from "@mantine/core";
import { LabelButton } from "@/component/Table/LabelButton";

const MemoizedLabelButton = memo(LabelButton);

type ColumnProps = {
	icon: ReactNode;
	sort: () => void;
};

export type MaterialLeafTableHeaderProps = {
	name: ColumnProps;
	quantity: ColumnProps;
};

export const MaterialLeafTableHeader = (
	props: MaterialLeafTableHeaderProps,
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
MaterialLeafTableHeader.displayName =
	"@/_component/MaterialLeafTable/MaterialLeafTableHeader";
