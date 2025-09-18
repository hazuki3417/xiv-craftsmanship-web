import { ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export interface CopyActionIconProps {
	copied: boolean;
	onClick: () => void;
}

export const CopyActionIcon = (props: CopyActionIconProps) => {
	const { copied, onClick } = props;
	return (
		<Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
			<ActionIcon
				color={copied ? "teal" : "gray"}
				variant="subtle"
				onClick={onClick}
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
CopyActionIcon.displayName = "@/component/presentations/CopyActionIcon";
