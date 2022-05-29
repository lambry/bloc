import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes) => {
	const { gapless, columnsSmall, columnsMedium, columnsLarge } = attributes;

	return classnames({
		"bloc-slider": true,
		[`bloc-slider-gap`]: !gapless,
		[`bloc-slider-sm-${columnsSmall}`]: columnsSmall,
		[`bloc-slider-md-${columnsMedium}`]: columnsMedium,
		[`bloc-slider-lg-${columnsLarge}`]: columnsLarge,
	});
};

/**
 * Get data attributes to add.
 */
 export function getAttributes(attributes = {}) {
	const { columnsSmall, columnsMedium, columnsLarge, autoPlay, gapless, fadeSlides, loopSlides, navigation, pagination } = attributes;

	return {
		"data-columns-sm": columnsSmall,
		"data-columns-md": columnsMedium,
		"data-columns-lg": columnsLarge,
		"data-auto-play": autoPlay,
		"data-gapless": gapless,
		"data-fade-slides": fadeSlides,
		"data-loop-slides": loopSlides,
		"data-navigation": navigation,
		"data-pagination": pagination,
	};
}
