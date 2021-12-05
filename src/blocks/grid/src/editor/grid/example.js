import { __ } from "@wordpress/i18n";

export default {
	viewportWidth: 1040,
	innerBlocks: [
		{
			name: "bloc/grid-column",
			innerBlocks: [
				{
					name: "core/heading",
					attributes: {
						content: __("Lorem ipsum", "bloc"),
					},
				},
				{
					name: "core/paragraph",
					attributes: {
						content: __("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "bloc"),
					},
				},
			],
		},
		{
			name: "bloc/grid-column",
			innerBlocks: [
				{
					name: "core/heading",
					attributes: {
						content: __("Lorem ipsum", "bloc"),
					},
				},
				{
					name: "core/paragraph",
					attributes: {
						content: __("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "bloc"),
					},
				},
			],
		},
		{
			name: "bloc/grid-column",
			innerBlocks: [
				{
					name: "core/heading",
					attributes: {
						content: __("Lorem ipsum", "bloc"),
					},
				},
				{
					name: "core/paragraph",
					attributes: {
						content: __("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "bloc"),
					},
				},
			],
		},
	],
};
