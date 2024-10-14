import { ReactNode, FC, useState, useEffect, useCallback, memo } from "react";
import { RecipeContext, RecipeContextValue, useRecipe } from "./Recipe.context";
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
import { Craft, getCraft, getRecipe, Recipe } from "@/openapi";
import { nanoid } from "nanoid";
import { Node, useQuantity, useMaterialTree } from "@/app/hooks";
import { RecipeSearchBox } from "./RecipeSearchBox";
import { RecipeSearchDropdown } from "./RecipeSearchDropdown";
import { parseRecipeTree } from "./parseRecipeTree";
import { MaterialMiniTable } from "@/component/presentations/MaterialMiniTable";
import { node } from "@/app/functions/node";

export interface RecipeProviderProps extends Pick<RecipeContextValue, "value"> {
	id: string;
	children: ReactNode;
}

export const RecipeProvider: FC<RecipeProviderProps> = (props) => {
	const { id, children, value, ...rest } = props;

	const [craft, setCraft] = useState(value.spec);
	const [recipe, setRecipe] = useState(value.tree);

	const { quantity, countUp, countDown } = useQuantity({
		count: value.quantity.count,
	});

	const { nodes, edges, setTree, setQuantity } = useMaterialTree({
		nodes: value.nodes,
		edges: value.edges,
	});

	useEffect(() => {
		if (!craft) {
			// 選択されていないとき
			setTree([], []);
			return;
		}

		if (!recipe) {
			// 選択されていないとき
			setTree([], []);
			return;
		}

		console.log("select recipe", craft);
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
				itemId: craft.itemId,
				itemName: craft.name,
				pieces: craft.pieces,
				unit: craft.pieces,
				quantity: quantity * craft.pieces,
				source: "",
				depth: { x: depth.x.getDepth(), y: depth.y.getDepth() },
			},
			position: {
				x: 0,
				y: 0,
			},
		};

		// 選択されたとき
		const { nodes, edges } = parseRecipeTree(recipe, root, depth);

		setTree([root, ...nodes], edges);
		// dispatch.craftItem({ recipeId, craftItem });
		// dispatch.materials({ recipeId, materials: nodes.map((node) => node.data) });
		// dispatch.quantity({ recipeId, quantity: quantity });
	}, [craft]);

	useEffect(() => {
		setQuantity(quantity);
	}, [quantity]);

	return (
		<RecipeContext.Provider
			value={{
				value: {
					spec: craft,
					quantity: {
						count: quantity,
					},
					tree: recipe,
					nodes,
					edges,
				},
				action: {
					spec: {
						set: useCallback((craft: Craft) => {
							console.debug("spec.set", craft);
							setCraft(craft);
						}, []),
						clear: useCallback(() => {
							setCraft(null);
						}, []),
					},
					tree: {
						set: useCallback((recipe: Recipe) => {
							console.debug("spec.tree", recipe);
							setRecipe(recipe);
						}, []),
						clear: useCallback(() => {
							setRecipe(null);
						}, []),
					},
					quantity: {
						countUp: countUp,
						countDown: countDown,
					},
				},
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};
RecipeProvider.displayName = "@/component/presentations/Recipe/RecipeProvider";

export const RecipeCrystalTable: FC = () => {
	const { value } = useRecipe();
	const items = value.nodes
		.filter(node.filter.crystal)
		.flatMap(node.extract.data);

	return (
		<MaterialMiniTable
			items={items}
			sort={{ name: "none", quantity: "descending" }}
		/>
	);
};

export const RecipeLeafTable: FC = () => {
	const { value } = useRecipe();
	const items = value.nodes.filter(node.filter.leaf).flatMap(node.extract.data);

	return (
		<MaterialMiniTable
			items={items}
			sort={{ name: "none", quantity: "descending" }}
		/>
	);
};

export const RecipeInternalTable: FC = () => {
	const { value } = useRecipe();
	const items = value.nodes
		.filter(node.filter.internal)
		.flatMap(node.extract.data);

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

	const { value, action } = useRecipe();

	const name = value.spec?.name || "";

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

	const onOptionSubmit = async (value: string) => {
		const craft = lazyCraft.data?.find((craft) => craft.recipeId === value);
		if (!craft) {
			return;
		}

		setSearch({ value: craft.name, keyTypeChange: false });
		combobox.closeDropdown();

		await getRecipe(craft.recipeId)
			.then((res) => {
				if (!res.data) {
					console.error("response data not found");
					return;
				}
				action.spec.set(craft);
				action.tree.set(res.data);
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
		action.spec.clear();
		action.tree.clear();
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
