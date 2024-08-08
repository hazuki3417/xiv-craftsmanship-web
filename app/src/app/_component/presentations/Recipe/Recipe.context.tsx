import { createContext, useContext } from "react";
import { Material } from "@/graphql";
import { DiagramNodeProps } from "../Diagram";
import { Edge } from "@xyflow/react";

export type CraftItem = {
  id: string
  name: string
  materials: Material[]
}

export interface RecipeContextValue {
  rootCount: number
  onChangeRootCount: (value: string | number) => void
  setCraftItem: (value: CraftItem) => void
  nodes: DiagramNodeProps[]
  edges: Edge[]
}

export const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error("useRecipe must be used within a Recipe");
  }
  return context
}
