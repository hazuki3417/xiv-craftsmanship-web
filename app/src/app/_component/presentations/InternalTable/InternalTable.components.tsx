import { FC, ReactNode, useState } from "react";
import { ChildItemType, ClipBoardCopyButton, ItemType } from "../index";
import { Group, Input, rem, Table, UnstyledButton } from "@mantine/core";
import {
	IconArrowsSort,
	IconSortAscending,
	IconSortDescending,
} from "@tabler/icons-react";
import {
	InternalTableContext,
	useInternalTable,
	SortState,
} from "./InternalTable.context";

export interface InternalTableProviderProps {
	children: ReactNode;
}

const defaultSortState: SortState = {
	name: "none",
	quantity: "none",
	job: "none",
};

export const InternalTableProvider: FC<InternalTableProviderProps> = (
	props,
) => {
	const { children, ...rest } = props;
	const [sort, setSort] = useState<SortState>(defaultSortState);

	const toggleSort = (target: keyof SortState) => {
		if (target === "name") {
			setSort((prevSort) => {
				return {
					name:
						prevSort.name === "none"
							? "ascending"
							: prevSort.name === "ascending"
								? "descending"
								: "none",
					quantity: "none",
					job: "none",
				};
			});
			return;
		}

		if (target === "quantity") {
			setSort((prevSort) => {
				return {
					name: "none",
					quantity:
						prevSort.quantity === "none"
							? "ascending"
							: prevSort.quantity === "ascending"
								? "descending"
								: "none",
					job: "none",
				};
			});
			return;
		}

		setSort((prevSort) => {
			return {
				name: "none",
				quantity: "none",
				job:
					prevSort.job === "none"
						? "ascending"
						: prevSort.job === "ascending"
							? "descending"
							: "none",
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
		<InternalTableContext.Provider
			value={{
				sort: sort,
				toggleSort: toggleSort,
				sortIcon: sortIcon,
			}}
		>
			{children}
		</InternalTableContext.Provider>
	);
};
InternalTableProvider.displayName =
	"component/presentations/InternalTable/InternalTableProvider";

export type InternalTableHeaderProps = {};

export const InternalTableHeader: FC<InternalTableHeaderProps> = (props) => {
	const { ...rest } = props;
	const { toggleSort, sortIcon } = useInternalTable();

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
				<Table.Th w={rem(120)} align="center">
					<UnstyledButton onClick={() => toggleSort("quantity")}>
						<Group gap={"xs"}>
							quantity
							{sortIcon("quantity")}
						</Group>
					</UnstyledButton>
				</Table.Th>
				<Table.Th w={rem(100)}>
					<UnstyledButton onClick={() => toggleSort("job")}>
						<Group gap={"xs"}>
							crafter
							{sortIcon("job")}
						</Group>
					</UnstyledButton>
				</Table.Th>
			</Table.Tr>
		</Table.Thead>
	);
};
InternalTableHeader.displayName =
	"component/presentations/InternalTable/InternalTableHeader";

const aggregateById = (nodes: ItemType[]): ItemType[] => {
	const idMap: { [id: string]: ItemType } = {};

	nodes.forEach(node => {
		if (idMap[node.id]) {
			idMap[node.id].total += node.total;
		} else {
			idMap[node.id] = { ...node };
		}
	});

	return Object.values(idMap);
};

export type InternalTableBodyProps = {
	items: ChildItemType[];
};

export const InternalTableBody: FC<InternalTableBodyProps> = (props) => {
	const { items, ...rest } = props;
	const { sort } = useInternalTable();

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
							<Table.Td>木工師</Table.Td>
						</Table.Tr>
					);
				})}
		</Table.Tbody>
	);
};
InternalTableBody.displayName =
	"component/presentations/InternalTable/InternalTableBody";
