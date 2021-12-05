import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes) => {
	const { display, gapless, verticalAlignment, columnsSmall, columnsMedium, columnsLarge } = attributes;

	return classnames({
		"bloc-grid": true,
		[`bloc-grid-${display}`]: display,
		[`bloc-grid-${display}-gap`]: !gapless,
		[`bloc-grid-columns-sm-${columnsSmall}`]: columnsSmall,
		[`bloc-grid-columns-md-${columnsMedium}`]: columnsMedium,
		[`bloc-grid-columns-lg-${columnsLarge}`]: columnsLarge,
		[`bloc-grid-align-${verticalAlignment}`]: verticalAlignment,
	});
};
