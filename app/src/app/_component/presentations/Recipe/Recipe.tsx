import { FC, useState } from "react";
import { Diagram } from "../index";
import {
	Grid,
	Title,
	Group,
	Stack,
	SegmentedControl,
	SegmentedControlItem,
	ScrollArea,
} from "@mantine/core";
import {
	InputCraftLevel,
	InputItemLevel,
	InputJob,
	InputPieces,
	QuantityInput,
	RecipeCrystalTable,
	RecipeInternalTable,
	RecipeLeafTable,
	RecipeProvider,
	SearchCombobox,
} from "./index";

export interface RecipeProps {
	id: string;
}

type SegmentProps = "crystal" | "internal" | "leaf";

const segments: SegmentedControlItem[] = [
	{ value: "crystal", label: "クリスタル" },
	{ value: "internal", label: "中間素材" },
	{ value: "leaf", label: "素材" },
];

export const Recipe: FC<RecipeProps> = (props) => {
	const { id, ...rest } = props;
	const [segment, setSegment] = useState<string>("leaf");
	return (
		<RecipeProvider recipeId={id}>
			<Grid>
				<Grid.Col span={7}>
					<Stack gap={2}>
						<SearchCombobox />
						<Group>
							<Group gap="xs">
								quantity:
								<QuantityInput />
							</Group>
							<InputPieces />
							<InputCraftLevel />
							<InputItemLevel />
							<InputJob />
						</Group>
						<div style={{ height: "740px" }}>
							<Diagram />
						</div>
					</Stack>
				</Grid.Col>
				<Grid.Col span={5}>
					<Stack gap={0}>
						<SegmentedControl
							value={segment}
							onChange={setSegment}
							data={segments}
						/>
						<ScrollArea h={740}>
							{segment === "crystal" && <RecipeCrystalTable />}
							{segment === "internal" && <RecipeInternalTable />}
							{segment === "leaf" && <RecipeLeafTable />}
						</ScrollArea>
					</Stack>
				</Grid.Col>
			</Grid>
		</RecipeProvider>
	);
};
Recipe.displayName = "component/presentations/Recipe";
