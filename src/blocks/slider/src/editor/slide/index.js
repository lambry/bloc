import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import icon from "./icon";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register slide block.
 */
registerBlockType("bloc/slide", {
	apiVersion: 2,
	icon,
	title: __("Slide", "bloc"),
	description: __("Displays a single slider slide.", "bloc"),
	keywords: [__("bloc", "bloc"), __("slider", "bloc"), __("slide", "bloc")],
	parent: ["bloc/slider"],
	category: "layout",
	attributes,
	example,
	supports: {
		color: {
			background: true,
			text: true,
		},
	},
	edit,
	save,
});
