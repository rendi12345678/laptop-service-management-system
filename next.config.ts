import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/admin/:path*",
        destination: "/admin/dashboard",
        permanent: false,
      },
      {
        source: "/worker/:path*",
        destination: "/worker/my-tasks",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
