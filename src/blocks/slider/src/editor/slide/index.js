import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { columns } from "@wordpress/icons";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register slider slide block.
 */
registerBlockType("bloc/slider-slide", {
	apiVersion: 2,
	icon: columns,
	title: __("Slide", "grid"),
	description: __("Display a sliders slide.", "grid"),
	keywords: [__("bloc", "grid"), __("slide", "grid")],
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
