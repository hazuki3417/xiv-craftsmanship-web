/** @type {import('next').NextConfig} */
import { environment } from "./src/lib/environment.mjs";

const env = environment.verify();

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
            value: env.CORS_ALLOW_ORIGIN,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: env.CORS_ALLOW_METHODS,
          },
          {
            key: "Access-Control-Allow-Headers",
            value: env.CORS_ALLOW_HEADERS,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
