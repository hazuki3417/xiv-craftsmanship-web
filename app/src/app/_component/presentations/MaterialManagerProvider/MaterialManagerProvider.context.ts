import { createContext, useContext } from "react";
import { RecipeContextValue } from "../Recipe";
import { NodeDataType } from "@/app/hooks";

export type RecipeDataId = string;
export type RecipeData = {
	id: RecipeDataId;
	value: RecipeContextValue;
};

export interface MaterialManagerContextValue {}

export interface MaterialManagerContextAction {
	fetch: (id: RecipeDataId) => RecipeContextValue;
	dispatch: (
		id: RecipeDataId,
		callback: (recipe: RecipeContextValue) => RecipeContextValue,
	) => void;
	aggregate: () => NodeDataType[];
}

export type MaterialManagerContextType = {
	value: MaterialManagerContextValue;
	action: MaterialManagerContextAction;
};

export const MaterialManagerContext = createContext<
	MaterialManagerContextType | undefined
>(undefined);

export const useMaterialManager = () => {
	const context = useContext(MaterialManagerContext);
	if (context === undefined) {
		throw new Error(
			"useMaterialManager must be used within a MaterialManagerProvider",
		);
	}
	return context;
};
