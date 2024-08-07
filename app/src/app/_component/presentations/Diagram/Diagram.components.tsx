import { FC, ReactNode, useEffect, useState } from "react"
import { ActionIcon, Autocomplete, Box, Button, Checkbox, Combobox, ComboboxStringData, Grid, Input, Loader, NumberInput, Select, useCombobox } from "@mantine/core";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { ClipBoardCopyButton } from "../ClipBoardCopyButton";
import { DiagramContext, useDiagram } from "./Diagram.context";
import { IconCheck, IconSearch } from "@tabler/icons-react";
import { useDebouncedCallback, useDebouncedValue } from "@mantine/hooks";
import { rem } from "@mantine/core";

export interface DiagramProviderProps {
  children: ReactNode;
  onChangeRootItemCount: (value: number | string) => void
}

export const DiagramProvider: FC<DiagramProviderProps> = (props) => {
  const { children, onChangeRootItemCount, ...rest } = props;
  return (
    <DiagramContext.Provider value={{
      onChangeRootItemCount
    }}>
      {children}
    </DiagramContext.Provider >
  );
};
DiagramProvider.displayName = "component/presentations/Diagram/DiagramProvider";

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


type SearchState = {
  value: string,
  keyTypeChange: boolean
}

type OptionState = {
  value: string
  label: string
}

const SearchCombobox: FC = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })
  const [search, setSearch] = useState<SearchState>({ value: '', keyTypeChange: false });
  const [options, setOptions] = useState<OptionState[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const onOptionSubmit = (option: string) => {
    setSearch({ value: option, keyTypeChange: false });
    console.debug('api request: fetch item recipe');
    combobox.closeDropdown();
  }

  const onSerachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ value: event.target.value, keyTypeChange: true });
  }


  useEffect(() => {
    if (debouncedSearch.keyTypeChange === false) {
      // NOTE: oOption選択による変更の場合は検索を行わない
      return;
    }

    // NOTE: キー入力があるときは検索を行う

    if (debouncedSearch.value) {
      combobox.openDropdown();
      setLoading(true);
      console.debug('api request: fetch item list');
      setOptions([
        { value: "apple", label: 'apple' },
        { value: "apple2", label: 'apple2' },
        { value: "grape", label: 'grape' },
        { value: "pineapple", label: 'pineapple' },
      ])
      // setLoading(false);
    }
  }, [debouncedSearch])

  useEffect(() => {
    if (search.value === '') {
      // NOTE: 空文字ならすぐに閉じる
      combobox.closeDropdown();
    }
  }, [search])

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={onOptionSubmit}
    >
      <Combobox.Target>
        <Input
          placeholder="search"
          value={search.value}
          leftSection={loading ? <Loader size={20} /> : <IconSearch />}
          rightSection={
            <ActionIcon variant="subtle" >
              <IconCheck style={{ width: rem(16) }} />
            </ActionIcon>
          }
          rightSectionPointerEvents="all"
          onChange={onSerachChange}
          onBlur={() => combobox.closeDropdown()}

        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {options.map((option) => <Combobox.Option value={option.value}>{option.label}</Combobox.Option>)}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}


export const DiagramRootNode = memo((props: NodeProps<DiagramRootNodeProps>) => {
  const { id, name, count } = props.data;
  const { onChangeRootItemCount } = useDiagram();

  return (
    <>
      <Box miw={450} style={{ padding: 10, border: '1px solid #aaa', borderRadius: 5, position: 'relative' }}>
        <input type="hidden" name="id" value={id} />
        <Grid align="center">
          <Grid.Col span={1}>
            <Checkbox size="xs" />
          </Grid.Col>
          <Grid.Col span={11}>
            <Grid align="center">
              <Grid.Col span={12}>
                <SearchCombobox />
              </Grid.Col>
            </Grid>
            <Grid align="center">
              <Grid.Col span={3}>
                count:
              </Grid.Col>
              <Grid.Col span={9}>
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
DiagramRootNode.displayName = "component/presentations/Diagram/DiagramRootNode";

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
DiagramChildNode.displayName = "component/presentations/Diagram/DiagramChildNode";

export type DiagramNodeProps = DiagramRootNodeProps | DiagramChildNodeProps;
