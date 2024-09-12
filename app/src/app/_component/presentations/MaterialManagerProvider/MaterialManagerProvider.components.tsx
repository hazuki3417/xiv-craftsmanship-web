import React from "react";
import { useMaterialManager } from "./MaterialManagerProvider.context";

/**
 * crystal itemの情報を注入するHOC
 * @param WrapperComponent
 * @returns
 */
export const withCrystalItemHOC = <P extends object>(
	WrapperComponent: React.ComponentType<P>,
) => {
	const OriginComponent: React.FC<Omit<P, "items">> = (props) => {
		const { materials } = useMaterialManager();

		const items = materials.filter((item) => item.type === "crystal");

		return <WrapperComponent {...(props as P)} items={items} />;
	};

	return OriginComponent;
};
withCrystalItemHOC.displayName =
	"component/presentations/MaterialManagerProvider/withCrystalItemHOC";

/**
 * leaf itemの情報を注入するHOC
 * @param WrapperComponent
 * @returns
 */
export const withLeafItemHOC = <P extends object>(
	WrapperComponent: React.ComponentType<P>,
) => {
	const OriginComponent: React.FC<Omit<P, "items">> = (props) => {
		const { materials } = useMaterialManager();

		const items = materials.filter((item) => {
			return item.nodeType === "leaf" && item.type === "material";
		});

		return <WrapperComponent {...(props as P)} items={items} />;
	};

	return OriginComponent;
};
withLeafItemHOC.displayName =
	"component/presentations/MaterialManagerProvider/withLeafItemHOC";

/**
 * internal itemの情報を注入するHOC
 * @param WrapperComponent
 * @returns
 */
export const withInternalItemHOC = <P extends object>(
	WrapperComponent: React.ComponentType<P>,
) => {
	const OriginComponent: React.FC<Omit<P, "items">> = (props) => {
		const { materials } = useMaterialManager();

		const items = materials.filter((item) => {
			return item.nodeType === "internal" && item.type === "material";
		});

		return <WrapperComponent {...(props as P)} items={items} />;
	};

	return OriginComponent;
};
withInternalItemHOC.displayName =
	"component/presentations/MaterialManagerProvider/withInternalItemHOC";
