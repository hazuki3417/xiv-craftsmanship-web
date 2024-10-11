import { ActionIcon, CopyButton, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { ReactNode, useCallback } from "react";

export interface ClipBoardCopyButtonProps {
	value: string;
}

type CopyActionIconProps = {
	copied: boolean;
	copy: () => void;
};

const CopyActionIcon = (props: CopyActionIconProps) => {
	const { copied, copy } = props;
	return (
		<Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
			<ActionIcon
				color={copied ? "teal" : "gray"}
				variant="subtle"
				onClick={copy}
			>
				{copied ? (
					<IconCheck style={{ width: rem(16) }} />
				) : (
					<IconCopy style={{ width: rem(16) }} />
				)}
			</ActionIcon>
		</Tooltip>
	);
};

const toggleIcon = (payload: {
	copied: boolean;
	copy: () => void;
}): ReactNode => {
	const { copied, copy } = payload;
	return <CopyActionIcon copied={copied} copy={copy} />;
};

export const ClipBoardCopyButton = (props: ClipBoardCopyButtonProps) => {
	const { value } = props;
	const memoToggleIcon = useCallback(toggleIcon, []);
	return <CopyButton value={value} timeout={2000} children={memoToggleIcon} />;
};
ClipBoardCopyButton.displayName = "component/presentations/ClipBoardCopyButton";
