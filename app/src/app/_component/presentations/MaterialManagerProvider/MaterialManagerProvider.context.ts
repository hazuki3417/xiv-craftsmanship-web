import { createContext, useContext } from "react";
import { ChildItemType } from "../Diagram";
import { CraftData, MaterialData, QuantityData } from "./MaterialManagerProvider";

export interface MaterialManagerContextValue {
  materials: ChildItemType[];
  dispatch : {
    materials: (data: MaterialData) => void;
    craftItem: (data: CraftData) => void;
    quantity: (data: QuantityData) => void;
  },
  fetch : {
    craftItem: (recipeId: string) => CraftData
    quantity: (recipeId: string) => number
  }
}

export const MaterialManagerContext = createContext<MaterialManagerContextValue | undefined>(undefined);

export const useMaterialManager = () => {
  const context = useContext(MaterialManagerContext);
  if (context === undefined) {
    throw new Error("useMaterialManager must be used within a MaterialManagerProvider");
  }
  return context
}
