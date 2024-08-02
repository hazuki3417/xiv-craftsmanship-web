import { createContext, useContext } from "react";
import { ChildItemType } from "../Diagram";

export interface ItemAggregationContextValue {
  items: ChildItemType[];
  dispatchTabData: (tabId: string, items: ChildItemType[]) => void;
}

export const ItemAggregationContext = createContext<ItemAggregationContextValue | undefined>(undefined);

export const useItemAggregation = () => {
  const context = useContext(ItemAggregationContext);
  if (context === undefined) {
    throw new Error("useItemAggregation must be used within a ItemAggregation");
  }
  return context
}
