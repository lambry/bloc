import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import icon from "./icon";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register column block.
 */
registerBlockType("bloc/column", {
	apiVersion: 2,
	icon,
	title: __("Column", "bloc"),
	description: __("Display a single column within the grid.", "bloc"),
	keywords: [__("bloc", "bloc"), __("grid", "bloc"), __("column", "bloc")],
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
	usesContext: ["bloc/grid/large"],
	edit,
	save,
});
