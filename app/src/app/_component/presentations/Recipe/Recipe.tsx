import { FC } from "react";
import { Diagram } from "../index";
import {
	Grid,
	Group,
	Stack,
} from "@mantine/core";
import {
	InputCraftLevel,
	InputItemLevel,
	InputJob,
	InputPieces,
	MaterialTableSwitcher,
	QuantityInput,
	RecipeProvider,
	SearchCombobox,
} from "./";

export interface RecipeProps {
	id: string;
}

export const Recipe: FC<RecipeProps> = (props) => {
	const { id, ...rest } = props;
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
						<MaterialTableSwitcher />
					</Stack>
				</Grid.Col>
			</Grid>
		</RecipeProvider>
	);
};
Recipe.displayName = "component/presentations/Recipe";
