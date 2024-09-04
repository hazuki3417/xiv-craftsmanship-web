// env.d.ts
namespace NodeJS {
	interface ProcessEnv {
		/***************************************************************************
		 * client
		 **************************************************************************/
		NEXT_PUBLIC_API_URL: string;
		NEXT_PUBLIC_HOST_URL: string;

		/***************************************************************************
		 * server
		 **************************************************************************/
		API_URL: string;
		HOST_URL: string;

		CORS_ALLOW_HEADERS: string;
		CORS_ALLOW_METHODS: string;
		CORS_ALLOW_ORIGIN: string;
	}
}
