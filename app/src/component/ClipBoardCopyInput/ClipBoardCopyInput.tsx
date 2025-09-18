import { Input, InputProps } from "@mantine/core";
import { memo } from "react";
import { ClipBoardCopyButton } from "../ClipBoardCopyButton";

const MemolizeClipBoardCopyButton = memo(ClipBoardCopyButton);

export type ClipBoardCopyInputProps = Omit<
	InputProps,
	"leftSectionPointerEvents" | "leftSection" | "readOnly"
> & {
	value: string;
	name?: string;
};

/**
 * NOTE: name属性を省略した場合、情報エラーが出力される。
 * 　　　それを防ぐためにダミーの初期値を指定。
 */
export const ClipBoardCopyInput = ({
	name = "_dummy",
	...props
}: ClipBoardCopyInputProps) => {
	const { value, ...rest } = props;

	return (
		<Input
			name={name}
			leftSectionPointerEvents="all"
			leftSection={<MemolizeClipBoardCopyButton value={value} />}
			value={value}
			readOnly
			{...rest}
		/>
	);
};
ClipBoardCopyInput.displayName = "@/component/presentations/ClipBoardCopyInput";
