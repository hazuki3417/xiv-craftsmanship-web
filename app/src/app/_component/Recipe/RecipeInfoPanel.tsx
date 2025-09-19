import { memo, useCallback } from "react";
import { useRecipe } from "./Recipe.context";
import { ActionIcon, Button, Group, rem } from "@mantine/core";
import { QuanitityChangeInput } from "./QuanitityChangeInput";
import { RecipeInfo } from "./RecipeInfo";
import { IconPlus } from "@tabler/icons-react";

const MemoizedRecipeInfo = memo(RecipeInfo);

export type RecipeInfoPanelProps = {
	onAddRecipe: () => void;
};

export const RecipeInfoPanel = (props: RecipeInfoPanelProps) => {
	const { onAddRecipe } = props;
	const { value, action } = useRecipe();

	const recipe = value.spec
		? {
				pieces: value.spec.pieces.toString(),
				craftLevel: value.spec.craftLevel?.toString() || "-",
				itemLevel: value.spec.itemLevel?.toString() || "-",
				job: value.spec.job,
			}
		: {
				pieces: "-",
				craftLevel: "-",
				itemLevel: "-",
				job: "-",
			};

	return (
		<Group justify="space-between">
			<Group>
				<QuanitityChangeInput
					quantity={value.quantity.count}
					onCountUp={action.quantity.countUp}
					onCountDown={action.quantity.countDown}
					onChange={action.quantity.set}
				/>
				<MemoizedRecipeInfo {...recipe} />
			</Group>
			<Button size="xs" onClick={onAddRecipe}>
				add creft item
			</Button>
		</Group>
	);
};
