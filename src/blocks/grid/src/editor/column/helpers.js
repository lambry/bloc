import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes) => {
	const { columnsSmall, columnsMedium, columnsLarge, rowsSmall, rowsMedium, rowsLarge } = attributes;

	return classnames({
		"bloc-grid-column": true,
		[`bloc-grid-column-sm-${columnsSmall}`]: columnsSmall > 1,
		[`bloc-grid-column-md-${columnsMedium}`]: columnsMedium > 1,
		[`bloc-grid-column-lg-${columnsLarge}`]: columnsLarge > 1,
		[`bloc-grid-row-sm-${rowsSmall}`]: rowsSmall > 1,
		[`bloc-grid-row-md-${rowsMedium}`]: rowsMedium > 1,
		[`bloc-grid-row-lg-${rowsLarge}`]: rowsLarge > 1,
	});
};
