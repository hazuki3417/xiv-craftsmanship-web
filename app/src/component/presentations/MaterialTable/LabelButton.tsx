import { ReactNode } from "react";
import { Group, UnstyledButton } from "@mantine/core";

export type LabelButtonProps = {
	left?: ReactNode;
	right?: ReactNode;
	label: string;
	onClick: () => void;
};

export const LabelButton = (props: LabelButtonProps) => {
	const { left, right, label, onClick } = props;
	return (
		<UnstyledButton onClick={onClick}>
			<Group gap={"xs"}>
				{left}
				{label}
				{right}
			</Group>
		</UnstyledButton>
	);
};
LabelButton.displayName = "@/component/presentations/MaterialTable/LabelButton";
