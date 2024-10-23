import { memo, useState } from "react";
import { useRecipe } from "./Recipe.context";

import {
	SegmentedControl,
	ScrollArea,
	SegmentedControlItem,
} from "@mantine/core";

import { MaterialMiniTable } from "@/app/_component/presentations/MaterialMiniTable";
import { node } from "@/app/functions/node";

const segments: SegmentedControlItem[] = [
	{ value: "crystal", label: "クリスタル" },
	{ value: "internal", label: "中間素材" },
	{ value: "leaf", label: "素材" },
];

const MemorizeSegmentedControl = memo(SegmentedControl);

export type MaterialMiniTableSwitcherProps = {};

export const MaterialMiniTableSwitcher = (
	props: MaterialMiniTableSwitcherProps,
) => {
	const { value } = useRecipe();
	const [segment, setSegment] = useState<string>("leaf");

	// NOTE: 即時関数で結果だけ保持するように実装
	let items = [];
	switch (segment) {
		case "crystal":
			items = value.nodes
				.flatMap(node.extract.data)
				.filter(node.filter.crystal);
			break;
		case "internal":
			items = value.nodes
				.flatMap(node.extract.data)
				.filter(node.filter.internal);
			break;
		case "leaf":
			items = value.nodes.flatMap(node.extract.data).filter(node.filter.leaf);
			break;
		default:
			throw new Error("予期しないエラー");
	}

	return (
		<>
			<MemorizeSegmentedControl
				value={segment}
				onChange={setSegment}
				data={segments}
			/>
			<ScrollArea h={740}>
				<MaterialMiniTable
					items={items}
					sort={{ name: "none", quantity: "descending" }}
				/>
			</ScrollArea>
		</>
	);
};
