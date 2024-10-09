import { Input, InputProps } from "@mantine/core";
import { memo } from "react";
import { ClipBoardCopyButton } from "../ClipBoardCopyButton";

const MemolizeClipBoardCopyButton = memo(ClipBoardCopyButton);

export type NodeInputProps = Pick<InputProps, "style"> & {
	value: string;
};

export const NodeInput = (props: NodeInputProps) => {
	const { value, ...rest } = props;

	return (
		<Input
			size="xs"
			leftSectionPointerEvents="all"
			leftSection={<MemolizeClipBoardCopyButton value={value} />}
			value={value}
			readOnly
			{...rest}
		/>
	);
};
