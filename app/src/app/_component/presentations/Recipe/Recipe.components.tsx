import {
	ReactNode,
	FC,
	useState,
	useEffect,
	useCallback,
	useMemo,
	memo,
} from "react";
import { CraftItem, RecipeContext, useRecipe } from "./Recipe.context";
import { Depth } from "@/lib";
import { DiagramChildNodeProps, DiagramNodeProps } from "../Diagram";
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
	Text,
	Grid,
	SegmentedControl,
	ScrollArea,
	SegmentedControlItem,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconMinus, IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { CrystalTable } from "../CrystalTable";
import { Craft, Recipe, getCraft, getRecipe } from "@/openapi";
import { nanoid } from "nanoid";

/**
 * レシピツリーを解析して、Diagram用のノードとエッジを構築する
 */
const parseRecipeTree = (
	recipe: Recipe,
	parentNodeId: string,
	parentCount: number,
	depth: { x: Depth; y: Depth },
): { nodes: DiagramChildNodeProps[]; edges: Edge[] } => {
	const nodes: DiagramChildNodeProps[] = [];
	const edges: Edge[] = [];

	const childBasePoint = { x: 0, y: 0 };
	const childNodeSpace = { x: 380, y: 140 };

	depth.x.increase();

	const materials = recipe.materials;
	materials.forEach((material, i) => {
		if (i > 0) {
			// 1つ目の素材だけ親素材と同じ位置に配置する
			// 2つ目以降の素材は親素材から1つ下の位置から配置する
			depth.y.increase();
		}

		const existsRecipe = material.recipes.length > 0;

		const total =
			parentCount < recipe.pieces
				? material.quantity
				: parentCount * material.quantity;

		const childNodeId = nanoid();
		material.recipes;
		nodes.push({
			id: childNodeId,
			type: "childNode",
			data: {
				nodeType: existsRecipe ? "internal" : "leaf",
				itemId: material.itemId,
				itemName: material.itemName,
				unit: material.quantity,
				total: total,
				source: "",
				type: material.type,
			},
			position: {
				x: childBasePoint.x + depth.x.getDepth() * childNodeSpace.x,
				y: childBasePoint.y + depth.y.getDepth() * childNodeSpace.y,
			},
		});

		edges.push({
			id: `${parentNodeId}-${childNodeId}`,
			source: parentNodeId,
			target: childNodeId,
			type: "smoothstep",
		});

		if (material.recipes.length > 0) {
			// レシピが存在するとき
			const recipe = material.recipes[0];
			const { nodes: childNodes, edges: childEdges } = parseRecipeTree(
				recipe,
				childNodeId,
				total,
				{ x: depth.x, y: depth.y },
			);
			nodes.push(...childNodes);
			edges.push(...childEdges);
		}
	});
	depth.x.decrease();

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
		if (!craftItem) {
			// 選択されていないとき
			setNodes([]);
			return;
		}

		const depth = {
			x: new Depth(),
			y: new Depth(),
		};

		const root: DiagramChildNodeProps = {
			id: nanoid(),
			type: "childNode",
			data: {
				nodeType: "internal",
				itemId: craftItem.spec.itemId,
				itemName: craftItem.spec.name,
				unit: rootCount,
				total: rootCount * craftItem.spec.pieces,
				source: "",
				type: "material",
			},
			position: {
				x: 0,
				y: 0,
			},
		};

		// 選択されたとき
		const { nodes, edges } = parseRecipeTree(
			craftItem.tree,
			root.id,
			root.data.unit,
			depth,
		);

		setNodes([root, ...nodes]);
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

export const RecipeCrystalTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes
		.filter((node): node is DiagramChildNodeProps => {
			return node.data.type === "crystal";
		})
		.flatMap((node) => node.data);

	return (
		<CrystalTable>
			<CrystalTable.Header />
			<CrystalTable.Body items={items} />
		</CrystalTable>
	);
};

export const RecipeLeafTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes
		.filter((node): node is DiagramChildNodeProps => {
			return node.data.nodeType === "leaf" && node.data.type === "material";
		})
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
		.filter((node): node is DiagramChildNodeProps => {
			return node.data.nodeType === "internal" && node.data.type === "material";
		})
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

	const [lazyCraft, setLazyCraft] = useState<{
		loading: boolean;
		data?: Craft[];
	}>({
		loading: false,
	});

	const [debouncedSearch] = useDebouncedValue(search, 500);

	const onOptionSubmit = (value: string) => {
		const craft = lazyCraft.data?.find((craft) => craft.recipeId === value);
		if (!craft) {
			return;
		}

		setSearch({ value: craft.name, keyTypeChange: false });
		combobox.closeDropdown();

		getRecipe(craft.recipeId)
			.then((res) => {
				if (!res.data) {
					return;
				}

				dispatch.craftitem({
					spec: craft,
					tree: res.data,
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
			setLazyCraft({ loading: true });
			combobox.openDropdown();
			getCraft({ name: debouncedSearch.value })
				.then((res) => {
					setLazyCraft({ loading: false, data: res.data });
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [debouncedSearch]);

	useEffect(() => {
		if (search.value === "") {
			// NOTE: 空文字ならすぐに閉じる
			combobox.closeDropdown();
		}
	}, [search]);

	const crafts = lazyCraft.data === undefined ? [] : lazyCraft.data;

	return (
		<Combobox size="xs" store={combobox} onOptionSubmit={onOptionSubmit}>
			<Combobox.Target>
				<Input
					size="xs"
					placeholder="search"
					value={search.value}
					leftSection={
						lazyCraft.loading ? <Loader size={20} /> : <IconSearch />
					}
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
					{crafts.length > 0 ? (
						crafts.map((craft) => (
							<Combobox.Option key={craft.recipeId} value={craft.recipeId}>
								<Grid>
									<Grid.Col span={"auto"}>
										<Text size="sm">{craft.name}</Text>
									</Grid.Col>
									<Grid.Col span={2}>
										<Text size="xs" opacity={0.6}>
											{craft.job}
										</Text>
									</Grid.Col>
									<Grid.Col span={2}>
										<Text size="xs" opacity={0.6}>
											lv:{craft.craftLevel}
										</Text>
									</Grid.Col>
								</Grid>
							</Combobox.Option>
						))
					) : (
						<Combobox.Empty>Nothing found</Combobox.Empty>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

type RecipeInfoProps = {
	pieces: string;
	craftLevel: string;
	itemLevel: string;
	job: string;
};

const RecipeInfo: FC<RecipeInfoProps> = (props) => {
	const { pieces, craftLevel, itemLevel, job } = props;
	return (
		<>
			<Group gap="xs">
				pieces:
				<NumberInput
					size="xs"
					value={pieces}
					style={{ width: "3ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
			<Group gap="xs">
				craft lv:
				<Input
					size="xs"
					value={craftLevel}
					style={{ width: "3ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
			<Group gap="xs">
				item lv:
				<Input
					size="xs"
					value={itemLevel}
					style={{ width: "3ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
			<Group gap="xs">
				job:
				<Input
					size="xs"
					value={job}
					style={{ width: "5ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
		</>
	);
};

const MemoizedRecipeInfo = memo(RecipeInfo);

type QuanitityChangeInputProps = {
	quantity: number;
	onCountUp: () => void;
	onCountDown: () => void;
};

const QuanitityChangeInput: FC<QuanitityChangeInputProps> = (props) => {
	const { quantity, onCountUp, onCountDown } = props;

	const CountUpIcon = useMemo(() => {
		return (
			<ActionIcon variant="subtle" style={{ marginLeft: 5 }}>
				<IconPlus style={{ width: rem(16) }} onClick={onCountUp} />
			</ActionIcon>
		);
	}, []);
	const CountDownIcon = useMemo(() => {
		return (
			<ActionIcon variant="subtle" style={{ marginLeft: 5 }}>
				<IconMinus style={{ width: rem(16) }} onClick={onCountDown} />
			</ActionIcon>
		);
	}, []);

	return (
		<Group gap="xs">
			quantity:
			<Group gap={0}>
				<NumberInput
					size="xs"
					style={{ width: "4ch" }}
					value={quantity}
					hideControls
					min={1}
					max={99}
				/>
				{CountUpIcon}
				{CountDownIcon}
			</Group>
		</Group>
	);
};

export type RecipeInfoPanelProps = {};

export const RecipeInfoPanel: FC<RecipeInfoPanelProps> = (props) => {
	const { root, fetch } = useRecipe();
	const craftItem = fetch.craftItem();

	const recipe = craftItem
		? {
				pieces: craftItem.spec.pieces.toString(),
				craftLevel: craftItem.spec.craftLevel?.toString() || "-",
				itemLevel: craftItem.spec.itemLevel.toString(),
				job: craftItem.spec.job,
			}
		: {
				pieces: "-",
				craftLevel: "-",
				itemLevel: "-",
				job: "-",
			};

	return (
		<Group>
			<QuanitityChangeInput
				quantity={root.quantity}
				onCountUp={root.countUp}
				onCountDown={root.countDown}
			/>
			<MemoizedRecipeInfo {...recipe} />
		</Group>
	);
};

const segments: SegmentedControlItem[] = [
	{ value: "crystal", label: "クリスタル" },
	{ value: "internal", label: "中間素材" },
	{ value: "leaf", label: "素材" },
];

export type MaterialTableSwitcherProps = {};

export const MaterialTableSwitcher: FC<MaterialTableSwitcherProps> = (
	props,
) => {
	const [segment, setSegment] = useState<string>("leaf");
	return (
		<>
			<SegmentedControl value={segment} onChange={setSegment} data={segments} />
			<ScrollArea h={740}>
				{segment === "crystal" && <RecipeCrystalTable />}
				{segment === "internal" && <RecipeInternalTable />}
				{segment === "leaf" && <RecipeLeafTable />}
			</ScrollArea>
		</>
	);
};
