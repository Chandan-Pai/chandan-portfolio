/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/chandan-portfolio',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/chandan-portfolio/' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
