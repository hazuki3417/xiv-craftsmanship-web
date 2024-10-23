import { ActionIcon, Combobox, Input, Loader, rem } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useMemo } from "react";

export type RecipeSearchBoxProps = {
	loading: boolean;
	value: string;
	onBlur: () => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClear: () => void;
};

export const RecipeSearchBox = (props: RecipeSearchBoxProps) => {
	const { loading, value, onBlur, onChange, onClear } = props;

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
				name="_search"
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
