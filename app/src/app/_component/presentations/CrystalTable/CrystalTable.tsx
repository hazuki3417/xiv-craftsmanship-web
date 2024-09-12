import { Table } from "@mantine/core";
import { FC, ReactNode } from "react";
import {
	CrystalTableProvider,
	CrystalTableBody,
	CrystalTableHeader,
} from "./CrystalTable.components";

export type CrystalTableProps = {
	children?: ReactNode;
};

type CompoundedComponent = FC<CrystalTableProps> & {
	Header: typeof CrystalTableHeader;
	Body: typeof CrystalTableBody;
};

export const CrystalTable: CompoundedComponent = (props) => {
	const { children, ...rest } = props;

	return (
		<CrystalTableProvider>
			<Table stickyHeader stickyHeaderOffset={0}>
				{children}
			</Table>
		</CrystalTableProvider>
	);
};

CrystalTable.displayName = "component/prestations/CrystalTable";
CrystalTable.Header = CrystalTableHeader;
CrystalTable.Body = CrystalTableBody;
