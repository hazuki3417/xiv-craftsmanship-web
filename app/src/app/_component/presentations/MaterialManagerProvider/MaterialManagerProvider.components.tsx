import React from 'react';
import { useMaterialManagerProvider } from "./MaterialManagerProvider.context"

/**
 * leaf itemの情報を注入するHOC
 * @param WrapperComponent
 * @returns
 */
export const withLeafItemHOC = <P extends object>(WrapperComponent: React.ComponentType<P>) => {
  const OriginComponent: React.FC<Omit<P, 'items'>> = (props) => {
    const { items } = useMaterialManagerProvider()

    return (
      <WrapperComponent {...(props as P)} items={items.filter((item) => item.type === "leaf")} />
    );
  };

  return OriginComponent;
};
withLeafItemHOC.displayName = "component/presentations/MaterialManagerProvider/withLeafItemHOC";

/**
 * internal itemの情報を注入するHOC
 * @param WrapperComponent
 * @returns
 */
export const withInternalItemHOC = <P extends object>(WrapperComponent: React.ComponentType<P>) => {
  const OriginComponent: React.FC<Omit<P, 'items'>> = (props) => {
    const { items } = useMaterialManagerProvider()

    return (
      <WrapperComponent {...(props as P)} items={items.filter((item) => item.type === "internal")} />
    );
  };

  return OriginComponent;
};
withInternalItemHOC.displayName = "component/presentations/MaterialManagerProvider/withInternalItemHOC";
