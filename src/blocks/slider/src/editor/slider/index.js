import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { flipHorizontal } from "@wordpress/icons";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";
import getEditWrapperProps from "./wrapper";

/**
 * Register slider block.
 */
registerBlockType("bloc/slider", {
	apiVersion: 2,
	icon: flipHorizontal,
	title: __("Slider", "bloc"),
	description: __("Display a slider.", "bloc"),
	keywords: [__("bloc", "bloc"), __("slider", "bloc")],
	category: "layout",
	attributes,
	example,
	supports: {
		align: true,
		anchor: true,
	},
	getEditWrapperProps,
	edit,
	save,
});
