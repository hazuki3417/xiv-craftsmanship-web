import { createContext, useContext } from "react";
import { Craft, Recipe } from "@/openapi";
import { DiagramNodeProps } from "../Diagram";
import { Edge } from "@xyflow/react";

export type CraftItem = {
	spec: Craft;
	tree: Recipe;
};

export interface RecipeContextValue {
	root: {
		quantity: number;
		countUp: () => void;
		countDown: () => void;
		onClear: () => void;
	};
	dispatch: {
		craftitem: (data: CraftItem | null) => void;
	};
	fetch: {
		craftItem: () => CraftItem | null;
	};
	nodes: DiagramNodeProps[];
	edges: Edge[];
}

export const RecipeContext = createContext<RecipeContextValue | undefined>(
	undefined,
);

export const useRecipe = () => {
	const context = useContext(RecipeContext);
	if (context === undefined) {
		throw new Error("useRecipe must be used within a Recipe");
	}
	return context;
};
