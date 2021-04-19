module.exports = {
    images: {
        domains: ["media.graphcms.com"],
    },
    poweredByHeader: false,

    reactStrictMode: true,

    experimental: {
        scrollRestoration: true,

        // https://github.com/vercel/next.js/pull/14746
        optimizeFonts: true,
    },

    webpack(config, options) {
        config.module.rules.push({
            test: /\.component.svg$/,
            use: ["@svgr/webpack"],
        });

        config.module.rules.push({
            test: /\.graphql$/,
            exclude: /node_modules/,
            use: [
                options.defaultLoaders.babel,
                { loader: "graphql-let/loader" },
            ],
        });

        config.module.rules.push({
            test: /\.graphqls$/,
            exclude: /node_modules/,
            use: ["graphql-let/schema/loader"],
        });

        config.module.rules.push({
            test: /\.ya?ml$/,
            type: "json",
            use: "yaml-loader",
        });

        return config;
    },
};
