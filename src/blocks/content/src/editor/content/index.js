import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { postContent } from "@wordpress/icons";
import attributes from "./attributes";
import variations from "./variations";
import example from "./example";
import getEditWrapperProps from "./wrapper";
import edit from "./edit";
import save from "./save";

/**
 * Register content block.
 */
registerBlockType("bloc/content", {
	apiVersion: 2,
	icon: postContent,
	title: __("Content", "bloc"),
	description: __("Display content in a grid or slider.", "bloc"),
	keywords: [__("bloc", "bloc"), __("content", "bloc"), __("grid", "bloc"), __("slider", "bloc")],
	category: "layout",
	attributes,
	example,
	variations,
	supports: {
		align: true,
		anchor: true,
	},
	providesContext: {
        "bloc/content/display": "display",
    },
	getEditWrapperProps,
	edit,
	save,
});
