import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { getProp } from "common/scripts/helpers";
import "./style.scss";

// Configure Swiper modules
Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

(function () {
	const sliders = document.querySelectorAll(".bloc-content-slider");

	sliders.forEach((item, i) => {
		const { columnsSm, columnsMd, columnsLg, gapless, autoPlay, fadeSlides, loopSlides } = item.dataset;

		item.classList.add(`bloc-content-slider-${i}`);

		new Swiper(item.querySelector('.swiper'), {
			effect: fadeSlides === 'true' ? 'fade' : 'slide',
			fadeEffect: {
				crossFade: true
			},
			loop: loopSlides === 'true',
			speed: getProp(item, 'content-slider-speed'),
			spaceBetween: gapless !== 'true' ? getProp(item, 'content-slider-gap') : 0,
			autoplay: Number(autoPlay) ? {
				delay: autoPlay * 1000,
				pauseOnMouseEnter: true,
			} : false,
			pagination: {
				clickable: true,
				el: `.bloc-content-slider-${i} .swiper-pagination`,
			},
			navigation: {
				nextEl: `.bloc-content-slider-${i} .swiper-button-next`,
				prevEl: `.bloc-content-slider-${i} .swiper-button-prev`,
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
