import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { layout } from "@wordpress/icons";
import attributes from "./attributes.json";
import variations from "./variations";
import edit from "./edit";

/**
 * Register posts block.
 */
registerBlockType("bloc/posts", {
	icon: layout,
	title: __("Posts", "bloc"),
	description: __("Post grids, sliders and accordions.", "bloc"),
	keywords: [__("bloc", "bloc"), __("posts", "bloc")],
	category: "widgets",
	attributes,
	variations,
	supports: {
		align: true,
		html: false,
		anchor: true,
	},
	edit,
	save: () => null,
});
