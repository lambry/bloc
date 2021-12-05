import { addFilter } from "@wordpress/hooks";
import { getClasses } from "./helpers";

/**
 * Add a new properties i.e. classes to the props object.
 */
addFilter("blocks.getSaveContent.extraProps", "bloc/options", (props, block, attributes) => {
	const classes = getClasses(attributes, props.className);

	if (classes) {
		return { ...props, className: classes };
	}

	return props;
});
