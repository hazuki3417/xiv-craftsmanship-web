import { FC, ReactNode, useCallback, useState } from "react";
import { MaterialManagerContext } from "./MaterialManagerProvider.context";
import { ChildItemType } from "../Diagram";
import { CraftItem } from "../Recipe";

type RecipeData = {
	recipeId: string;
};

export type MaterialData = RecipeData & {
	materials: ChildItemType[];
};

export type CraftData = RecipeData & {
	craftItem: CraftItem | null;
};

export type QuantityData = RecipeData & {
	quantity: number;
};

export interface MaterialManagerProviderProps {
	children: ReactNode;
}

const aggregateItems = (materials: MaterialData[]): ChildItemType[] => {
	const duplacateItems = materials.flatMap((data) => data.materials);
	const itemMap: Record<string, ChildItemType> = {};

	duplacateItems.forEach((item) => {
		if (itemMap[item.itemId]) {
			itemMap[item.itemId].total += item.total;
		} else {
			itemMap[item.itemId] = { ...item };
		}
	});

	return Object.values(itemMap);
};

/**
 * 初期値を生成
 */
const limit = 3;
const initMaterialData: MaterialData[] = Array.from(
	{ length: limit },
	(_, index) => ({ recipeId: (index + 1).toString(), materials: [] }),
);
const initCraftData: CraftData[] = Array.from(
	{ length: limit },
	(_, index) => ({ recipeId: (index + 1).toString(), craftItem: null }),
);
const initQuantityData: QuantityData[] = Array.from(
	{ length: limit },
	(_, index) => ({ recipeId: (index + 1).toString(), quantity: 1 }),
);

export const MaterialManagerProvider: FC<MaterialManagerProviderProps> = (
	props,
) => {
	const { children, ...rest } = props;

	const [materials, setMaterials] = useState<MaterialData[]>(initMaterialData);
	const [craftItem, setCraftItem] = useState<CraftData[]>(initCraftData);
	const [quantity, setQuantity] = useState<QuantityData[]>(initQuantityData);

	/**
	 * NOTE: パフォーマンスの観点からfor文を使用
	 *       filter,mapなどは配列要素をすべて操作する。また新しい配列を生成するため、メモリ使用量が増える
	 *       やりたいことは1つの配列要素値のみ更新するため、更新対象のみを操作するように実装
	 */
	const dispatchMaterials = useCallback((data: MaterialData) => {
		setMaterials((recipes) => {
			const limit = recipes.length;
			for (let i = 0; i < limit; i++) {
				if (recipes[i].recipeId === data.recipeId) {
					recipes[i] = data;
					break;
				}
			}
			return [...recipes];
		});
	}, []);

	const dispatchCraftItem = useCallback((data: CraftData) => {
		setCraftItem((recipes) => {
			const limit = recipes.length;
			for (let i = 0; i < limit; i++) {
				if (recipes[i].recipeId === data.recipeId) {
					recipes[i] = data;
					break;
				}
			}
			return [...recipes];
		});
	}, []);

	const dispatchQuantity = useCallback((data: QuantityData) => {
		setQuantity((recipes) => {
			const limit = recipes.length;
			for (let i = 0; i < limit; i++) {
				if (recipes[i].recipeId === data.recipeId) {
					recipes[i] = data;
					break;
				}
			}
			return [...recipes];
		});
	}, []);

	const fetchCraftItem = useCallback((recipeId: string) => {
		const result = craftItem.find(
			(craftItem) => craftItem.recipeId === recipeId,
		);
		return result?.craftItem || null;
	}, []);

	const fetchQuantity = useCallback((recipeId: string) => {
		const result = quantity.find((data) => data.recipeId === recipeId);
		return result?.quantity || 1;
	}, []);

	return (
		<MaterialManagerContext.Provider
			value={{
				materials: aggregateItems(materials),
				dispatch: {
					materials: dispatchMaterials,
					craftItem: dispatchCraftItem,
					quantity: dispatchQuantity,
				},
				fetch: {
					craftItem: fetchCraftItem,
					quantity: fetchQuantity,
				},
			}}
		>
			{children}
		</MaterialManagerContext.Provider>
	);
};
MaterialManagerProvider.displayName =
	"component/presentations/MaterialManagerProvider";
