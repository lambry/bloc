import { useEffect, useState } from "@wordpress/element";
import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { getProp } from "common/scripts/helpers";

Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

/**
 * Set a swipper slider.
 */
export default function useSlider(ref, attributes, name) {
	const [slider, setSlider] = useState(null);

	// Setup initial slider
	useEffect(() => {
		ref && initSlider(attributes);

		return () => removeSlider();
	}, []);

	// Init the slider
	const initSlider = (attributes) => {
		if (slider) return updateSlider(attributes);

		const target = ref.current.querySelector(".swiper");

		if (target) {
			setSlider(new Swiper(target, getOptions(attributes)));
		}
	};

	// Update the slider
	const updateSlider = (attributes, index = null) => {
		if (! slider) return initSlider(attributes);

		const { pagination, navigation, ...params} = getOptions(attributes);

		for (const param in params) {
			slider.params[param] = params[param];
		}

		slider.currentBreakpoint = false;

		slider.update();

		if (index) slider.slideTo(index);
	};

	// Remove the slider
	const removeSlider = () => {
		setSlider(null);

		if (slider) {
			slider.destroy();
		}
	};

	// Get all slider options
	const getOptions = ({ columnsSmall, columnsMedium, columnsLarge, gapless }) => ({
		speed: getProp(ref.current, `${name}-duration`, { integer: true }),
		spaceBetween: gapless ? 0 : getProp(ref.current, 'gap', { integer: true, computed: true }),
		pagination: {
			clickable: true,
			el: `#${ref.current.id} .swiper-pagination`,
			bulletElement: "button",
		},
		navigation: {
			nextEl: `#${ref.current.id} .swiper-button-next`,
			prevEl: `#${ref.current.id} .swiper-button-prev`,
		},
		slidesPerView: columnsSmall,
		breakpoints: {
			660: {
				slidesPerView: columnsMedium,
			},
			980: {
				slidesPerView: columnsLarge,
			},
		}
	});

	return { initSlider, updateSlider, removeSlider };
}
