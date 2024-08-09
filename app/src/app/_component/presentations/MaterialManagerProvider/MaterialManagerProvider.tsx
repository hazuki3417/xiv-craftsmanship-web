import { FC, ReactNode, useState } from "react"
import { MaterialManagerContext } from "./MaterialManagerProvider.context";
import { ChildItemType } from "../Diagram";


type RecipeData = {
  recipeId: string;
  materials: ChildItemType[];
}

export interface MaterialManagerProviderProps {
  children: ReactNode;
}

const aggregateItems = (recipeData: RecipeData[]): ChildItemType[] => {
  const duplacateItems = recipeData.flatMap((data) => data.materials);
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

export const MaterialManagerProvider: FC<MaterialManagerProviderProps> = (props) => {
  const { children, ...rest } = props;

  const [recipeData, setRecipeData] = useState<RecipeData[]>([]);

  const dispatchMaterials = (recipeId: string, materials: ChildItemType[]) => {
    setRecipeData((prevRecipeData) => {
      const newRecipeData = prevRecipeData.filter((data) => data.recipeId !== recipeId);
      return [...newRecipeData, { recipeId, materials }];
    });
  }

  return (
    <MaterialManagerContext.Provider value={{
      materials: aggregateItems(recipeData),
      dispatchMaterials: dispatchMaterials,
    }}>
      {children}
    </MaterialManagerContext.Provider>
  );
};
MaterialManagerProvider.displayName = "component/presentations/MaterialManagerProvider";
