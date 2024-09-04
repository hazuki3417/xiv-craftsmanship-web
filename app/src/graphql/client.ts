import {
	ApolloClient as OriginClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";

let apollo: OriginClient<NormalizedCacheObject> | null = null;

const Client = () => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
	const httpLink = new HttpLink({
		uri: url, // app router経由
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
