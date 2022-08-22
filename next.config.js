/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["yts.torrentbay.to"],
  },
  experimental: {
    scrollRestoration: true,
  },


};

module.exports = nextConfig;
