import { Table } from "@mantine/core";
import { FC, ReactNode } from "react";
import {
	LeafTableProvider,
	LeafTableBody,
	LeafTableHeader,
} from "./LeafTable.components";

export type LeafTableProps = {
	children?: ReactNode;
};

type CompoundedComponent = FC<LeafTableProps> & {
	Header: typeof LeafTableHeader;
	Body: typeof LeafTableBody;
};

export const LeafTable: CompoundedComponent = (props) => {
	const { children, ...rest } = props;

	return (
		<LeafTableProvider>
			<Table stickyHeader stickyHeaderOffset={0}>
				{children}
			</Table>
		</LeafTableProvider>
	);
};

LeafTable.displayName = "component/prestations/LeafTable";
LeafTable.Header = LeafTableHeader;
LeafTable.Body = LeafTableBody;
