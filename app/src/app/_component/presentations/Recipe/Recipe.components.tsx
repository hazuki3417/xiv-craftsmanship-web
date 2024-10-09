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
	SegmentedControl,
	ScrollArea,
	SegmentedControlItem,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { CrystalTable } from "../CrystalTable";
import { Craft, Recipe, getCraft, getRecipe } from "@/openapi";
import { nanoid } from "nanoid";
import { Node, Edge, useQuantity, useMaterialTree } from "@/app/hooks";
import { QuanitityChangeInput } from "./QuanitityChangeInput";
import { RecipeInfo } from "./RecipeInfo";
import { RecipeSearchBox } from "./RecipeSearchBox";
import { RecipeSearchDropdown } from "./RecipeSearchDropdown";

/**
 * レシピツリーを解析して、Diagram用のノードとエッジを構築する
 */
const parseRecipeTree = (
	recipe: Recipe,
	parentNodeId: string,
	parentCount: number,
	depth: { x: Depth; y: Depth },
): { nodes: Node[]; edges: Edge[] } => {
	const nodes: Node[] = [];
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
				itemType: material.type,
				itemId: material.itemId,
				itemName: material.itemName,
				pieces: 1,
				unit: material.quantity,
				quantity: total,
				source: "",
				depth: { x: depth.x.getDepth(), y: depth.y.getDepth() },
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

	const { quantity, countUp, countDown } = useQuantity({
		count: fetch.quantity(recipeId),
	});

	const { nodes, edges, setTree, setQuantity } = useMaterialTree({
		nodes: [],
		edges: [],
	});

	const onClear = useCallback(() => {
		setCraftItem(null);
		dispatch.craftItem({ recipeId, craftItem: null });
		dispatch.materials({ recipeId, materials: [] });
	}, []);

	useEffect(() => {
		if (!craftItem) {
			// 選択されていないとき
			setTree([], []);
			return;
		}

		console.log("select recipe", craftItem);
		const depth = {
			x: new Depth(),
			y: new Depth(),
		};

		const root: Node = {
			id: nanoid(),
			type: "childNode",
			data: {
				nodeType: "root",
				itemType: "material",
				itemId: craftItem.spec.itemId,
				itemName: craftItem.spec.name,
				pieces: craftItem.spec.pieces,
				unit: craftItem.spec.pieces,
				quantity: quantity * craftItem.spec.pieces,
				source: "",
				depth: { x: depth.x.getDepth(), y: depth.y.getDepth() },
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

		setTree([root, ...nodes], edges);
		dispatch.craftItem({ recipeId, craftItem });
		dispatch.materials({ recipeId, materials: nodes.map((node) => node.data) });
		dispatch.quantity({ recipeId, quantity: quantity });
	}, [craftItem]);

	useEffect(() => {
		setQuantity(quantity);
	}, [quantity]);

	return (
		<RecipeContext.Provider
			value={{
				root: {
					quantity: quantity,
					countUp: countUp,
					countDown: countDown,
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
		.filter((node): node is Node => {
			return node.data.itemType === "crystal";
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
		.filter((node): node is Node => {
			return node.data.nodeType === "leaf" && node.data.itemType === "material";
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
		.filter((node): node is Node => {
			return (
				node.data.nodeType === "internal" && node.data.itemType === "material"
			);
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

export const RecipeSearch: FC = () => {
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
			<RecipeSearchBox
				loading={lazyCraft.loading}
				value={search.value}
				onBlur={combobox.closeDropdown}
				onChange={onSerachChange}
				onClear={onClear}
			/>
			<RecipeSearchDropdown items={crafts} />
		</Combobox>
	);
};

const MemoizedRecipeInfo = memo(RecipeInfo);

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
