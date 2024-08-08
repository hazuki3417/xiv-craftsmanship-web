"use client"
import { useState } from 'react';
import { InternalTable, ItemAggregation, LeafTable, Recipe, withInternalItemHOC, withLeafItemHOC } from './_component/presentations';
import {
  Container,
  Grid,
  SegmentedControl,
  SegmentedControlItem,
  Tabs
} from '@mantine/core';

const segments: SegmentedControlItem[] = [
  { value: "crafts", label: "a" },
  { value: "items", label: "b" },
]

const InternalTableBodyWithNodes = withInternalItemHOC(InternalTable.Body);
const LeafTableBodyWithNodes = withLeafItemHOC(LeafTable.Body);

export default function Home() {
  const [segment, setSegment] = useState<string>("crafts");

  return (
    <Container fluid style={{ height: '100vh' }}>
      {/** header */}
      <Grid>
        <Grid.Col span={12}>h</Grid.Col>
      </Grid>
      {/** controle panel */}
      <Grid>
        <Grid.Col span={12}>
          <SegmentedControl value={segment} onChange={setSegment} data={segments} />
        </Grid.Col>
      </Grid>
      <Grid>
        <ItemAggregation>
          {/** TODO: レンダリングに時間がかかっているので最適化する */}
          {/** TODO: items -> crafts 遷移すると前の値が消えてる */}
          {segment === "crafts" && (
            <Grid.Col span={12}>
              {/** tab panel */}
              <Tabs variant="outline" defaultValue={"1"}>
                <Tabs.List>
                  <Tabs.Tab value="1">1</Tabs.Tab>
                  <Tabs.Tab value="2">2</Tabs.Tab>
                  <Tabs.Tab value="3">3</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="1"><Recipe id="1" /></Tabs.Panel>
                <Tabs.Panel value="2"><Recipe id="2" /></Tabs.Panel>
                <Tabs.Panel value="3"><Recipe id="3" /></Tabs.Panel>
              </Tabs>
            </Grid.Col>
          )}
          {segment === "items" && (
            <>
              <Grid.Col span={4}>
                <InternalTable>
                  <InternalTable.Header />
                  <InternalTableBodyWithNodes />
                </InternalTable>
              </Grid.Col>
              <Grid.Col span={8}>
                <LeafTable>
                  <LeafTable.Header />
                  <LeafTableBodyWithNodes />
                </LeafTable>
              </Grid.Col>
            </>
          )}
        </ItemAggregation>
      </Grid >
    </Container >
  );
}
