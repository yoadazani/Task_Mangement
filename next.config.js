/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
            ignored: ['**/node_modules']
        }

        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        config.resolve.alias['handlebars'] = 'handlebars/dist/handlebars.js';

        return config;
    },
}

module.exports = nextConfig
