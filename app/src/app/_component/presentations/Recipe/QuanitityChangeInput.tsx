import { ActionIcon, Group, NumberInput, rem } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";

export type QuanitityChangeInputProps = {
	quantity: number;
	onCountUp: () => void;
	onCountDown: () => void;
};

export const QuanitityChangeInput = (props: QuanitityChangeInputProps) => {
	const { quantity, onCountUp, onCountDown } = props;

	const CountUpIcon = useMemo(() => {
		return (
			<ActionIcon variant="subtle" style={{ marginLeft: 5 }}>
				<IconPlus style={{ width: rem(16) }} onClick={onCountUp} />
			</ActionIcon>
		);
	}, []);
	const CountDownIcon = useMemo(() => {
		return (
			<ActionIcon variant="subtle" style={{ marginLeft: 5 }}>
				<IconMinus style={{ width: rem(16) }} onClick={onCountDown} />
			</ActionIcon>
		);
	}, []);

	return (
		<Group gap="xs">
			quantity:
			<Group gap={0}>
				<NumberInput
					size="xs"
					style={{ width: "4ch" }}
					value={quantity}
					hideControls
					min={1}
					max={99}
				/>
				{CountUpIcon}
				{CountDownIcon}
			</Group>
		</Group>
	);
};
