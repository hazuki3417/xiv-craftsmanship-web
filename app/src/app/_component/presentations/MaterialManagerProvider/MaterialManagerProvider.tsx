import { FC, ReactNode, useState } from "react"
import { MaterialManagerContext } from "./MaterialManagerProvider.context";
import { ChildItemType } from "../Diagram";
import { CraftItem } from "../Recipe";


export type MaterialData = {
  recipeId: string;
  materials: ChildItemType[];
}

export type CraftData = {
  recipeId: string;
  craftItem: CraftItem;
}

export type QuantityData = {
  recipeId: string;
  quantity: number;
}

export interface MaterialManagerProviderProps {
  children: ReactNode;
}

const aggregateItems = (materials: MaterialData[]): ChildItemType[] => {
  const duplacateItems = materials.flatMap((data) => data.materials);
  const itemMap: Record<string, ChildItemType> = {};

  duplacateItems.forEach(item => {
    if (itemMap[item.id]) {
      itemMap[item.id].tcount += item.tcount;
    } else {
      itemMap[item.id] = { ...item };
    }
  });

  return Object.values(itemMap);
};


const limit = 3;
const initMaterialData: MaterialData[] = Array.from({ length: limit }, (_, index) => ({ recipeId: (index + 1).toString(), materials: [] }));
const initCraftData: CraftData[] = Array.from({ length: limit }, (_, index) => ({ recipeId: (index + 1).toString(), craftItem: { id: "", name: "", materials: [] } }));
const initQuantityData: QuantityData[] = Array.from({ length: limit }, (_, index) => ({ recipeId: (index + 1).toString(), quantity: 1 }));

export const MaterialManagerProvider: FC<MaterialManagerProviderProps> = (props) => {
  const { children, ...rest } = props;

  const [materials, setMaterials] = useState<MaterialData[]>(initMaterialData);
  const [craftItems, setCraftItems] = useState<CraftData[]>(initCraftData);
  const [quantity, setQuantity] = useState<QuantityData[]>(initQuantityData);

  const dispatchMaterials = (data: MaterialData) => {
    setMaterials((prevMaterials) => {
      const newMaterials = prevMaterials.filter((data) => data.recipeId !== data.recipeId);
      return [...newMaterials, data];
    });
  }

  const dispatchCraftItem = (data: CraftData) => {
    setCraftItems((prevCraftItems) => {
      const newCraftItems = prevCraftItems.filter((data) => data.recipeId !== data.recipeId);
      return [...newCraftItems, data];
    });
  }

  const dispatchQuantity = (data: QuantityData) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity.filter((data) => data.recipeId !== data.recipeId);
      return [...newQuantity, data];
    });
  }

  const fetchCraftItem = (recipeId: string): CraftData => {
    const result = craftItems.find((craftItem) => craftItem.recipeId === recipeId)
    return result || { recipeId, craftItem: { id: "", name: "", materials: [] } };
  }

  const fetchQuantity = (recipeId: string): number => {
    const result = quantity.find((data) => data.recipeId === recipeId)
    return result?.quantity || 1;
  }

  return (
    <MaterialManagerContext.Provider value={{
      materials: aggregateItems(materials),
      dispatch: {
        materials: dispatchMaterials,
        craftItem: dispatchCraftItem,
        quantity: dispatchQuantity
      },
      fetch: {
        craftItem: fetchCraftItem,
        quantity: fetchQuantity
      }
    }}>
      {children}
    </MaterialManagerContext.Provider>
  );
};
MaterialManagerProvider.displayName = "component/presentations/MaterialManagerProvider";
