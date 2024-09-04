/**
 * NOTE: next.config.mjsで読み込みむためにjsで実装
 *       process.envの型定義と値検証するためのスキーマ定義は共通化できない。
 *       そのため環境変数の参照はenv.verify()の返り値を使うように統一する。
 */
import { z } from "zod";

export const schema = z.object({
	CORS_ALLOW_ORIGIN: z.string(),
	CORS_ALLOW_METHODS: z.string(),
	CORS_ALLOW_HEADERS: z.string(),
});

export const environment = {
	verify: () => {
		try {
			return schema.parse(process.env);
		} catch (error) {
			console.error(
				"The environment variable is incorrectly defined.",
				JSON.stringify(error.errors, null, 2),
			);
			process.exit(1); // 終了ステータス1で終了
		}
	},
};
