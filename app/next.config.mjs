/** @type {import('next').NextConfig} */

/**
 * NOTE: ここだけprocess.envの型推論が効かないので注意
 */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.CORS_ALLOW_ORIGIN,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: process.env.CORS_ALLOW_METHODS,
          },
          {
            key: "Access-Control-Allow-Headers",
            value: process.env.CORS_ALLOW_HEADERS,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
