/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        default: false,
        vendors: false,

        // Your custom chunk configuration
        myCustomChunk: {
          test: /[\\/]node_modules[\\/]/,
          name: "my-custom-chunk",
          chunks: "all",
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
