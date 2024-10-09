import { Group, Input, NumberInput } from "@mantine/core";

export type RecipeInfoProps = {
	pieces: string;
	craftLevel: string;
	itemLevel: string;
	job: string;
};

export const RecipeInfo = (props: RecipeInfoProps) => {
	const { pieces, craftLevel, itemLevel, job } = props;
	return (
		<>
			<Group gap="xs">
				pieces:
				<NumberInput
					size="xs"
					value={pieces}
					style={{ width: "3ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
			<Group gap="xs">
				craft lv:
				<Input
					size="xs"
					value={craftLevel}
					style={{ width: "3ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
			<Group gap="xs">
				item lv:
				<Input
					size="xs"
					value={itemLevel}
					style={{ width: "3ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
			<Group gap="xs">
				job:
				<Input
					size="xs"
					value={job}
					style={{ width: "5ch" }}
					readOnly
					variant="unstyled"
				/>
			</Group>
		</>
	);
};
