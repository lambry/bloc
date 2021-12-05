import { addFilter } from "@wordpress/hooks";
import attributes from "./attributes";
import { supportsOptions } from "./options";

/**
 * Add extra options.
 */
addFilter("blocks.registerBlockType", "bloc/options", (settings, name) => {
	if (!supportsOptions.includes(name)) {
		return settings;
	}

	return { ...settings, attributes: { ...settings.attributes, ...attributes } };
});
