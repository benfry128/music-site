import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {hostname: 'music-site-images.s3.us-east-1.amazonaws.com'}, 
      {hostname: 'i.scdn.co'}
    ],
  },
}

export default nextConfig;
