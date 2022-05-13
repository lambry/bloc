import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { columns } from "@wordpress/icons";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register content cell block.
 */
registerBlockType("bloc/content-cell", {
	apiVersion: 2,
	icon: columns,
	title: __("Cell", "bloc"),
	description: __("Display a cell within content.", "bloc"),
	keywords: [__("bloc", "bloc"), __("cell", "bloc")],
	parent: ["bloc/content"],
	category: "layout",
	attributes,
	example,
	supports: {
		color: {
			background: true,
			text: true,
		},
	},
	usesContext: ["bloc/content/display"],
	edit,
	save,
});
