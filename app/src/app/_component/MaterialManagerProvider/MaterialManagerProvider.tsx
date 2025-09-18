import { FC, ReactNode, useCallback, useState } from "react";
import {
	MaterialManagerContext,
	RecipeData,
	RecipeDataId,
} from "./MaterialManagerProvider.context";
import { node } from "@/functions/node";
import { defaultRecipeContext, RecipeContextValue } from "../Recipe";

export type MaterialManagerProviderProps = {
	children: ReactNode;
};

export const MaterialManagerProvider: FC<MaterialManagerProviderProps> = (
	props,
) => {
	const { children } = props;

	const [recipes, setRecipes] = useState<RecipeData[]>([]);

	const add = useCallback(
		(
			id: RecipeDataId,
			callback: (recipe: RecipeContextValue) => RecipeContextValue,
		) => {
			setRecipes((prev) => {
				if (prev.some((recipe) => recipe.id === id)) {
					// 存在するときの処理
					return prev;
				}
				// 存在しないときの処理
				return [...prev, { id, value: callback(defaultRecipeContext) }];
			});
		},
		[],
	);

	const remove = useCallback((id: RecipeDataId) => {
		setRecipes((prev) => {
			if (!prev.some((recipe) => recipe.id === id)) {
				// 存在しないときの処理
				return prev;
			}
			// 存在するときの処理
			return prev.filter((recipe) => recipe.id !== id);
		});
	}, []);

	/**
	 * NOTE: パフォーマンスの観点からfor文を使用
	 *       filter,mapなどは配列要素をすべて操作する。また新しい配列を生成するため、メモリ使用量が増える
	 *       やりたいことは1つの配列要素値のみ更新するため、更新対象のみを操作するように実装
	 */
	const dispatch = useCallback(
		(
			id: RecipeDataId,
			callback: (recipe: RecipeContextValue) => RecipeContextValue,
		) => {
			setRecipes((recipes) => {
				const limit = recipes.length;
				for (let i = 0; i < limit; i++) {
					if (recipes[i].id === id) {
						recipes[i] = {
							id: recipes[i].id,
							value: callback(recipes[i].value),
						};
						break;
					}
				}
				return [...recipes];
			});
		},
		[],
	);

	const fetch = useCallback(
		(id: RecipeDataId) => {
			const result = recipes.find((recipe) => recipe.id === id);
			if (result === undefined) {
				throw new Error("recipe not found: " + id);
			}
			return result.value;
		},
		[recipes],
	);

	const aggregate = useCallback(() => {
		/**
		 * NOTE: バックエンドで各レシピの素材情報を集約しておく。
		 *       recipes[].value.nodes[].dataの配列を抽出・マージする
		 */
		return recipes
			.map((recipe) => recipe.value.nodes)
			.reduce((acc, nodes) => acc.concat(nodes), [])
			.flatMap(node.extract.data);
	}, [recipes]);

	return (
		<MaterialManagerContext.Provider
			value={{
				value: {
					recipes,
				},
				action: {
					add,
					remove,
					fetch,
					dispatch,
					aggregate,
				},
			}}
		>
			{children}
		</MaterialManagerContext.Provider>
	);
};
MaterialManagerProvider.displayName = "component/MaterialManagerProvider";
