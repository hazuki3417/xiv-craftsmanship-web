import { ReactNode, FC, useState, useEffect, useCallback, memo } from "react";
import { CraftItem, RecipeContext, useRecipe } from "./Recipe.context";
import { Depth } from "@/lib";
import { useMaterialManager } from "../MaterialManagerProvider";
import {
	Combobox,
	useCombobox,
	Group,
	SegmentedControl,
	ScrollArea,
	SegmentedControlItem,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Craft, getCraft, getRecipe } from "@/openapi";
import { nanoid } from "nanoid";
import { Node, useQuantity, useMaterialTree } from "@/app/hooks";
import { QuanitityChangeInput } from "./QuanitityChangeInput";
import { RecipeInfo } from "./RecipeInfo";
import { RecipeSearchBox } from "./RecipeSearchBox";
import { RecipeSearchDropdown } from "./RecipeSearchDropdown";
import { parseRecipeTree } from "./parseRecipeTree";
import { MaterialMiniTable } from "@/component/presentations/MaterialMiniTable";
import { node } from "@/app/functions/node";

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
		const { nodes, edges } = parseRecipeTree(craftItem.tree, root, depth);

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
	const items = nodes.filter(node.filter.crystal).flatMap(node.extract.data);

	return (
		<MaterialMiniTable
			items={items}
			sort={{ name: "none", quantity: "descending" }}
		/>
	);
};

export const RecipeLeafTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes.filter(node.filter.leaf).flatMap(node.extract.data);

	return (
		<MaterialMiniTable
			items={items}
			sort={{ name: "none", quantity: "descending" }}
		/>
	);
};

export const RecipeInternalTable: FC = () => {
	const { nodes } = useRecipe();
	const items = nodes.filter(node.filter.internal).flatMap(node.extract.data);

	return (
		<MaterialMiniTable
			items={items}
			sort={{ name: "none", quantity: "descending" }}
		/>
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

export type MaterialMiniTableSwitcherProps = {};

export const MaterialMiniTableSwitcher: FC<MaterialMiniTableSwitcherProps> = (
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
