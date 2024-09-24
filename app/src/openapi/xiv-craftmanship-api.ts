/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * xiv-craftsmanship-api
 * xiv-craftsmanship-api
 * OpenAPI spec version: 1.0.0
 */
import { useQuery } from "@tanstack/react-query";
import type {
	DefinedInitialDataOptions,
	DefinedUseQueryResult,
	QueryFunction,
	QueryKey,
	UndefinedInitialDataOptions,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
export type GetCraftParams = {
	name: string;
};

export type ItemType = (typeof ItemType)[keyof typeof ItemType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ItemType = {
	material: "material",
	crystal: "crystal",
} as const;

export interface Recipe {
	/** @pattern ^[0-9a-z]{11} */
	itemId: string;
	materials: Material[];
	/** @pattern ^[0-9a-z]{11} */
	recipeId: string;
}

export interface Material {
	/** @pattern ^[0-9a-z]{11} */
	itemId: string;
	/**
	 * @minimum 1
	 * @maximum 999
	 */
	quantity: number;
	recipes: Recipe[];
	type: ItemType;
}

/**
 * @pattern ^[0-9a-z]{11}
 */
export type ItemId = string;

/**
 * @pattern ^[0-9a-z]{11}
 */
export type RecipeId = string;

export interface Craft {
	/**
	 * @minimum 1
	 * @maximum 999
	 * @nullable
	 */
	readonly craftLevel: number | null;
	/** @pattern ^[0-9a-z]{11} */
	itemId: string;
	/**
	 * @minimum 1
	 * @maximum 999
	 */
	readonly itemLevel: number;
	job: string;
	name: string;
	/**
	 * @minimum 1
	 * @maximum 999
	 */
	pieces: number;
	/** @pattern ^[0-9a-z]{11} */
	recipeId: string;
}

/**
 * craft
 * @summary craft
 */
export const getCraft = (
	params: GetCraftParams,
	options?: AxiosRequestConfig,
): Promise<AxiosResponse<Craft[]>> => {
	return axios.get(`/craft`, {
		...options,
		params: { ...params, ...options?.params },
	});
};

export const getGetCraftQueryKey = (params: GetCraftParams) => {
	return [`/craft`, ...(params ? [params] : [])] as const;
};

export const getGetCraftQueryOptions = <
	TData = Awaited<ReturnType<typeof getCraft>>,
	TError = AxiosError<void>,
>(
	params: GetCraftParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getCraft>>, TError, TData>
		>;
		axios?: AxiosRequestConfig;
	},
) => {
	const { query: queryOptions, axios: axiosOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetCraftQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getCraft>>> = ({
		signal,
	}) => getCraft(params, { signal, ...axiosOptions });

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof getCraft>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type GetCraftQueryResult = NonNullable<
	Awaited<ReturnType<typeof getCraft>>
>;
export type GetCraftQueryError = AxiosError<void>;

export function useGetCraft<
	TData = Awaited<ReturnType<typeof getCraft>>,
	TError = AxiosError<void>,
>(
	params: GetCraftParams,
	options: {
		query: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getCraft>>, TError, TData>
		> &
			Pick<
				DefinedInitialDataOptions<
					Awaited<ReturnType<typeof getCraft>>,
					TError,
					TData
				>,
				"initialData"
			>;
		axios?: AxiosRequestConfig;
	},
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetCraft<
	TData = Awaited<ReturnType<typeof getCraft>>,
	TError = AxiosError<void>,
>(
	params: GetCraftParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getCraft>>, TError, TData>
		> &
			Pick<
				UndefinedInitialDataOptions<
					Awaited<ReturnType<typeof getCraft>>,
					TError,
					TData
				>,
				"initialData"
			>;
		axios?: AxiosRequestConfig;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetCraft<
	TData = Awaited<ReturnType<typeof getCraft>>,
	TError = AxiosError<void>,
>(
	params: GetCraftParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getCraft>>, TError, TData>
		>;
		axios?: AxiosRequestConfig;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary craft
 */

export function useGetCraft<
	TData = Awaited<ReturnType<typeof getCraft>>,
	TError = AxiosError<void>,
>(
	params: GetCraftParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getCraft>>, TError, TData>
		>;
		axios?: AxiosRequestConfig;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getGetCraftQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

/**
 * recipe
 * @summary recipe
 */
export const getRecipe = (
	recipeId: string,
	options?: AxiosRequestConfig,
): Promise<AxiosResponse<Material>> => {
	return axios.get(`/recipe/${recipeId}`, options);
};

export const getGetRecipeQueryKey = (recipeId: string) => {
	return [`/recipe/${recipeId}`] as const;
};

export const getGetRecipeQueryOptions = <
	TData = Awaited<ReturnType<typeof getRecipe>>,
	TError = AxiosError<void>,
>(
	recipeId: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getRecipe>>, TError, TData>
		>;
		axios?: AxiosRequestConfig;
	},
) => {
	const { query: queryOptions, axios: axiosOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetRecipeQueryKey(recipeId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getRecipe>>> = ({
		signal,
	}) => getRecipe(recipeId, { signal, ...axiosOptions });

	return {
		queryKey,
		queryFn,
		enabled: !!recipeId,
		...queryOptions,
	} as UseQueryOptions<Awaited<ReturnType<typeof getRecipe>>, TError, TData> & {
		queryKey: QueryKey;
	};
};

export type GetRecipeQueryResult = NonNullable<
	Awaited<ReturnType<typeof getRecipe>>
>;
export type GetRecipeQueryError = AxiosError<void>;

export function useGetRecipe<
	TData = Awaited<ReturnType<typeof getRecipe>>,
	TError = AxiosError<void>,
>(
	recipeId: string,
	options: {
		query: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getRecipe>>, TError, TData>
		> &
			Pick<
				DefinedInitialDataOptions<
					Awaited<ReturnType<typeof getRecipe>>,
					TError,
					TData
				>,
				"initialData"
			>;
		axios?: AxiosRequestConfig;
	},
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetRecipe<
	TData = Awaited<ReturnType<typeof getRecipe>>,
	TError = AxiosError<void>,
>(
	recipeId: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getRecipe>>, TError, TData>
		> &
			Pick<
				UndefinedInitialDataOptions<
					Awaited<ReturnType<typeof getRecipe>>,
					TError,
					TData
				>,
				"initialData"
			>;
		axios?: AxiosRequestConfig;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetRecipe<
	TData = Awaited<ReturnType<typeof getRecipe>>,
	TError = AxiosError<void>,
>(
	recipeId: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getRecipe>>, TError, TData>
		>;
		axios?: AxiosRequestConfig;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary recipe
 */

export function useGetRecipe<
	TData = Awaited<ReturnType<typeof getRecipe>>,
	TError = AxiosError<void>,
>(
	recipeId: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof getRecipe>>, TError, TData>
		>;
		axios?: AxiosRequestConfig;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getGetRecipeQueryOptions(recipeId, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
