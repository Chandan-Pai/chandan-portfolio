const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/chandan-portfolio' : '',
  assetPrefix: isProd ? '/chandan-portfolio/' : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/chandan-portfolio' : '',
  },
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
