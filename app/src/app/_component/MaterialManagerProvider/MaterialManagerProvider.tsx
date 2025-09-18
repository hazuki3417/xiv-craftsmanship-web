import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import {
	MaterialManagerContext,
	RecipeData,
	RecipeDataId,
} from "./MaterialManagerProvider.context";
import { node } from "@/functions/node";
import { RecipeContextValue } from "../Recipe";

const defaultContext: RecipeContextValue = {
	spec: null,
	tree: null,
	nodes: [],
	edges: [],
	quantity: {
		count: 1,
	},
};

export type MaterialManagerProviderProps = {
	children: ReactNode;
};

export const MaterialManagerProvider: FC<MaterialManagerProviderProps> = (
	props,
) => {
	const { children } = props;

	const [recipes, setRecipes] = useState<RecipeData[]>([
		{ id: "1", value: defaultContext },
		{ id: "2", value: defaultContext },
		{ id: "3", value: defaultContext },
		{ id: "4", value: defaultContext },
		{ id: "5", value: defaultContext },
		{ id: "6", value: defaultContext },
		{ id: "7", value: defaultContext },
		{ id: "8", value: defaultContext },
		{ id: "9", value: defaultContext },
		{ id: "10", value: defaultContext },
		{ id: "11", value: defaultContext },
		{ id: "12", value: defaultContext },
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
				value: {
					recipes,
				},
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
	"component/MaterialManagerProvider";
