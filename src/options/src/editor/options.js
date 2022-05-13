import { __ } from "@wordpress/i18n";
import { arrowUp, arrowDown } from "@wordpress/icons";

/**
 * Default blocks supporting sizes.
 */
 export const supportsOptions = [
	"bloc/content",
	"bloc/content-cell",
	"core/group",
	"core/columns",
	"core/column",
	"core/cover",
	"core/image",
	"core/gallery",
	"core/video",
	"core/file",
	"core/media-text",
	"core/heading",
	"core/paragraph",
	"core/pull-quote",
	"core/quote",
	"core/list",
	"core/table",
];

/**
 * Default size options.
 */
export const sizes = [
	{ label: __("-", "bloc"), title: __("None", "bloc"), value: "" },
	{ label: __("sm", "bloc"), title: __("Small", "bloc"), value: "sm" },
	{ label: __("md", "bloc"), title: __("Medium", "bloc"), value: "md" },
	{ label: __("lg", "bloc"), title: __("Large", "bloc"), value: "lg" },
];

/**
 * Shift block options.
 */
export const shift = {
	up: { icon: arrowUp, title: __("Shift up", "bloc") },
	down: { icon: arrowDown, title: __("Shift down", "bloc") },
};

/**
 * Default animation options.
 */
export const animations = [
	{ label: __("None", "bloc"), value: "" },
	{ label: __("Fade in", "bloc"), value: "fade-in" },
	{ label: __("Fade up", "bloc"), value: "fade-up" },
	{ label: __("Fade down", "bloc"), value: "fade-down" },
	{ label: __("Fade left", "bloc"), value: "fade-left" },
	{ label: __("Fade right", "bloc"), value: "fade-right" },
];
