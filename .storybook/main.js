const path = require("path");

module.exports = {
    stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-addon-apollo-client",
    ],
    webpackFinal: async (config) => {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            path.resolve(__dirname, "../"),
        ];

        return config;
    },
};
