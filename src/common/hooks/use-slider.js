import { useEffect, useState } from "@wordpress/element";
import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { getProp } from "common/scripts/helpers";

Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

export default function useSlider(ref, attributes) {
	const { display } = attributes;
	const [slider, setSlider] = useState(null);

	// Setup initial slider
	useEffect(() => {
		if (display === 'slider' && ref) {
			initSlider(attributes);
		}

		return () => removeSlider();
	}, []);

	// Init the slider
	const initSlider = (attributes) => {
		setSlider(
			new Swiper(ref.current.querySelector(".swiper"), getOptions(attributes))
		);
	};

	// Update the slider
	const updateSlider = (attributes) => {
		if (! slider) return initSlider(attributes);

		const { pagination, navigation, ...params} = getOptions(attributes);

		for (const param in params) {
			slider.params[param] = params[param];
		}

		slider.currentBreakpoint = false;

		slider.update();
	};

	// Remove the slider
	const removeSlider = () => {
		return slider ? slider.destroy() : null;
	};

	// Get all slider options
	const getOptions = ({ columnsSmall, columnsMedium, columnsLarge, gapless }) => ({
		spaceBetween: gapless ? 0 : getProp(ref.current, "content-slider-gap"),
		pagination: {
			clickable: true,
			el: `#${ref.current.id} .swiper-pagination`,
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

	return [updateSlider, removeSlider];
}
