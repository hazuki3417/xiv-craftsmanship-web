import { Box, Grid, Table } from "@mantine/core";
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
			<Box>
				<Grid>
					<Grid.Col span={12}>
						<Table>{children}</Table>
					</Grid.Col>
				</Grid>
			</Box>
		</CrystalTableProvider>
	);
};

CrystalTable.displayName = "component/prestations/CrystalTable";
CrystalTable.Header = CrystalTableHeader;
CrystalTable.Body = CrystalTableBody;
