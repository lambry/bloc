import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes) => {
	const { columnsSmall, columnsMedium, columnsLarge, rowsSmall, rowsMedium, rowsLarge } = attributes;

	return classnames({
		"bloc-grid-cell": true,
		[`bloc-grid-column-sm-${columnsSmall}`]: true,
		[`bloc-grid-column-md-${columnsMedium}`]: true,
		[`bloc-grid-column-lg-${columnsLarge}`]: true,
		[`bloc-grid-row-sm-${rowsSmall}`]: true,
		[`bloc-grid-row-md-${rowsMedium}`]: true,
		[`bloc-grid-row-lg-${rowsLarge}`]: true,
	});
};
