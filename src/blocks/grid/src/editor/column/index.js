import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { columns } from "@wordpress/icons";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register grid column block.
 */
registerBlockType("bloc/grid-column", {
	apiVersion: 2,
	icon: columns,
	title: __("Column", "grid"),
	description: __("Display a column with a grid.", "grid"),
	keywords: [__("bloc", "grid"), __("column", "grid")],
	parent: ["bloc/grid"],
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
