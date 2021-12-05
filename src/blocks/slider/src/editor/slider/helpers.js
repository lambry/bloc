import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes) => {
	const { verticalAlignment } = attributes;

	return classnames({
		"bloc-slider": true,
		[`bloc-slider-align-${verticalAlignment}`]: verticalAlignment,
	});
};
