import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { Node } from "@/hooks";
import { ItemNode, ItemNodeProps } from "./ItemNode";

const MemorizedItemNode = memo(ItemNode);
const MemorizedLeftHandle = memo(() => (
	<Handle type="target" position={Position.Left} />
));
const MemorizedRightHandle = memo(() => (
	<Handle type="source" position={Position.Right} />
));

export type RFItemNodeProps = NodeProps<Node>;
export const RFItemNode = (props: RFItemNodeProps) => {
	const { nodeType, itemName, unit, quantity } = props.data;

	const item: ItemNodeProps = {
		name: itemName,
		unit: unit.toString(),
		quantity: quantity.toString(),
	};

	return (
		<>
			<MemorizedItemNode {...item} />
			{nodeType !== "root" ? <MemorizedLeftHandle /> : null}
			{nodeType !== "leaf" ? <MemorizedRightHandle /> : null}
		</>
	);
};
RFItemNode.displayName = "component/presentations/Diagram/RFItemNode";
