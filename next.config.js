/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/diagnose/:path*',
        destination: 'http://localhost:8000/:path*', // Proxy to your diagnostic API
      },
    ];
  },
  experimental: {
    // Enable server components to use path mapping
    serverComponentsExternalPackages: ['jsonwebtoken', 'bcryptjs', 'mysql2'],
  },
  // Handle Node.js modules in browser
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        util: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
