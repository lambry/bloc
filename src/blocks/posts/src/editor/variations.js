import { __ } from "@wordpress/i18n";
import { layout, flipHorizontal, plus } from "@wordpress/icons";

export default [
	{
		name: "grid",
		isDefault: true,
		title: __("Posts Grid", "bloc"),
		description: __("Display posts in a Grid", "bloc"),
		keywords: [__("grid", "bloc")],
		icon: layout,
		attributes: { display: "grid" },
	}, {
		name: "slider",
		isDefault: false,
		title: __("Posts Slider", "bloc"),
		description: __("Display posts in a Slider", "bloc"),
		keywords: [__("slider", "bloc")],
		icon: flipHorizontal,
		attributes: { display: "slider" },
	}, {
		name: "accordion",
		isDefault: false,
		title: __("Posts Accordion", "bloc"),
		description: __("Display posts in Accordions", "bloc"),
		keywords: [__("accordion", "bloc")],
		icon: plus,
		attributes: {
			display: "accordion",
			columnsMedium: 1,
			columnsLarge: 1,
		},
	},
];
