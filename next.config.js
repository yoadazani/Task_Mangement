/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        // Add the alias configuration
        config.resolve.alias['handlebars'] = 'handlebars/dist/handlebars.js';

        return config;
    },
}

module.exports = nextConfig
