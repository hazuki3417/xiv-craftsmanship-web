import { createContext, useContext } from "react";
import { ChildItemType } from "../Diagram";

export interface MaterialManagerContextValue {
  items: ChildItemType[];
  dispatchTabData: (tabId: string, items: ChildItemType[]) => void;
}

export const MaterialManagerContext = createContext<MaterialManagerContextValue | undefined>(undefined);

export const useMaterialManager = () => {
  const context = useContext(MaterialManagerContext);
  if (context === undefined) {
    throw new Error("useMaterialManager must be used within a MaterialManagerProvider");
  }
  return context
}
