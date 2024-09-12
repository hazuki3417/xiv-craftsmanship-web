import { Table } from "@mantine/core";
import { FC, ReactNode } from "react";
import {
	InternalTableProvider,
	InternalTableBody,
	InternalTableHeader,
} from "./InternalTable.components";

export type InternalTableProps = {
	children?: ReactNode;
};

type CompoundedComponent = FC<InternalTableProps> & {
	Header: typeof InternalTableHeader;
	Body: typeof InternalTableBody;
};

export const InternalTable: CompoundedComponent = (props) => {
	const { children, ...rest } = props;

	return (
		<InternalTableProvider>
			<Table stickyHeader stickyHeaderOffset={0}>
				{children}
			</Table>
		</InternalTableProvider>
	);
};

InternalTable.displayName = "component/prestations/InternalTable";
InternalTable.Header = InternalTableHeader;
InternalTable.Body = InternalTableBody;
