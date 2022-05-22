import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes) => {
	const { gapless, verticalAlignment, columnsSmall, columnsMedium, columnsLarge } = attributes;

	return classnames({
		"bloc-grid": true,
		[`bloc-grid-gap`]: !gapless,
		[`bloc-grid-sm-${columnsSmall}`]: columnsSmall,
		[`bloc-grid-md-${columnsMedium}`]: columnsMedium,
		[`bloc-grid-lg-${columnsLarge}`]: columnsLarge,
		[`bloc-align-${verticalAlignment}`]: verticalAlignment,
	});
};
