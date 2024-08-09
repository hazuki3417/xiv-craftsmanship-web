import { createContext, useContext } from "react";
import { ChildItemType } from "../Diagram";

export interface MaterialManagerProviderContextValue {
  items: ChildItemType[];
  dispatchTabData: (tabId: string, items: ChildItemType[]) => void;
}

export const MaterialManagerProviderContext = createContext<MaterialManagerProviderContextValue | undefined>(undefined);

export const useMaterialManagerProvider = () => {
  const context = useContext(MaterialManagerProviderContext);
  if (context === undefined) {
    throw new Error("useMaterialManagerProvider must be used within a MaterialManagerProvider");
  }
  return context
}
