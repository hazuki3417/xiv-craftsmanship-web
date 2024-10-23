import { Group, Input, NumberInput } from "@mantine/core";

export type RecipeInfoProps = {
	pieces: string;
	craftLevel: string;
	itemLevel: string;
	job: string;
};

export const RecipeInfo = (props: RecipeInfoProps) => {
	const { pieces, craftLevel, itemLevel, job } = props;

	/**
	 * NOTE: _から始まる値をname属性に指定 > 情報エラーの出力を抑制する意図。
	 *       ロジックで使用はしていない。
	 */
	return (
		<>
			<Group gap="xs">
				pieces:
				<NumberInput
					name="_pieces"
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
					name="_craftLv"
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
					name="_itemLv"
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
					name="_job"
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
