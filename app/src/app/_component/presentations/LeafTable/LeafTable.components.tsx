import { FC, ReactNode, useState } from "react";
import { ChildItemType, ClipBoardCopyButton, ItemType } from "../index";
import { Group, Input, rem, Table, UnstyledButton } from "@mantine/core";
import {
	IconArrowsSort,
	IconSortAscending,
	IconSortDescending,
} from "@tabler/icons-react";
import { LeafTableContext, useLeafTable, SortState } from "./LeafTable.context";

export interface LeafTableProviderProps {
	children: ReactNode;
}

const defaultSortState: SortState = {
	name: "none",
	quantity: "none",
};

export const LeafTableProvider: FC<LeafTableProviderProps> = (props) => {
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
		<LeafTableContext.Provider
			value={{
				sort: sort,
				toggleSort: toggleSort,
				sortIcon: sortIcon,
			}}
		>
			{children}
		</LeafTableContext.Provider>
	);
};
LeafTableProvider.displayName =
	"component/presentations/LeafTable/LeafTableProvider";

const aggregateById = (nodes: ItemType[]): ItemType[] => {
	const idMap: { [id: string]: ItemType } = {};

	nodes.forEach((node) => {
		if (idMap[node.id]) {
			idMap[node.id].total += node.total;
		} else {
			idMap[node.id] = { ...node };
		}
	});

	return Object.values(idMap);
};

export type LeafTableBodyProps = {
	items: ChildItemType[];
};

export const LeafTableBody: FC<LeafTableBodyProps> = (props) => {
	const { items, ...rest } = props;
	const { sort } = useLeafTable();

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

	const aggregateItems = aggregateById(items);

	return (
		<Table.Tbody>
			{aggregateItems
				.sort((a, b) => {
					if (sort.name === "ascending") {
						return a.name.localeCompare(b.name);
					}
					if (sort.name === "descending") {
						return b.name.localeCompare(a.name);
					}

					if (sort.quantity === "ascending") {
						return a.total - b.total;
					}

					if (sort.quantity === "descending") {
						return b.total - a.total;
					}
					return 0;
				})
				.map((item) => {
					return (
						<Table.Tr key={item.id}>
							<Table.Td>
								<Input
									size="xs"
									rightSectionPointerEvents="all"
									rightSection={<ClipBoardCopyButton value={item.name} />}
									value={item.name}
									readOnly
									variant="unstyled"
								/>
							</Table.Td>
							<Table.Td>{item.total}</Table.Td>
							<Table.Td>source</Table.Td>
						</Table.Tr>
					);
				})}
		</Table.Tbody>
	);
};
LeafTableBody.displayName = "component/presentations/LeafTable/LeafTableBody";

export type LeafTableHeaderProps = {};

export const LeafTableHeader: FC<LeafTableHeaderProps> = (props) => {
	const { ...rest } = props;
	const { toggleSort, sortIcon } = useLeafTable();

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
				<Table.Th w={rem(300)}>
					<UnstyledButton>source</UnstyledButton>
				</Table.Th>
			</Table.Tr>
		</Table.Thead>
	);
};
LeafTableHeader.displayName =
	"component/presentations/LeafTable/LeafTableHeader";
