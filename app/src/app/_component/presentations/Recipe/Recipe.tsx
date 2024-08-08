
"use client"
import { FC } from 'react';
import { Diagram, InternalTable, LeafTable } from '../index';
import { Grid, Box } from '@mantine/core';
import { RecipeProvider } from './index';

export interface RecipeProps {
  id: string;
}

export const Recipe: FC<RecipeProps> = (props) => {
  const { ...rest } = props;

  return (
    <RecipeProvider>
      <Box>
        <Grid>
          <Grid.Col span={12} style={{ height: '60vh' }}>
            <Diagram />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={4}>
            <InternalTable>
              <InternalTable.Header />
              <InternalTable.Body items={[]} />
            </InternalTable>
          </Grid.Col>
          <Grid.Col span={8}>
            <LeafTable>
              <LeafTable.Header />
              <LeafTable.Body items={[]} />
            </LeafTable>
          </Grid.Col>
        </Grid>
      </Box>
    </RecipeProvider>
  );
}
Recipe.displayName = "component/presentations/Recipe";
