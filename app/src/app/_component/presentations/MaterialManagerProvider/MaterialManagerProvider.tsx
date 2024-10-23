import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import {
	MaterialManagerContext,
	RecipeData,
	RecipeDataId,
} from "./MaterialManagerProvider.context";
import { node } from "@/app/functions/node";
import { RecipeContextValue } from "../Recipe";

export type MaterialManagerProviderProps = {
	children: ReactNode;
};

export const MaterialManagerProvider: FC<MaterialManagerProviderProps> = (
	props,
) => {
	const { children } = props;

	const [recipes, setRecipes] = useState<RecipeData[]>([
		{
			id: "1",
			value: {
				spec: null,
				tree: null,
				nodes: [],
				edges: [],
				quantity: {
					count: 1,
				},
			},
		},
	]);

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
				throw new Error("");
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
				value: {},
				action: {
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
MaterialManagerProvider.displayName =
	"component/presentations/MaterialManagerProvider";
