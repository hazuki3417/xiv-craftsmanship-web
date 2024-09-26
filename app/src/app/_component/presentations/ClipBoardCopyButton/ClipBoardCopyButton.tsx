import { ActionIcon, CopyButton, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { FC, memo } from "react";

export interface ClipBoardCopyButtonProps {
	value: string;
}

export const ClipBoardCopyButton: FC<ClipBoardCopyButtonProps> = memo(
	(props) => {
		const { value } = props;
		return (
			<CopyButton value={value} timeout={2000}>
				{({ copied, copy }) => (
					<Tooltip
						label={copied ? "Copied" : "Copy"}
						withArrow
						position="right"
					>
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
				)}
			</CopyButton>
		);
	},
);
ClipBoardCopyButton.displayName = "component/presentations/ClipBoardCopyButton";
