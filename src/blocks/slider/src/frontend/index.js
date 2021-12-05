import Swiper, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import "./style.scss";

// configure Swiper to use modules
Swiper.use([EffectFade, Autoplay, Navigation, Pagination]);

(function () {
	const sliders = document.querySelectorAll(".bloc-slider");

	const getProp = (el, name) => parseInt(getComputedStyle(el).getPropertyValue(`--bloc-slider-${name}`));

	[...sliders].forEach((item, i) => {
		const { autoPlay, loopSlides, fadeSlides } = item.dataset;

		item.classList.add(`bloc-slider-${i}`);

		new Swiper(item.querySelector('.swiper'), {
			effect: fadeSlides ? 'fade' : 'slide',
			fadeEffect: { crossFade: true },
			loop: loopSlides,
			speed: getProp(item, 'transition-duration'),
			spaceBetween: getProp(item, 'gap'),
			autoplay: Number(autoPlay) ? {
				delay: autoPlay * 1000,
				pauseOnMouseEnter: true,
			} : false,
			pagination: {
				clickable: true,
				el: `.bloc-slider-${i} .bloc-slider-pagination`,
			},
			navigation: {
				nextEl: `.bloc-slider-${i} .bloc-slider-button-next`,
				prevEl: `.bloc-slider-${i} .bloc-slider-button-prev`,
			},
			slidesPerView: 1,
		});
	});
})();
