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
            value: process.env.NEXT_PUBLIC_HOST_URL,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,POST,PUT,DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:8080/:path*`,
      },
    ];
  },
};

export default nextConfig;
