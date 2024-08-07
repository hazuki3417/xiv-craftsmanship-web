import {
	ApolloClient as OriginClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	QueryOptions,
	OperationVariables,
	MutationOptions,
	DocumentNode,
} from "@apollo/client";

let apollo: OriginClient<NormalizedCacheObject> | null = null;

const Client = () => {
	// TODO: env value
	const httpLink = new HttpLink({
		uri: "http://localhost:3000/api/graphql", // app router経由
	});

	const client = new OriginClient({
		ssrMode: typeof window === "undefined",
		link: httpLink,
		cache: new InMemoryCache(),
	});
	return client;
};

export const ApolloClient = (init: NormalizedCacheObject | null = null) => {
	// singleton
	const client = apollo ?? Client();

	if (init) {
		client.cache.restore({ ...client.extract(), ...init });
	}

	if (!apollo) {
		apollo = client;
	}

	if (typeof window === "undefined") {
		return client;
	}

	return client;
};
export interface Input {
	id: string;
}

/**
 * useQueryと同じI/Fで利用可能にした関数
 */
export const query = <
	T = any,
	TVariables extends OperationVariables = OperationVariables,
>(
	gql: DocumentNode,
	options?: Omit<QueryOptions<TVariables>, "query">,
) => {
	return ApolloClient().query<T, TVariables>({ query: gql, ...options });
};

/**
 * useMutationと同じI/Fで利用可能にした関数
 */
export const mutation = <
	T = any,
	TVariables extends OperationVariables = OperationVariables,
>(
	gql: DocumentNode,
	options: Omit<MutationOptions<T, TVariables>, "mutation">,
) => {
	return ApolloClient().mutate<T, TVariables>({ mutation: gql, ...options });
};

/**
 * 下記の関数で共通となる返り値の型定義
 * - query（server side fetch）
 * - useQuery（client side fetch）
 */
export interface ApolloClientResult<T> {
	loading: boolean;
	data?: T;
	error?: Error;
}

