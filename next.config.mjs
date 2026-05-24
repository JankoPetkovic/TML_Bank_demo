/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  output: 'export',

  basePath: '/demo',
  assetPrefix: '/demo',

  trailingSlash: true,
}

export default nextConfig