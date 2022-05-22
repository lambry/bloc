import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { getProp } from "common/scripts/helpers";

// configure Swiper to use modules
Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

(function () {
	const sliders = document.querySelectorAll(".bloc-posts-slider");

	sliders.forEach((item, i) => {
		const { columnsSm, columnsMd, columnsLg, autoPlay, fadeSlides, loopSlides, gapless } = item.dataset;

		item.classList.add(`bloc-posts-slider-${i}`);

		new Swiper(item.querySelector('.swiper'), {
			effect: fadeSlides === '1' ? 'fade' : 'slide',
			fadeEffect: {
				crossFade: true
			},
			loop: loopSlides === 'true',
			speed: getProp(item, 'posts-duration', { integer: true }),
			spaceBetween: gapless !== '1' ? getProp(item, 'gap', { integer: true, computed: true }) : 0,
			autoplay: Number(autoPlay) ? {
				delay: autoPlay * 1000,
				pauseOnMouseEnter: true,
			} : false,
			pagination: {
				clickable: true,
				el: `.bloc-posts-slider-${i} .swiper-pagination`,
			},
			navigation: {
				nextEl: `.bloc-posts-slider-${i} .swiper-button-next`,
				prevEl: `.bloc-posts-slider-${i} .swiper-button-prev`,
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
