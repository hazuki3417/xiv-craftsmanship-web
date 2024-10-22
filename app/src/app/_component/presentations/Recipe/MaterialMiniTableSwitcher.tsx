import { useState } from "react";
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
				.filter(node.filter.crystal)
				.flatMap(node.extract.data);
			break;
		case "internal":
			items = value.nodes
				.filter(node.filter.internal)
				.flatMap(node.extract.data);
			break;
		case "leaf":
			items = value.nodes.filter(node.filter.leaf).flatMap(node.extract.data);
			break;
		default:
			throw new Error("予期しないエラー");
	}

	return (
		<>
			<SegmentedControl value={segment} onChange={setSegment} data={segments} />
			<ScrollArea h={740}>
				<MaterialMiniTable
					items={items}
					sort={{ name: "none", quantity: "descending" }}
				/>
			</ScrollArea>
		</>
	);
};
