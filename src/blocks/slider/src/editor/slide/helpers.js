import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = () => {
	return classnames({
		"bloc-slider-slide": true,
		"swiper-slide": true
	});
};

/**
 * Get inner classes to apply.
 */
export const getInnerClasses = () => {
	return classnames({
		"bloc-slider-slide-inner": true
	});
};
