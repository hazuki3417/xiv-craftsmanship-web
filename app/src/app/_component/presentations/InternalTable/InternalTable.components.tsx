import { FC, ReactNode, useState } from "react"
import { DiagramChildNodeProps } from "../index";
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
  nodes: DiagramChildNodeProps[]
}

export const InternalTableBody: FC<InternalTableBodyProps> = (props) => {
  const { nodes, ...rest } = props
  const { sort } = useInternalTable()

  return (
    <Table.Tbody>
      {nodes.sort((a, b) => {
        if (sort.name === "ascending") {
          return a.data.name.localeCompare(b.data.name)
        }
        if (sort.name === "descending") {
          return b.data.name.localeCompare(a.data.name)
        }

        if (sort.quantity === "ascending") {
          return a.data.tcount - b.data.tcount
        }

        if (sort.quantity === "descending") {
          return b.data.tcount - a.data.tcount
        }
        return 0
      }).map((node) => {
        return (
          <Table.Tr key={node.data.id}>
            <Table.Td>{node.data.name}</Table.Td>
            <Table.Td>{node.data.tcount}</Table.Td>
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
