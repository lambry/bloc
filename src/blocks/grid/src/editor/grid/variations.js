import { __ } from "@wordpress/i18n";
import { grid, flipHorizontal } from "@wordpress/icons";

export default [
	{
		name: "columns",
		isDefault: true,
		title: __("Grid Columns", "bloc"),
		description: __("Display columns in a Grid", "bloc"),
		keywords: [__("columns", "bloc")],
		icon: grid,
		attributes: { display: "columns" },
	},
	{
		name: "slider",
		isDefault: false,
		title: __("Grid Slider", "bloc"),
		description: __("Display columns in a Slider", "bloc"),
		keywords: [__("slider", "bloc")],
		icon: flipHorizontal,
		attributes: { display: "slider" },
	},
];
