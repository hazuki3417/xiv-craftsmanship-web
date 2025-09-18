import { createContext, useContext } from "react";
import { Node, Edge } from "@/hooks";
import { Craft, Recipe } from "@/openapi";

export interface RecipeContextValue {
	spec: Craft | null;
	tree: Recipe | null;
	nodes: Node[];
	edges: Edge[];
	quantity: {
		count: number;
	};
}

export interface RecipeContextAction {
	spec: {
		set: (spce: Craft) => void;
	};
	tree: {
		set: (tree: Recipe) => void;
	};
	quantity: {
		set: (value: string | number) => void;
		countUp: () => void;
		countDown: () => void;
	};
	clear: () => void;
}

export type RecipeContextType = {
	value: RecipeContextValue;
	action: RecipeContextAction;
};

export const RecipeContext = createContext<RecipeContextType | undefined>(
	undefined,
);

export const useRecipe = () => {
	const context = useContext(RecipeContext);
	if (context === undefined) {
		throw new Error("useRecipe must be used within a Recipe");
	}
	return context;
};
