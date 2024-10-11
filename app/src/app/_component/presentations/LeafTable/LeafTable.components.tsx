import { FC, memo, ReactNode, useMemo } from "react";
import { ClipBoardCopyInput } from "@/component/presentations";
import { Group, rem, Table, UnstyledButton } from "@mantine/core";
import {
	IconArrowsSort,
	IconSortAscending,
	IconSortDescending,
} from "@tabler/icons-react";
import { LeafTableContext, useLeafTable } from "./LeafTable.context";
import {
	defaultToogleSortState,
	NodeDataType,
	useToggleSort,
} from "@/app/hooks";

export interface LeafTableProviderProps {
	children: ReactNode;
}

export const LeafTableProvider: FC<LeafTableProviderProps> = (props) => {
	const { children } = props;

	const { sort, name, quantity } = useToggleSort(defaultToogleSortState);
	const iconSize = 16;

	const iconName = useMemo(() => {
		if (sort.name === "ascending") {
			return <IconSortAscending size={iconSize} />;
		}
		if (sort.name === "descending") {
			return <IconSortDescending size={iconSize} />;
		}
		return <IconArrowsSort size={iconSize} />;
	}, [sort.name]);

	const iconQuantity = useMemo(() => {
		if (sort.quantity === "ascending") {
			return <IconSortAscending size={iconSize} />;
		}
		if (sort.quantity === "descending") {
			return <IconSortDescending size={iconSize} />;
		}
		return <IconArrowsSort size={iconSize} />;
	}, [sort.quantity]);

	return (
		<LeafTableContext.Provider
			value={{
				sort,
				name: {
					label: "name",
					icon: iconName,
					sort: name,
				},
				quantity: {
					label: "quantity",
					icon: iconQuantity,
					sort: quantity,
				},
			}}
		>
			{children}
		</LeafTableContext.Provider>
	);
};
LeafTableProvider.displayName =
	"component/presentations/LeafTable/LeafTableProvider";

type ToggleSortButtonProps = {
	label: string;
	onClick: () => void;
	icon: ReactNode;
};

const ToggleSortButton: FC<ToggleSortButtonProps> = (props) => {
	const { label, onClick, icon } = props;
	return (
		<UnstyledButton onClick={onClick}>
			<Group gap={"xs"}>
				{label}
				{icon}
			</Group>
		</UnstyledButton>
	);
};

const MemoizedToggleSortButton = memo(ToggleSortButton);

export type LeafTableHeaderProps = {};

export const LeafTableHeader: FC<LeafTableHeaderProps> = (props) => {
	const { ...rest } = props;
	const { quantity, name } = useLeafTable();

	const SourceButton = useMemo(() => {
		return <UnstyledButton>source</UnstyledButton>;
	}, []);

	return (
		<Table.Thead>
			<Table.Tr>
				<Table.Th>
					<MemoizedToggleSortButton
						label={name.label}
						onClick={name.sort}
						icon={name.icon}
					/>
				</Table.Th>
				<Table.Th w={rem(120)}>
					<MemoizedToggleSortButton
						label={quantity.label}
						onClick={quantity.sort}
						icon={quantity.icon}
					/>
				</Table.Th>
				<Table.Th w={rem(100)}>{SourceButton}</Table.Th>
			</Table.Tr>
		</Table.Thead>
	);
};
LeafTableHeader.displayName =
	"component/presentations/LeafTable/LeafTableHeader";

const aggregateById = (nodes: NodeDataType[]): NodeDataType[] => {
	const idMap: { [id: string]: NodeDataType } = {};

	nodes.forEach((node) => {
		if (idMap[node.itemId]) {
			idMap[node.itemId].quantity += node.quantity;
		} else {
			idMap[node.itemId] = { ...node };
		}
	});

	return Object.values(idMap);
};

const MemoizedClipBoardCopyInput = memo(ClipBoardCopyInput);

export type LeafTableRowProps = {
	name: string;
	total: number;
};

export const LeafTableRow: FC<LeafTableRowProps> = memo((props) => {
	const { name, total } = props;

	const quantity = total.toString();

	return (
		<Table.Tr>
			<Table.Td>
				<MemoizedClipBoardCopyInput size="xs" variant="unstyled" value={name} />
			</Table.Td>
			<Table.Td>
				<MemoizedClipBoardCopyInput
					size="xs"
					variant="unstyled"
					value={quantity}
				/>
			</Table.Td>
			<Table.Td>source</Table.Td>
		</Table.Tr>
	);
});

export type LeafTableBodyProps = {
	items: NodeDataType[];
};

export const LeafTableBody: FC<LeafTableBodyProps> = (props) => {
	const { items, ...rest } = props;
	const { sort } = useLeafTable();

	const aggregateItems = useMemo(() => aggregateById(items), [items]);
	const sortedItems = useMemo(() => {
		return aggregateItems.sort((a, b) => {
			if (sort.name === "ascending") {
				return a.itemName.localeCompare(b.itemName);
			}
			if (sort.name === "descending") {
				return b.itemName.localeCompare(a.itemName);
			}

			if (sort.quantity === "ascending") {
				return a.quantity - b.quantity;
			}

			if (sort.quantity === "descending") {
				return b.quantity - a.quantity;
			}
			return 0;
		});
	}, [aggregateItems, sort]);

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
			{sortedItems.map((item) => (
				<LeafTableRow
					key={item.itemId}
					name={item.itemName}
					total={item.quantity}
				/>
			))}
		</Table.Tbody>
	);
};
LeafTableBody.displayName = "component/presentations/LeafTable/LeafTableBody";
