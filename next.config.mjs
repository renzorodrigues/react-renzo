/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', '@chakra-ui/icons', '@chakra-ui/system'],
  },
}

export default nextConfig 