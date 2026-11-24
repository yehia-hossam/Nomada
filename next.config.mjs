/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // If you load photos from a CDN, whitelist it here and use <img> or next/image.
  images: { remotePatterns: [] },
};
export default nextConfig;
