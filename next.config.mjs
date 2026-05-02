const isProd = process.env.NODE_ENV === 'production';
/** Must stay equal to basePath so client components resolve /public URLs on GitHub Pages. */
const basePath = isProd ? '/chandan-portfolio' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isProd ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
