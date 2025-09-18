import { ActionIcon, Group, NumberInput, rem } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";

export type QuanitityChangeInputProps = {
	quantity: number;
	onCountUp: React.MouseEventHandler<SVGSVGElement>;
	onCountDown: React.MouseEventHandler<SVGSVGElement>;
	onChange: (value: string | number) => void;
};

export const QuanitityChangeInput = (props: QuanitityChangeInputProps) => {
	const { quantity, onCountUp, onCountDown, onChange } = props;

	const CountUpIcon = useMemo(() => {
		return (
			<ActionIcon variant="light">
				<IconPlus style={{ width: rem(16) }} onClick={onCountUp} />
			</ActionIcon>
		);
	}, []);
	const CountDownIcon = useMemo(() => {
		return (
			<ActionIcon variant="light">
				<IconMinus style={{ width: rem(16) }} onClick={onCountDown} />
			</ActionIcon>
		);
	}, []);

	return (
		<Group gap="xs">
			quantity:
			<Group gap={4}>
				<NumberInput
					size="xs"
					style={{ width: "6ch" }}
					value={quantity}
					hideControls
					onChange={onChange}
					min={1}
					max={999}
				/>
				{CountUpIcon}
				{CountDownIcon}
			</Group>
		</Group>
	);
};
