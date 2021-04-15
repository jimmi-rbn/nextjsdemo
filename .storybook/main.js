const path = require("path");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = {
    features: {
        postcss: false,
    },
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
        "@storybook/addon-viewport",
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
    webpackFinal: (config) => {
        // Instead of manually configuring path resolutions for Storybooks TS config, load and use those defined from next's TS config
        config.resolve.plugins = [
            ...config.resolve.plugins,
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, "../tsconfig.json"),
            }),
        ];

        // SVGR for SVGs as React Components
        config.module.rules.find((rule) => rule.test.test(".svg")).exclude = [
            /\.component.svg$/,
        ];
        config.module.rules.push({
            test: /\.component.svg$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        titleProp: true,
                        icon: true,
                        ref: true,
                    },
                },
            ],
        });

        return config;
    },
};
