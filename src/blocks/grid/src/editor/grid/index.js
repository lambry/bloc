import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import icon from "./icon";
import attributes from "./attributes";
import example from "./example";
import edit from "./edit";
import save from "./save";

/**
 * Register grid block.
 */
registerBlockType("bloc/grid", {
	apiVersion: 2,
	icon,
	title: __("Grid", "bloc"),
	description: __("Displays a grid of columns.", "bloc"),
	keywords: [__("bloc", "bloc"), __("grid", "bloc")],
	category: "layout",
	attributes,
	example,
	supports: {
		align: true,
		anchor: true,
	},
	providesContext: {
        "bloc/grid/small": "columnsSmall",
        "bloc/grid/medium": "columnsMedium",
        "bloc/grid/large": "columnsLarge",
    },
	edit,
	save,
});
