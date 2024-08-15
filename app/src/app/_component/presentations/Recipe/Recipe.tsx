import { FC } from "react";
import { Diagram } from "../index";
import {
	Grid,
	Box,
	Divider,
	Title,
	Input,
	InputWrapper,
	Group,
	NumberInput,
} from "@mantine/core";
import {
	InputCraftLevel,
	InputItemLevel,
	InputJob,
	InputPieces,
	QuantityInput,
	RecipeInternalTable,
	RecipeLeafTable,
	RecipeProvider,
	SearchCombobox,
	useRecipe,
} from "./index";

export interface RecipeProps {
	id: string;
}

export const Recipe: FC<RecipeProps> = (props) => {
	const { id, ...rest } = props;
	return (
		<RecipeProvider recipeId={id}>
			{/* <Box> */}
			<Grid>
				<Grid.Col span={12}>
					<Grid>
						<Grid.Col span={"auto"}>
							<SearchCombobox />
						</Grid.Col>
						<Grid.Col span={7}>
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
						</Grid.Col>
					</Grid>
				</Grid.Col>
				<Grid.Col span={12} style={{ height: "60vh" }}>
					<Diagram />
				</Grid.Col>
				<Grid.Col span={4}>
					<Title order={6}>中間素材</Title>
					<RecipeInternalTable />
				</Grid.Col>
				<Grid.Col span={8}>
					<Title order={6}>素材</Title>
					<RecipeLeafTable />
				</Grid.Col>
			</Grid>
			{/* </Box> */}
		</RecipeProvider>
	);
};
Recipe.displayName = "component/presentations/Recipe";
