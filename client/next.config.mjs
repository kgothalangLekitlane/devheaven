/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed for dynamic build on Vercel

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // required for static export
  },
  experimental: {
    // Disable problematic features that might cause fetch issues
    serverComponentsExternalPackages: [],
  },
  // Disable automatic static optimization to prevent prefetch issues
  trailingSlash: false,
  // Add headers to prevent caching issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
}

export default nextConfig;
