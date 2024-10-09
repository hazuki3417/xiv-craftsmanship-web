import { createContext, useContext } from "react";
import {
	CraftData,
	MaterialData,
	QuantityData,
} from "./MaterialManagerProvider";
import { CraftItem } from "../Recipe";
import { Node } from "@/app/hooks";

export interface MaterialManagerContextValue {
	materials: Node[];
	dispatch: {
		materials: (data: MaterialData) => void;
		craftItem: (data: CraftData) => void;
		quantity: (data: QuantityData) => void;
	};
	fetch: {
		craftItem: (recipeId: string) => CraftItem | null;
		quantity: (recipeId: string) => number;
	};
}

export const MaterialManagerContext = createContext<
	MaterialManagerContextValue | undefined
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
