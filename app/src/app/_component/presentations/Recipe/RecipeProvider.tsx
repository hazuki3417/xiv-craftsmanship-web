import { ReactNode, FC, useState, useEffect, useCallback, useRef } from "react";
import { RecipeContext, RecipeContextValue } from "./Recipe.context";
import { Depth } from "@/lib";
import { Craft, Recipe } from "@/openapi";
import { nanoid } from "nanoid";
import { Node, useQuantity, useMaterialTree } from "@/hooks";

import { parseRecipeTree } from "./parseRecipeTree";
import { useMaterialManager } from "../MaterialManagerProvider";

export interface RecipeProviderProps {
	id: string;
	value: RecipeContextValue;
	children: ReactNode;
}

export const RecipeProvider: FC<RecipeProviderProps> = (props) => {
	const { id, children, value } = props;

	const isFirstRender = useRef(true);

	const manager = useMaterialManager();

	const [craft, setCraft] = useState(value.spec);
	const [recipe, setRecipe] = useState(value.tree);

	const { quantity, countUp, countDown, set } = useQuantity({
		count: value.quantity.count,
	});

	const { nodes, edges, setTree, setQuantity } = useMaterialTree({
		nodes: value.nodes,
		edges: value.edges,
	});

	/**
	 * NOTE: recipe treeをレンダリングするuseEffect
	 * 　　　 APIリクエストの結果を保持するstateの更新がトリガーとなって下記の処理が実行される。
	 */
	useEffect(() => {
		const isEmptyData = !craft || !recipe;
		if (isEmptyData) {
			// recipe treeのレンダリングに必要な情報がないときはスキップする
			console.debug("skip drawing tree diagrams. craft or recipe empty.");
			return;
		}

		if (isFirstRender.current) {
			// 最初のレンダリング時はカスタムフックに初期値が設定されてレンダリングされるためスキップ
			console.debug("skip drawing tree diagrams. first render.");
			return;
		}

		console.debug("drawing tree diagrams. change craft or recipe data.");

		/**
		 * APIの情報からrecipe treeの情報を生成しツリーダイアグラムをレンダリングする
		 */

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

		const { nodes, edges } = parseRecipeTree(recipe, root, depth);
		setTree([root, ...nodes], edges);
	}, [craft, recipe]);

	/**
	 * NOTE: 作成個数を変更したときの処理
	 */
	useEffect(() => {
		const isEmptyData = !craft || !recipe;
		if (isEmptyData) {
			// recipe treeのレンダリングに必要な情報がないときはスキップする
			console.debug("skip drawing tree diagrams. craft or recipe empty.");
			return;
		}

		if (isFirstRender.current) {
			// 最初のレンダリング時はカスタムフックに初期値が設定されてレンダリングされるためスキップ
			console.debug("skip drawing tree diagrams. first render.");
			return;
		}

		console.debug("drawing tree diagrams. change quantity number.");

		setQuantity(quantity);
	}, [quantity]);

	/**
	 * NOTE: 親のcontextへ状態を同期する処理
	 */
	useEffect(() => {
		if (isFirstRender.current) {
			// 最初のレンダリング時はProvidreから受け取った値のままなので同期する必要がない。
			console.debug("skip dispatch. first render.");
			return;
		}

		manager.action.dispatch(id, (prev) => {
			return {
				...prev,
				spec: craft,
				tree: recipe,
				nodes,
				edges,
				quantity: {
					count: quantity,
				},
			};
		});
	}, [craft, recipe, nodes, edges, quantity]);

	useEffect(() => {
		isFirstRender.current = false;
	}, []);

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
							setCraft(craft);
						}, []),
					},
					tree: {
						set: useCallback((recipe: Recipe) => {
							setRecipe(recipe);
						}, []),
					},
					quantity: {
						set: set,
						countUp: countUp,
						countDown: countDown,
					},
					clear: useCallback(() => {
						setCraft(null);
						setRecipe(null);
						setTree([], []);
					}, []),
				},
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};
RecipeProvider.displayName = "@/_component/presentations/Recipe/RecipeProvider";
