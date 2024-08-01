import { Box, Grid, Table } from '@mantine/core';
import { FC, ReactNode } from "react";
import { InternalTableProvider, InternalTableBody, InternalTableHeader } from "./InternalTable.components";

export type InternalTableProps = {
  children?: ReactNode;
}

type CompoundedComponent = FC<InternalTableProps> & {
  Header: typeof InternalTableHeader;
  Body: typeof InternalTableBody;
}

export const InternalTable: CompoundedComponent = (props) => {
  const { children, ...rest } = props;

  return (
    <InternalTableProvider>
      <Box>
        <Grid>
          <Grid.Col span={12}>
            <Table>
              {children}
            </Table>
          </Grid.Col>
        </Grid>
      </Box>
    </InternalTableProvider>
  );
}

InternalTable.Header = InternalTableHeader;
InternalTable.Body = InternalTableBody;
