import { Input, InputProps } from "@mantine/core";
import { memo } from "react";
import { ClipBoardCopyButton } from "@/component/presentations";

const MemolizeClipBoardCopyButton = memo(ClipBoardCopyButton);

export type ClipBoardCopyInputProps = Omit<
	InputProps,
	"leftSectionPointerEvents" | "leftSection" | "readOnly"
> & {
	value: string;
};

export const ClipBoardCopyInput = (props: ClipBoardCopyInputProps) => {
	const { value, ...rest } = props;

	return (
		<Input
			leftSectionPointerEvents="all"
			leftSection={<MemolizeClipBoardCopyButton value={value} />}
			value={value}
			readOnly
			{...rest}
		/>
	);
};
ClipBoardCopyInput.displayName = "@/component/presentations/ClipBoardCopyInput";
