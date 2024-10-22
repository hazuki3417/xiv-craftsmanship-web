import { ReactNode, FC, useState, useEffect, useCallback } from "react";
import { RecipeContext, RecipeContextValue } from "./Recipe.context";
import { Depth } from "@/lib";
import { Craft, Recipe } from "@/openapi";
import { nanoid } from "nanoid";
import { Node, useQuantity, useMaterialTree } from "@/app/hooks";

import { parseRecipeTree } from "./parseRecipeTree";

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
RecipeProvider.displayName = "@/_component/presentations/Recipe/RecipeProvider";
