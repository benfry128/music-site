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
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [{hostname: 'music-site-images.s3.us-east-1.amazonaws.com'}],
  },
}

export default nextConfig;
