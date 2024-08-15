import { ReactNode, FC, useState, useEffect, useCallback } from "react";
import { CraftItem, RecipeContext, useRecipe } from "./Recipe.context";
import { Depth } from "@/lib";
import {
	DiagramChildNodeProps,
	DiagramNodeProps,
	DiagramRootNodeProps,
} from "../Diagram";
import { Edge, useEdgesState, useNodesState } from "@xyflow/react";
import { LeafTable } from "../LeafTable";
import { InternalTable } from "../InternalTable";
import { useMaterialManager } from "../MaterialManagerProvider";
import {
	ActionIcon,
	Combobox,
	Input,
	Loader,
	useCombobox,
	rem,
	Group,
	NumberInput,
} from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import { GetCraftsDocument, GetMaterialsDocument } from "@/graphql";
import { useDebouncedValue } from "@mantine/hooks";
import { IconMinus, IconPlus, IconSearch, IconX } from "@tabler/icons-react";

type MaterialNode = {
	id: string;
	name: string;
	unit: number;
	total: number;
	children: MaterialNode[];
};

/**
 * 選択したアイテムのレシピツリーを構築する
 */
const buidRecipeTree = (craftItem: CraftItem) => {
	const { spec, materials } = craftItem;
	const map: { [key: string]: MaterialNode } = {};

	materials.forEach((material) => {
		const exists = {
			parent: map[material.parentId],
			child: map[material.childId],
		};
		if (!exists.parent) {
			map[material.parentId] = {
				id: material.parentId,
				name: material.parentName,
				unit: material.unit,
				total: material.total,
				children: [],
			};
		}
		if (!exists.child) {
			map[material.childId] = {
				id: material.childId,
				name: material.childName,
				unit: material.unit,
				total: material.total,
				children: [],
			};
		}
	});

	materials.forEach((material) => {
		const parent = map[material.parentId];
		const child = map[material.childId];
		parent.children.push(child);
	});

	const tree = map[spec.id];
	return tree;
};

type TreeNode = {
	nodes: MaterialNode[];
	id: string;
	count: number;
	depth: { x: Depth; y: Depth };
};

/**
 * レシピツリーを解析して、Diagram用のノードとエッジを構築する
 */
const parseRecipeTree = (
	current: TreeNode,
): { nodes: DiagramChildNodeProps[]; edges: Edge[] } => {
	const nodes: DiagramChildNodeProps[] = [];
	const edges: Edge[] = [];

	const childBasePoint = { x: 260, y: 180 };
	const childNodeSpace = { x: 380, y: 140 };

	current.nodes.forEach((node) => {
		const exists = node.children.length > 0;
		const total = current.count * node.total;

		nodes.push({
			id: node.id,
			type: "childNode",
			data: {
				id: node.id,
				type: exists ? "internal" : "leaf",
				name: node.name,
				ucount: node.unit,
				tcount: total,
				depth: { x: current.depth.x.getDepth(), y: current.depth.y.getDepth() },
			},
			position: {
				x: childBasePoint.x + current.depth.x.getDepth() * childNodeSpace.x,
				y: childBasePoint.y + current.depth.y.getDepth() * childNodeSpace.y,
			},
		});
		edges.push({
			id: `${current.id}-${node.id}`,
			source: current.id,
			target: node.id,
			type: "smoothstep",
		});

		if (exists) {
			current.depth.x.increase();
			const { nodes: childNodes, edges: childEdges } = parseRecipeTree({
				nodes: node.children,
				id: node.id,
				count: total,
				depth: { x: current.depth.x, y: current.depth.y },
			});
			current.depth.x.decrease();
			nodes.push(...childNodes);
			edges.push(...childEdges);
		} else {
			current.depth.y.increase();
		}
	});

	return { nodes, edges };
};

export interface RecipeProviderProps {
	recipeId: string;
	children: ReactNode;
}

export const RecipeProvider: FC<RecipeProviderProps> = (props) => {
	const { recipeId, children, ...rest } = props;

	const { fetch, dispatch } = useMaterialManager();

	// craftするアイテムの情報を管理
	const [craftItem, setCraftItem] = useState<CraftItem | null>(
		fetch.craftItem(recipeId),
	);

	//  rootのアイテム数を管理
	const [rootCount, setRootCount] = useState(fetch.quantity(recipeId));

	// diagramのノードとエッジを管理
	const [nodes, setNodes] = useNodesState<DiagramNodeProps>([]);
	const [edges, setEdges] = useEdgesState<Edge>([]);

	const onChangeRootCount = useCallback((value: string | number) => {
		setRootCount(Number(value));
	}, []);

	const onClear = useCallback(() => {
		setCraftItem(null);
		dispatch.craftItem({ recipeId, craftItem: null });
		dispatch.materials({ recipeId, materials: [] });
	}, []);

	const rootCountUp = useCallback(() => {
		setRootCount((value) => {
			return Math.min(99, value + 1);
		});
	}, []);

	const rootCountDown = useCallback(() => {
		setRootCount((value) => {
			return Math.max(1, value - 1);
		});
	}, []);

	useEffect(() => {
		const rootId = "root";
		const rootNode: DiagramRootNodeProps = {
			id: rootId,
			type: "rootNode",
			data: {
				id: rootId,
				type: "root",
				name: "root",
				count: rootCount,
			},
			position: { x: 0, y: 0 },
		};

		if (!craftItem) {
			// 選択されていないとき
			setNodes([rootNode]);
			return;
		}

		// 選択されたとき
		const tree = buidRecipeTree(craftItem);
		const { nodes, edges } = parseRecipeTree({
			nodes: tree.children,
			id: rootId,
			count: rootCount,
			depth: { x: new Depth(), y: new Depth() },
		});

		setNodes([rootNode, ...nodes]);
		setEdges(edges);
		dispatch.craftItem({ recipeId, craftItem });
		dispatch.materials({ recipeId, materials: nodes.map((node) => node.data) });
		dispatch.quantity({ recipeId, quantity: rootCount });
	}, [craftItem, rootCount]);

	return (
		<RecipeContext.Provider
			value={{
				root: {
					quantity: rootCount,
					countUp: rootCountUp,
					countDown: rootCountDown,
					onChange: onChangeRootCount,
					onClear: onClear,
				},
				dispatch: { craftitem: setCraftItem },
				fetch: { craftItem: () => craftItem },
				nodes,
				edges,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};
RecipeProvider.displayName = "component/presentations/Recipe/RecipeProvider";

export const RecipeLeafTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes
		.filter((node): node is DiagramChildNodeProps => node.data.type === "leaf")
		.flatMap((node) => node.data);

	return (
		<LeafTable>
			<LeafTable.Header />
			<LeafTable.Body items={items} />
		</LeafTable>
	);
};

export const RecipeInternalTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes
		.filter(
			(node): node is DiagramChildNodeProps => node.data.type === "internal",
		)
		.flatMap((node) => node.data);

	return (
		<InternalTable>
			<InternalTable.Header />
			<InternalTable.Body items={items} />
		</InternalTable>
	);
};

type SearchState = {
	value: string;
	keyTypeChange: boolean;
};

export const SearchCombobox: FC = () => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const { root, fetch, dispatch } = useRecipe();

	const name = fetch.craftItem()?.spec.name || "";

	const [search, setSearch] = useState<SearchState>({
		value: name,
		keyTypeChange: false,
	});

	const [lazyCraftQuery, { loading, data }] = useLazyQuery(GetCraftsDocument);
	const [lazyMaterialQuery] = useLazyQuery(GetMaterialsDocument);
	const [debouncedSearch] = useDebouncedValue(search, 500);

	const onOptionSubmit = (value: string) => {
		const craft = data?.crafts.find((craft) => craft.id === value);
		if (!craft) {
			return;
		}

		setSearch({ value: craft.name, keyTypeChange: false });
		combobox.closeDropdown();

		lazyMaterialQuery({ variables: { craftId: craft.id } })
			.then((result) => {
				if (!result.data) {
					return;
				}

				dispatch.craftitem({
					spec: craft,
					materials: result.data.materials,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const onSerachChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearch({ value: event.target.value, keyTypeChange: true });
		},
		[],
	);

	const onClear = useCallback(() => {
		setSearch({ value: "", keyTypeChange: false });
		root.onClear();
	}, []);

	useEffect(() => {
		// NOTE: debounceにより最後の入力から一定時間後に発火する

		if (debouncedSearch.keyTypeChange === false) {
			// NOTE: Option選択による変更の場合は検索を行わない
			return;
		}

		// NOTE: キー入力があるときは検索を行う
		if (debouncedSearch.value) {
			combobox.openDropdown();
			lazyCraftQuery({ variables: { name: debouncedSearch.value } });
		}
	}, [debouncedSearch]);

	useEffect(() => {
		if (search.value === "") {
			// NOTE: 空文字ならすぐに閉じる
			combobox.closeDropdown();
		}
	}, [search]);

	return (
		<Combobox size="xs" store={combobox} onOptionSubmit={onOptionSubmit}>
			<Combobox.Target>
				<Input
					size="xs"
					placeholder="search"
					value={search.value}
					leftSection={loading ? <Loader size={20} /> : <IconSearch />}
					rightSection={
						<ActionIcon variant="subtle" onClick={onClear}>
							<IconX style={{ width: rem(16) }} />
						</ActionIcon>
					}
					rightSectionPointerEvents="all"
					onChange={onSerachChange}
					onBlur={() => combobox.closeDropdown()}
				/>
			</Combobox.Target>
			<Combobox.Dropdown>
				<Combobox.Options>
					{data &&
						data.crafts.map((craft) => (
							<Combobox.Option key={craft.id} value={craft.id}>
								{craft.name}
							</Combobox.Option>
						))}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

export const QuantityInput: FC = () => {
	const { root } = useRecipe();

	return (
		<Group gap={0}>
			<NumberInput
				size="xs"
				style={{ width: "4ch" }}
				value={root.quantity}
				hideControls
				min={1}
				max={99}
				onChange={root.onChange}
			/>
			<ActionIcon variant="subtle" style={{ marginLeft: 5 }}>
				<IconMinus
					style={{ width: rem(16) }}
					onClick={() => {
						root.countDown();
					}}
				/>
			</ActionIcon>
			<ActionIcon variant="subtle" style={{ marginLeft: 5 }}>
				<IconPlus
					style={{ width: rem(16) }}
					onClick={() => {
						root.countUp();
					}}
				/>
			</ActionIcon>
		</Group>
	);
};
