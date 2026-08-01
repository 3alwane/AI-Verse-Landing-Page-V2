import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Removed experimental.mdxRs to stop the "use with caution" warning
  experimental: { optimizePackageImports: ["react-icons"] },

  // 2. Updated to standard extensions (removed md/mdx)
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "storage.ko-fi.com", pathname: "/**" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "rp6xarqm2o.ufs.sh" },
    ],
  },

  turbopack: {},

  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization = { ...config.optimization, minimize: true };
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
