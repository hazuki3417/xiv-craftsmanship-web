import { FC, ReactNode, useState } from "react"
import { Box, Checkbox, Grid, Input, NumberInput } from "@mantine/core";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { ClipBoardCopyButton } from "../ClipBoardCopyButton";
import { DiagramContext, useDiagram } from "./Diagram.context";

export interface DiagramProviderProps {
  children: ReactNode;
  onChangeRootItemCount: (value: number | string) => void
}

export const Diagram1Provider: FC<DiagramProviderProps> = (props) => {
  const { children, onChangeRootItemCount, ...rest } = props;
  return (
    <DiagramContext.Provider value={{
      onChangeRootItemCount
    }}>
      {children}
    </DiagramContext.Provider >
  );
};

export type NodeType = "root" | "internal" | "leaf"

/**
 * TODO: ドメインに関する型定義なので実装箇所を変更する
 * 共通のプロパティ
 */
export type ItemType = {
  id: string
  type: NodeType
  name: string
}

/**
 * TODO: ドメインに関する型定義なので実装箇所を変更する
 */
export type RootItemType = ItemType & {
  count: number
};

export type DiagramRootNodeProps = Node<RootItemType>;

export const DiagramRootNode = memo((props: NodeProps<DiagramRootNodeProps>) => {
  const { id, name, count } = props.data;
  const { onChangeRootItemCount } = useDiagram();

  return (
    <>
      <Box maw={500} mx="auto" style={{ padding: 10, border: '1px solid #aaa', borderRadius: 5, position: 'relative' }}>
        <input type="hidden" name="id" value={id} />
        <Grid align="center">
          <Grid.Col span={1}>
            <Checkbox size="xs" />
          </Grid.Col>
          <Grid.Col span={11}>
            <Grid align="center">
              <Grid.Col span={12}>
                <Input size="xs" placeholder="name" rightSectionPointerEvents="all" rightSection={
                  <ClipBoardCopyButton value={name} />
                } value={name} readOnly />
              </Grid.Col>
            </Grid>
            <Grid align="center">
              <Grid.Col span={2}>
                count:
              </Grid.Col>
              <Grid.Col span={10}>
                <NumberInput size="xs" style={{ width: '7ch' }} defaultValue={count} onChange={onChangeRootItemCount} />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid >
      </Box >
      <Handle type="source" position={Position.Bottom} />
    </>
  )

})

export type DepthType = {
  x: number
  y: number
}

/**
 * TODO: ドメインに関する型定義なので実装箇所を変更する
 */
export type ChildItemType = ItemType & {
  ucount: number
  tcount: number
  depth: DepthType
};

export type DiagramChildNodeProps = Node<ChildItemType>;

export const DiagramChildNode = memo((props: NodeProps<DiagramChildNodeProps>) => {

  const { id, name, ucount, tcount } = props.data;

  return (
    <>
      <Box maw={500} mx="auto" style={{ padding: 10, border: '1px solid #aaa', borderRadius: 5, position: 'relative' }}>
        <input type="hidden" name="id" value={id} />
        <Grid align="center">
          <Grid.Col span={1}>
            <Checkbox size="xs" />
          </Grid.Col>
          <Grid.Col span={11}>
            <Grid align="center">
              <Grid.Col span={12}>
                <Input size="xs" placeholder="name" rightSectionPointerEvents="all" rightSection={
                  <ClipBoardCopyButton value={name} />
                } value={name} readOnly />
              </Grid.Col>
            </Grid>
            <Grid align="center">
              <Grid.Col span={2}>
                unit:
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput size="xs" style={{ width: '7ch' }} rightSection={
                  <ClipBoardCopyButton value={ucount.toString()} />
                } value={ucount} hideControls readOnly />
              </Grid.Col>
              <Grid.Col span={2}>
                total:
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput size="xs" style={{ width: '7ch' }} rightSection={
                  <ClipBoardCopyButton value={tcount.toString()} />
                } value={tcount} hideControls readOnly />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid >
      </Box >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
})

export type DiagramNodeProps = DiagramRootNodeProps | DiagramChildNodeProps;
