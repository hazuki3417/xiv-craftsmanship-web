import {
	ActionIcon,
	BoxProps,
	Combobox,
	Input,
	InputProps,
	Loader,
	rem,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useMemo } from "react";

export type RecipeSearchBoxProps = Pick<InputProps, "style"> & {
	loading: boolean;
	value: string;
	onBlur: React.FocusEventHandler<HTMLInputElement>;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onClear: React.MouseEventHandler<HTMLButtonElement>;
};

export const RecipeSearchBox = (props: RecipeSearchBoxProps) => {
	const { loading, value, onBlur, onChange, onClear, ...rest } = props;

	const MemorizeClearButton = useMemo(() => {
		return (
			<ActionIcon variant="subtle" onClick={onClear}>
				<IconX style={{ width: rem(16) }} />
			</ActionIcon>
		);
	}, [onClear]);

	const MemorizeLoadingIcon = useMemo(() => {
		return loading ? <Loader size={20} /> : <IconSearch />;
	}, [loading]);

	/**
	 * NOTE: _から始まる値をname属性に指定 > 情報エラーの出力を抑制する意図。
	 *       ロジックで使用はしていない。
	 */
	return (
		<Combobox.Target>
			<Input
				{...rest}
				size="xs"
				placeholder="search"
				value={value}
				leftSection={MemorizeLoadingIcon}
				rightSection={value ? MemorizeClearButton : null}
				rightSectionPointerEvents="all"
				onChange={onChange}
				onBlur={onBlur}
			/>
		</Combobox.Target>
	);
};
