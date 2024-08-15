import { FC, ReactNode, useEffect, useState } from "react";
import {
	ChildItemType,
	ClipBoardCopyButton,
	DiagramChildNodeProps,
} from "../index";
import { Group, Input, Table, UnstyledButton } from "@mantine/core";
import {
	IconArrowsSort,
	IconSortAscending,
	IconSortDescending,
} from "@tabler/icons-react";
import { LeafTableContext, useLeafTable, SortState } from "./LeafTable.context";
import { useEdges } from "@xyflow/react";

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
					<Table.Td colSpan={3}>No data</Table.Td>
				</Table.Tr>
			</Table.Tbody>
		);
	}

	return (
		<Table.Tbody>
			{items
				.sort((a, b) => {
					if (sort.name === "ascending") {
						return a.name.localeCompare(b.name);
					}
					if (sort.name === "descending") {
						return b.name.localeCompare(a.name);
					}

					if (sort.quantity === "ascending") {
						return a.tcount - b.tcount;
					}

					if (sort.quantity === "descending") {
						return b.tcount - a.tcount;
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
							<Table.Td>{item.tcount}</Table.Td>
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
		<Table.Tbody>
			<Table.Tr>
				<Table.Th>
					<UnstyledButton onClick={() => toggleSort("name")}>
						<Group gap={"xs"}>
							name
							{sortIcon("name")}
						</Group>
					</UnstyledButton>
				</Table.Th>
				<Table.Th>
					<UnstyledButton onClick={() => toggleSort("quantity")}>
						<Group gap={"xs"}>
							quantity
							{sortIcon("quantity")}
						</Group>
					</UnstyledButton>
				</Table.Th>
				<Table.Th>
					<UnstyledButton>source</UnstyledButton>
				</Table.Th>
			</Table.Tr>
		</Table.Tbody>
	);
};
LeafTableHeader.displayName =
	"component/presentations/LeafTable/LeafTableHeader";
