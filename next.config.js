/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/chandan-portfolio',
  assetPrefix: '/chandan-portfolio/', // Add this line (with trailing slash)
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
