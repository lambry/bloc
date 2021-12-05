import { __ } from "@wordpress/i18n";

export const displayOptions = [
	{ value: "grid", label: __("Grid", "bloc") },
	{ value: "slider", label: __("Slider", "bloc") },
	{ value: "accordion", label: __("Accordion", "bloc") },
];

export const sourceOptions = [
	{ value: "feed", label: __("Feed", "bloc") },
	{ value: "specific", label: __("Specific", "bloc") },
];

export const filterTypes = [
	{ value: "is", label: __("Is equal to", "bloc") },
	{ value: "not", label: __("Is not equal to", "bloc") },
	{ value: "lt", label: __("Is less than", "bloc") },
	{ value: "gt", label: __("Is greater than", "bloc") },
	{ value: "lte", label: __("Is less than or equal to", "bloc") },
	{ value: "gte", label: __("Is greater than or equal to", "bloc") },
];

export const orderByOptions = [
	{ value: "ID", label: __("ID", "bloc") },
	{ value: "date", label: __("Publish Date", "bloc") },
	{ value: "modified", label: __("Modified Date", "bloc") },
	{ value: "title", label: __("Title", "bloc") },
	{ value: "name", label: __("Slug", "bloc") },
	{ value: "menu_order", label: __("Menu Order", "bloc") },
	{ value: "rand", label: __("Random", "bloc") },
	{ value: "meta", label: __("Custom Field", "bloc") },
];

export const orderOptions = [
	{ value: "ASC", label: __("Ascending", "bloc") },
	{ value: "DESC", label: __("Descending", "bloc") },
];
