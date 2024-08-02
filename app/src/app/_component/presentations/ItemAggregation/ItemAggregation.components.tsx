import React from 'react';
import { useItemAggregation } from "./ItemAggregation.context"

/**
 * leaf itemの情報を注入するHOC
 * @param WrapperComponent
 * @returns
 */
export const withLeafItemHOC = <P extends object>(WrapperComponent: React.ComponentType<P>) => {
  const OriginComponent: React.FC<Omit<P, 'items'>> = (props) => {
    const { items } = useItemAggregation()

    return (
      <WrapperComponent {...(props as P)} items={items.filter((item) => item.type === "leaf")} />
    );
  };

  return OriginComponent;
};
/**
 * internal itemの情報を注入するHOC
 * @param WrapperComponent
 * @returns
 */
export const withInternalItemHOC = <P extends object>(WrapperComponent: React.ComponentType<P>) => {
  const OriginComponent: React.FC<Omit<P, 'items'>> = (props) => {
    const { items } = useItemAggregation()

    return (
      <WrapperComponent {...(props as P)} items={items.filter((item) => item.type === "internal")} />
    );
  };

  return OriginComponent;
};
