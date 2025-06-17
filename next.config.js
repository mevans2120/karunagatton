/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure SWC for modern browsers and optimizations
  compiler: {
    // Remove console logs in production for further optimization
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize fonts and performance
  optimizeFonts: true,
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Configure 301 redirects
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/get-in-touch',
        permanent: true, // 301 redirect
      },
      {
        source: '/offerings/otherhealingservices',
        destination: '/offerings',
        permanent: true, // 301 redirect
      },
      {
        source: '/offerings/healingandempowerment',
        destination: '/offerings',
        permanent: true, // 301 redirect
      },
    ];
  },
  
  // Webpack optimizations for better bundle splitting
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable aggressive tree shaking in production
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
      
      // Split chunks more aggressively for better caching
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Enable compression
  compress: true,
}

module.exports = nextConfig
