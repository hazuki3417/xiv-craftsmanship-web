import { memo } from "react";
import { useRecipe } from "./Recipe.context";
import { Group } from "@mantine/core";
import { QuanitityChangeInput } from "./QuanitityChangeInput";
import { RecipeInfo } from "./RecipeInfo";

const MemoizedRecipeInfo = memo(RecipeInfo);

export type RecipeInfoPanelProps = {};

export const RecipeInfoPanel = (props: RecipeInfoPanelProps) => {
	const { value, action } = useRecipe();

	const recipe = value.spec
		? {
				pieces: value.spec.pieces.toString(),
				craftLevel: value.spec.craftLevel?.toString() || "-",
				itemLevel: value.spec.itemLevel.toString(),
				job: value.spec.job,
			}
		: {
				pieces: "-",
				craftLevel: "-",
				itemLevel: "-",
				job: "-",
			};

	return (
		<Group>
			<QuanitityChangeInput
				quantity={value.quantity.count}
				onCountUp={action.quantity.countUp}
				onCountDown={action.quantity.countDown}
			/>
			<MemoizedRecipeInfo {...recipe} />
		</Group>
	);
};
