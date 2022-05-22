import { __ } from "@wordpress/i18n";
import { icon, carousel } from "./icons";

export default [
	{
		name: "slider",
		isDefault: true,
		title: __("Slider", "bloc"),
		description: __("Display content in a slider", "bloc"),
		keywords: [__("bloc", "bloc"), __("slider", "bloc")],
		icon,
	},
	{
		name: "carousel",
		isDefault: false,
		title: __("Carousel", "bloc"),
		description: __("Display content in a carousel", "bloc"),
		keywords: [__("bloc", "bloc"), __("carousel", "bloc")],
		attributes: { columnsMedium: 2, columnsLarge: 3 },
		icon: carousel,
	},
];
