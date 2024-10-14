import { createContext, useContext } from "react";
import { Node, Edge } from "@/app/hooks";
import { Craft, Recipe } from "@/openapi";

export interface RecipeContextValue {
	value: {
		spec: Craft | null;
		tree: Recipe | null;
		nodes: Node[];
		edges: Edge[];
		quantity: {
			count: number;
		};
	};
}

export interface RecipeContextAction {
	action: {
		spec: {
			set: (spce: Craft) => void;
			clear: () => void;
		};
		tree: {
			set: (tree: Recipe) => void;
			clear: () => void;
		};
		quantity: {
			countUp: () => void;
			countDown: () => void;
		};
	};
}

export interface RecipeContextType
	extends RecipeContextValue,
		RecipeContextAction {}

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
