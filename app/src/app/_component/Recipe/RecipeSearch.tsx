import { FC, useState, useEffect, useCallback, memo } from "react";
import { useRecipe } from "./Recipe.context";
import {
	Combobox,
	ComboboxProps,
	InputProps,
	useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Craft, getCraft, getRecipe } from "@/openapi";
import { RecipeSearchBox } from "./RecipeSearchBox";
import { RecipeSearchDropdown } from "./RecipeSearchDropdown";

const MemorizeRecipeSearchBox = memo(RecipeSearchBox);
const MemorizeRecipeSearchDropdown = memo(RecipeSearchDropdown);

type SearchState = {
	value: string;
	isOnChange: boolean;
};

export type RecipeSearchProps = Pick<InputProps, "style"> & {};

export const RecipeSearch = (props: RecipeSearchProps) => {
	const { style } = props;
	const combobox = useCombobox();

	const { value, action } = useRecipe();

	const name = value.spec?.name || "";

	const [search, setSearch] = useState<SearchState>({
		value: name,
		isOnChange: false,
	});
	const [debouncedSearch] = useDebouncedValue(search, 500);

	const [lazyCraft, setLazyCraft] = useState<{
		loading: boolean;
		data?: Craft[];
	}>({
		loading: false,
	});

	const onOptionSubmit = async (value: string) => {
		const craft = lazyCraft.data?.find((craft) => craft.recipeId === value);
		if (!craft) {
			return;
		}

		// 選択したアイテムの名称を検索Textに設定
		setSearch({ value: craft.name, isOnChange: false });
		combobox.closeDropdown();

		// 選択したアイテムの詳細情報を取得
		await getRecipe(craft.recipeId)
			.then((res) => {
				if (!res.data) {
					console.error("response data not found");
					return;
				}
				action.spec.set(craft);
				action.tree.set(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const onCloseDropdown = useCallback(() => {
		combobox.closeDropdown();
	}, []);

	const onSerachChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearch({ value: event.target.value, isOnChange: true });
		},
		[],
	);

	const onClear = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			setSearch({ value: "", isOnChange: false });
			action.clear();
		},
		[],
	);

	useEffect(() => {
		// NOTE: debounceにより最後の入力から一定時間後に発火する

		if (debouncedSearch.isOnChange === false) {
			// NOTE: Option選択による変更の場合は検索を行わない
			return;
		}

		// NOTE: キー入力があるときは検索を行う
		if (debouncedSearch.value) {
			combobox.openDropdown();
			setLazyCraft({ loading: true });
			getCraft({ name: debouncedSearch.value })
				.then((res) => {
					setLazyCraft({ loading: false, data: res.data });
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [debouncedSearch]);

	useEffect(() => {
		if (search.value === "") {
			// NOTE: 空文字ならすぐに閉じる
			combobox.closeDropdown();
		}
	}, [search]);

	const crafts = lazyCraft.data === undefined ? [] : lazyCraft.data;

	return (
		<Combobox size="xs" store={combobox} onOptionSubmit={onOptionSubmit}>
			<MemorizeRecipeSearchBox
				style={style}
				loading={lazyCraft.loading}
				value={search.value}
				onBlur={onCloseDropdown}
				onChange={onSerachChange}
				onClear={onClear}
			/>
			<MemorizeRecipeSearchDropdown items={crafts} />
		</Combobox>
	);
};
