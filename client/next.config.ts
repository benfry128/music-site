import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
        process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/:path*' : '/api/',
      }
    ]
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
