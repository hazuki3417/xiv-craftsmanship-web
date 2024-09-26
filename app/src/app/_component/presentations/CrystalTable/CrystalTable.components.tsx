import { FC, memo, ReactNode, useMemo, useState } from "react";
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

	const toggleSort = (target: keyof SortState) => {
		if (target === "name") {
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
			return;
		}

		// quantityのとき
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
	};

	const sortIcon = (target: keyof SortState) => {
		const iconSize = 16;
		if (sort[target] === "ascending") {
			return <IconSortAscending size={iconSize} />;
		}
		if (sort[target] === "descending") {
			return <IconSortDescending size={iconSize} />;
		}
		return <IconArrowsSort size={iconSize} />;
	};

	return (
		<CrystalTableContext.Provider
			value={{
				sort: sort,
				toggleSort: toggleSort,
				sortIcon: sortIcon,
			}}
		>
			{children}
		</CrystalTableContext.Provider>
	);
};
CrystalTableProvider.displayName =
	"component/presentations/CrystalTable/CrystalTableProvider";

export type CrystalTableHeaderProps = {};

export const CrystalTableHeader: FC<CrystalTableHeaderProps> = (props) => {
	const { ...rest } = props;
	const { toggleSort, sortIcon } = useCrystalTable();

	return (
		<Table.Thead>
			<Table.Tr>
				<Table.Th>
					<UnstyledButton onClick={() => toggleSort("name")}>
						<Group gap={"xs"}>
							name
							{sortIcon("name")}
						</Group>
					</UnstyledButton>
				</Table.Th>
				<Table.Th w={rem(120)}>
					<UnstyledButton onClick={() => toggleSort("quantity")}>
						<Group gap={"xs"}>
							quantity
							{sortIcon("quantity")}
						</Group>
					</UnstyledButton>
				</Table.Th>
				<Table.Th w={rem(100)}>
					<UnstyledButton>source</UnstyledButton>
				</Table.Th>
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

export const CrystalTableRow: FC<CrystalTableRowProps> = memo((props) => {
	const { name, total } = props;

	return (
		<Table.Tr>
			<Table.Td>
				<Input
					size="xs"
					leftSectionPointerEvents="all"
					leftSection={<ClipBoardCopyButton value={name} />}
					value={name}
					readOnly
					variant="unstyled"
				/>
			</Table.Td>
			<Table.Td>{total}</Table.Td>
			<Table.Td>source</Table.Td>
		</Table.Tr>
	);
});

export type CrystalTableBodyProps = {
	items: ChildItemType[];
};

export const CrystalTableBody: FC<CrystalTableBodyProps> = (props) => {
	const { items, ...rest } = props;
	const { sort } = useCrystalTable();

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

	const sortedItems = useMemo(() => {
		const aggregateItems = aggregateById(items);
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
	}, [items, sort]);

	return (
		<Table.Tbody>
			{sortedItems.map((item) => (
				<CrystalTableRow
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
