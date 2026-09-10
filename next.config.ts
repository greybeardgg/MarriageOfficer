import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  outputFileTracingExcludes: {
    '*': ['node_modules/sharp/**', 'node_modules/@img/**'],
  },
};
export default nextConfig;
