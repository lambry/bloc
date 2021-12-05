import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { grid } from "@wordpress/icons";
import attributes from "./attributes";
import variations from "./variations";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register grid block.
 */
registerBlockType("bloc/grid", {
	apiVersion: 2,
	icon: grid,
	title: __("Grid", "bloc"),
	description: __("Display a grid of columns.", "bloc"),
	keywords: [__("bloc", "bloc"), __("grid", "bloc")],
	category: "layout",
	attributes,
	example,
	variations,
	supports: {
		align: true,
		anchor: true,
	},
	edit,
	save,
});
