import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (data) => {
	const display = data.display || data["bloc/content/display"]

	return classnames({
		"bloc-content-cell": true,
		"swiper-slide": display === "slider"
	});
};
