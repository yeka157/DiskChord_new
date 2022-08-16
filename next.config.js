/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images : {
    domains : ['http://localhost:3105']
  },
}

module.exports = nextConfig
