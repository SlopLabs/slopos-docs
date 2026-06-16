import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Docs moved from `/` to `/docs`; keep old top-level deep links working.
    return [
      'getting-started',
      'architecture',
      'abi',
      'development',
      'verification',
      'status',
    ].map((section) => ({
      source: `/${section}/:path*`,
      destination: `/docs/${section}/:path*`,
      permanent: true,
    })).concat([
      { source: '/quickstart', destination: '/docs/quickstart', permanent: true },
    ]);
  },
};

export default withMDX(nextConfig);
