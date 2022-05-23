import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import icon from "./icon";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register cell block.
 */
registerBlockType("bloc/cell", {
	apiVersion: 2,
	icon,
	title: __("Cell", "bloc"),
	description: __("Display a single cell within the grid.", "bloc"),
	keywords: [__("bloc", "bloc"), __("grid", "bloc"), __("cell", "bloc")],
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
	usesContext: ["bloc/grid/small", "bloc/grid/medium", "bloc/grid/large"],
	edit,
	save,
});
