import { CopyButton } from "@mantine/core";
import { ReactNode, useCallback } from "react";
import { CopyActionIcon } from "@/component";

export interface ClipBoardCopyButtonProps {
	value: string;
}

const toggleIcon = (payload: {
	copied: boolean;
	copy: () => void;
}): ReactNode => {
	const { copied, copy } = payload;
	return <CopyActionIcon copied={copied} onClick={copy} />;
};

export const ClipBoardCopyButton = (props: ClipBoardCopyButtonProps) => {
	const { value } = props;
	const memoToggleIcon = useCallback(toggleIcon, []);
	return <CopyButton value={value} timeout={2000} children={memoToggleIcon} />;
};
ClipBoardCopyButton.displayName = "@/component/ClipBoardCopyButton";
