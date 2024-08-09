import { FC, ReactNode, useState } from "react"
import { MaterialManagerProviderContext } from "./MaterialManagerProvider.context";
import { ChildItemType } from "../Diagram";


type TabData = {
  tabId: string;
  items: ChildItemType[];
}

export interface MaterialManagerProviderProps {
  children: ReactNode;
}

export const MaterialManagerProvider: FC<MaterialManagerProviderProps> = (props) => {
  const { children, ...rest } = props;

  const [tabData, setTabData] = useState<TabData[]>([]);

  const dispatchTabData = (tabId: string, items: ChildItemType[]) => {
    setTabData((prevTabData) => {
      const newTabData = prevTabData.filter((data) => data.tabId !== tabId);
      return [...newTabData, { tabId, items }];
    });
  }

  const aggregateItems = (tabData: TabData[]): ChildItemType[] => {
    const duplacateItems = tabData.flatMap((data) => data.items);
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


  return (
    <MaterialManagerProviderContext.Provider value={{
      items: aggregateItems(tabData),
      dispatchTabData: dispatchTabData,
    }}>
      {children}
    </MaterialManagerProviderContext.Provider>
  );
};
MaterialManagerProvider.displayName = "component/presentations/MaterialManagerProvider";
