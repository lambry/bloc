import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { getProp } from "common/scripts/helpers";
import "./style.scss";

// Configure Swiper modules
Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

(function () {
	const sliders = document.querySelectorAll(".bloc-slider");

	sliders.forEach((item, i) => {
		const { columnsSm, columnsMd, columnsLg, gapless, autoPlay, fadeSlides, loopSlides } = item.dataset;

		item.classList.add(`bloc-slider-${i}`);

		new Swiper(item.querySelector('.swiper'), {
			effect: fadeSlides === 'true' ? 'fade' : 'slide',
			fadeEffect: {
				crossFade: true
			},
			loop: loopSlides === 'true',
			speed: getProp(item, 'slider-speed', { integer: true }),
			spaceBetween: gapless !== 'true' ? getProp(item, 'gap', { integer: true, computed: true }): 0,
			autoplay: Number(autoPlay) ? {
				delay: autoPlay * 1000,
				pauseOnMouseEnter: true,
			} : false,
			pagination: {
				clickable: true,
				el: `.bloc-slider-${i} .swiper-pagination`,
				bulletElement: "button",
			},
			navigation: {
				nextEl: `.bloc-slider-${i} .swiper-button-next`,
				prevEl: `.bloc-slider-${i} .swiper-button-prev`,
			},
			slidesPerView: columnsSm,
			breakpoints: {
				660: {
					slidesPerView: columnsMd,
				},
				980: {
					slidesPerView: columnsLg,
				},
			},
		});
	});
})();
