import { useEffect, useState } from "@wordpress/element";
import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { getProp } from "common/scripts/helpers";

Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

/**
 * Set a swipper slider.
 */
export default function useSlider(ref, options = {}) {
	const [slider, setSlider] = useState(null);

	// Setup initial slider
	useEffect(() => {
		return () => removeSlider();
	}, []);

	// Init the slider
	const initSlider = (attributes) => {
		if (slider) return updateSlider(attributes);

		const target = ref.current.querySelector(".swiper");
		const wrapper = options.wrapper ? ref.current.querySelector(`.bloc-${options.name}`) : ref.current;

		if (target && wrapper) {
			setSlider(new Swiper(target, getOptions(attributes, wrapper)));
		}
	};

	// Update the slider
	const updateSlider = (attributes, index = null) => {
		if (! slider) return initSlider(attributes);

		const wrapper = options.wrapper ? ref.current.querySelector(`.bloc-${options.name}`) : ref.current;

		const { pagination, navigation, ...params} = getOptions(attributes, wrapper);

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
	const getOptions = ({ columnsSmall, columnsMedium, columnsLarge, gapless }, wrapper) => ({
		speed: getProp(wrapper, `${options.name}-speed`, { integer: true }),
		spaceBetween: gapless ? 0 : getProp(wrapper, 'gap', { integer: true, computed: true }),
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
