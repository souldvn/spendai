/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"], // Позволяет импортировать SVG как компоненты
      });
      return config;
    },
  };
  
  module.exports = nextConfig;
  