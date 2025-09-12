/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,       // Enables React Strict Mode
  swcMinify: true,             // Faster minification with SWC
  experimental: {
    appDir: true,              // Enables the new App Router
  },
  compiler: {
    // Enables styled-components or other compiler options if needed
    // styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,  // Prevent ESLint from blocking production builds
  },
};

module.exports = nextConfig;
