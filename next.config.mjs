/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,
 devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  

};

export default nextConfig;
