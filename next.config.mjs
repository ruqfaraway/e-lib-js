/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/uploads/:path*", // Adjust this path based on your project structure
      },
    ];
  },
};

export default nextConfig;
