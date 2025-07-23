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
}

export default nextConfig;
