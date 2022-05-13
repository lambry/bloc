import { __ } from "@wordpress/i18n";
import { grid, flipHorizontal } from "@wordpress/icons";

export default [
	{
		name: "grid",
		isDefault: true,
		title: __("Content Grid", "bloc"),
		description: __("Display content in a grid", "bloc"),
		keywords: [__("bloc", "bloc"), __("content", "bloc"), __("grid", "bloc")],
		attributes: { display: "grid" },
		icon: grid,
	},
	{
		name: "slider",
		isDefault: false,
		title: __("Content Slider", "bloc"),
		description: __("Display content in a slider", "bloc"),
		keywords: [__("bloc", "bloc"), __("content", "bloc"), __("slider", "bloc")],
		attributes: { display: "slider", columnsMedium: 1, columnsLarge: 1 },
		icon: flipHorizontal,
	},
];
