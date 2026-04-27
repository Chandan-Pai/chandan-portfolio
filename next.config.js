/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/chandan-portfolio',
  assetPrefix: '/chandan-portfolio/',
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;