import { FC, ReactNode, useEffect, useState } from "react"
import { ItemAggregationContext } from "./ItemAggregation.context";
import { ChildItemType } from "../Diagram";


export interface ItemAggregationProps {
  children: ReactNode;
}

type TabData = {
  tabId: string;
  items: ChildItemType[];
}

export const ItemAggregation: FC<ItemAggregationProps> = (props) => {
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
    <ItemAggregationContext.Provider value={{
      items: aggregateItems(tabData),
      dispatchTabData: dispatchTabData,
    }}>
      {children}
    </ItemAggregationContext.Provider>
  );
};
