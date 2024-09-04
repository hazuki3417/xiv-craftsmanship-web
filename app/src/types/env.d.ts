// env.d.ts
namespace NodeJS {
	interface ProcessEnv {
		/***************************************************************************
		 * client
		 **************************************************************************/
		NEXT_PUBLIC_HOST: string;
		NEXT_PUBLIC_PORT: number;
		NEXT_PUBLIC_API_URL: string;
		NEXT_PUBLIC_API_PORT: number;

		/***************************************************************************
		 * server
		 **************************************************************************/
		HOST: string;
		PORT: number;
		API_URL: string;
		API_PORT: number;

		CORS_ALLOW_ORIGIN: string;
		CORS_ALLOW_METHODS: string;
		CORS_ALLOW_HEADERS: string;
	}
}
