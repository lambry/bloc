import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { icon } from "./icons";
import attributes from "./attributes";
import variations from "./variations";
import example from "./example";
import getEditWrapperProps from "./wrapper";
import edit from "./edit";
import save from "./save";

/**
 * Register slider block.
 */
registerBlockType("bloc/slider", {
	apiVersion: 2,
	icon,
	title: __("Slider", "bloc"),
	description: __("Display content in a slider.", "bloc"),
	keywords: [__("bloc", "bloc"), __("slider", "bloc")],
	category: "layout",
	attributes,
	example,
	variations,
	supports: {
		align: true,
		anchor: true,
	},
	getEditWrapperProps,
	edit,
	save,
});
