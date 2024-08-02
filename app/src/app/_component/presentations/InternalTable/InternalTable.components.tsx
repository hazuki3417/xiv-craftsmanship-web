import { FC, ReactNode, useState } from "react"
import { ChildItemType, DiagramChildNodeProps } from "../index";
import { Table, UnstyledButton } from '@mantine/core';
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { InternalTableContext, useInternalTable, SortState } from "./InternalTable.context";

export interface InternalTableProviderProps {
  children: ReactNode;
}

const defaultSortState: SortState = {
  name: "none",
  quantity: "none"
}

export const InternalTableProvider: FC<InternalTableProviderProps> = (props) => {
  const { children, ...rest } = props;
  const [sort, setSort] = useState<SortState>(defaultSortState);

  const toggleSort = (target: keyof SortState) => {
    if (target === "name") {
      setSort((prevSort) => {
        return {
          quantity: "none",
          name: prevSort.name === "none" ? "ascending" : prevSort.name === "ascending" ? "descending" : "none"
        }
      })
      return
    }

    // quantityのとき
    setSort((prevSort) => {
      return {
        quantity: prevSort.quantity === "none" ? "ascending" : prevSort.quantity === "ascending" ? "descending" : "none",
        name: "none"
      }
    })
  }

  const sortIcon = (target: keyof SortState) => {
    const iconSize = 16
    if (sort[target] === "ascending") {
      return <IconSortAscending size={iconSize} />
    }
    if (sort[target] === "descending") {
      return <IconSortDescending size={iconSize} />
    }
    return <IconArrowsSort size={iconSize} />
  }

  return (
    <InternalTableContext.Provider value={{
      sort: sort,
      toggleSort: toggleSort,
      sortIcon: sortIcon,
    }}>
      {children}
    </InternalTableContext.Provider>
  );
};

export type InternalTableBodyProps = {
  items: ChildItemType[]
}

export const InternalTableBody: FC<InternalTableBodyProps> = (props) => {
  const { items, ...rest } = props
  const { sort } = useInternalTable()

  return (
    <Table.Tbody>
      {items.sort((a, b) => {
        if (sort.name === "ascending") {
          return a.name.localeCompare(b.name)
        }
        if (sort.name === "descending") {
          return b.name.localeCompare(a.name)
        }

        if (sort.quantity === "ascending") {
          return a.tcount - b.tcount
        }

        if (sort.quantity === "descending") {
          return b.tcount - a.tcount
        }
        return 0
      }).map((node) => {
        return (
          <Table.Tr key={node.id}>
            <Table.Td>{node.name}</Table.Td>
            <Table.Td>{node.tcount}</Table.Td>
          </Table.Tr>
        )
      })}
    </Table.Tbody>
  )
}

export type InternalTableHeaderProps = {

}


export const InternalTableHeader: FC<InternalTableHeaderProps> = (props) => {
  const { ...rest } = props
  const { toggleSort, sortIcon } = useInternalTable()

  return (
    <Table.Tbody>
      <Table.Tr>
        <Table.Th>
          <UnstyledButton onClick={() => toggleSort("name")}>
            name
            {sortIcon("name")}
          </UnstyledButton>
        </Table.Th>
        <Table.Th>
          <UnstyledButton onClick={() => toggleSort("quantity")}>
            quantity
            {sortIcon("quantity")}
          </UnstyledButton>
        </Table.Th>
      </Table.Tr>
    </Table.Tbody>
  )
}
