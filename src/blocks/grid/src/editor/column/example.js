import { __ } from "@wordpress/i18n";

export default {
	viewportWidth: 320,
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
};
