const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

/**
 * Extend the default webpack config with aliases.
 */
module.exports = {
	...defaultConfig,

	resolve: {
		alias: {
			common: path.resolve(__dirname, "src/common/"),
			options: path.resolve(__dirname, "src/options/"),
			blocks: path.resolve(__dirname, "src/blocks/"),
		},
	},
};
