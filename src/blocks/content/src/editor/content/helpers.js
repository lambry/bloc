import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes) => {
	const { display, gapless, verticalAlignment, columnsSmall, columnsMedium, columnsLarge } = attributes;

	return classnames({
		"bloc-content": true,
		[`bloc-content-${display}`]: display,
		[`bloc-content-${display}-gap`]: !gapless,
		[`bloc-content-sm-${columnsSmall}`]: columnsSmall,
		[`bloc-content-md-${columnsMedium}`]: columnsMedium,
		[`bloc-content-lg-${columnsLarge}`]: columnsLarge,
		[`bloc-content-align-${verticalAlignment}`]: verticalAlignment,
	});
};

/**
 * Get data attributes to add for sliders.
 */
 export function getSliderAttrs(attributes = {}) {
	const { display, columnsSmall, columnsMedium, columnsLarge, autoPlay, gapless, fadeSlides, loopSlides, navigation, pagination } = attributes;

	return display === 'slider' ? {
		"data-columns-sm": columnsSmall,
		"data-columns-md": columnsMedium,
		"data-columns-lg": columnsLarge,
		"data-auto-play": autoPlay,
		"data-gapless": gapless,
		"data-fade-slides": fadeSlides,
		"data-loop-slides": loopSlides,
		"data-navigation": navigation,
		"data-pagination": pagination,
	} : {};
}
