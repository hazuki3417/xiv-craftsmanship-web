import { FC, memo, ReactNode, useCallback, useMemo, useState } from "react";
import { ChildItemType, ClipBoardCopyButton, ItemType } from "../index";
import { Group, Input, rem, Table, UnstyledButton } from "@mantine/core";
import {
	IconArrowsSort,
	IconSortAscending,
	IconSortDescending,
} from "@tabler/icons-react";
import {
	CrystalTableContext,
	useCrystalTable,
	SortState,
} from "./CrystalTable.context";

export interface CrystalTableProviderProps {
	children: ReactNode;
}

const defaultSortState: SortState = {
	name: "none",
	quantity: "none",
};

export const CrystalTableProvider: FC<CrystalTableProviderProps> = (props) => {
	const { children, ...rest } = props;
	const [sort, setSort] = useState<SortState>(defaultSortState);

	const toggleSortName = useCallback(() => {
		setSort((prevSort) => {
			return {
				quantity: "none",
				name:
					prevSort.name === "none"
						? "ascending"
						: prevSort.name === "ascending"
							? "descending"
							: "none",
			};
		});
	}, []);

	const toggleSortQuantity = useCallback(() => {
		setSort((prevSort) => {
			return {
				quantity:
					prevSort.quantity === "none"
						? "ascending"
						: prevSort.quantity === "ascending"
							? "descending"
							: "none",
				name: "none",
			};
		});
	}, []);

	const iconSize = 16;

	const iconName = useMemo(() => {
		const target = "name";
		if (sort[target] === "ascending") {
			return <IconSortAscending size={iconSize} />;
		}
		if (sort[target] === "descending") {
			return <IconSortDescending size={iconSize} />;
		}
		return <IconArrowsSort size={iconSize} />;
	}, [sort["name"]]);

	const iconQuantity = useMemo(() => {
		const target = "quantity";
		if (sort[target] === "ascending") {
			return <IconSortAscending size={iconSize} />;
		}
		if (sort[target] === "descending") {
			return <IconSortDescending size={iconSize} />;
		}
		return <IconArrowsSort size={iconSize} />;
	}, [sort["quantity"]]);

	return (
		<CrystalTableContext.Provider
			value={{
				sort,
				name: {
					label: "name",
					icon: iconName,
					sort: toggleSortName,
				},
				quantity: {
					label: "quantity",
					icon: iconQuantity,
					sort: toggleSortQuantity,
				},
			}}
		>
			{children}
		</CrystalTableContext.Provider>
	);
};
CrystalTableProvider.displayName =
	"component/presentations/CrystalTable/CrystalTableProvider";

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

export type CrystalTableHeaderProps = {};

export const CrystalTableHeader: FC<CrystalTableHeaderProps> = (props) => {
	const { ...rest } = props;
	const { quantity, name } = useCrystalTable();

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
CrystalTableHeader.displayName =
	"component/presentations/CrystalTable/CrystalTableHeader";

const aggregateById = (nodes: ItemType[]): ItemType[] => {
	const idMap: { [id: string]: ItemType } = {};

	nodes.forEach((node) => {
		if (idMap[node.itemId]) {
			idMap[node.itemId].total += node.total;
		} else {
			idMap[node.itemId] = { ...node };
		}
	});

	return Object.values(idMap);
};

export type CrystalTableRowProps = {
	name: string;
	total: number;
};

export const CrystalTableRow: FC<CrystalTableRowProps> = (props) => {
	const { name, total } = props;

	const MemoNameColumn = useMemo(() => {
		return (
			<Input
				size="xs"
				leftSectionPointerEvents="all"
				leftSection={<ClipBoardCopyButton value={name} />}
				value={name}
				readOnly
				variant="unstyled"
			/>
		);
	}, [name]);

	return (
		<Table.Tr>
			<Table.Td>{MemoNameColumn}</Table.Td>
			<Table.Td>{total}</Table.Td>
			<Table.Td>source</Table.Td>
		</Table.Tr>
	);
};

const MemoizedCrystalTableRow = memo(CrystalTableRow);

export type CrystalTableBodyProps = {
	items: ChildItemType[];
};

export const CrystalTableBody: FC<CrystalTableBodyProps> = (props) => {
	const { items } = props;
	const { sort } = useCrystalTable();

	/**
	 * NOTE: itemの集計とソートはそれぞれ異なるタイミングで実行されるため、別々にmemo化する
	 */

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
				return a.total - b.total;
			}

			if (sort.quantity === "descending") {
				return b.total - a.total;
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
				<MemoizedCrystalTableRow
					key={item.itemId}
					name={item.itemName}
					total={item.total}
				/>
			))}
		</Table.Tbody>
	);
};
CrystalTableBody.displayName =
	"component/presentations/CrystalTable/CrystalTableBody";
