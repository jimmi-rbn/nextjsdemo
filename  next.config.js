module.exports = {
    poweredByHeader: false,

    reactStrictMode: true,

    experimental: {
        scrollRestoration: true,

        // https://github.com/vercel/next.js/pull/14746
        optimizeFonts: true,
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.component.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
