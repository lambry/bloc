import { __ } from "@wordpress/i18n";
import { grid, slider, accordion } from "./icons";

export default [
	{
		name: "grid",
		icon: grid,
		isDefault: true,
		title: __("Posts Grid", "bloc"),
		description: __("Display posts in a Grid", "bloc"),
		keywords: [__("grid", "bloc")],
		attributes: { display: "grid" },
	}, {
		name: "slider",
		icon: slider,
		isDefault: false,
		title: __("Posts Slider", "bloc"),
		description: __("Display posts in a Slider", "bloc"),
		keywords: [__("slider", "bloc")],
		attributes: { display: "slider" },
	}, {
		name: "accordion",
		icon: accordion,
		isDefault: false,
		title: __("Posts Accordion", "bloc"),
		description: __("Display posts in Accordions", "bloc"),
		keywords: [__("accordion", "bloc")],
		attributes: {
			display: "accordion",
			columnsMedium: 1,
			columnsLarge: 1,
		},
	},
];
