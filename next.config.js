/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure SWC for modern browsers and optimizations
  compiler: {
    // Remove console logs in production for further optimization
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
