import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";

// configure Swiper to use modules
Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

(function () {
	const sliders = document.querySelectorAll(".bloc-posts-slider");

	const getProp = (el, name) => parseInt(getComputedStyle(el).getPropertyValue(`--bloc-posts-slider-${name}`));

	sliders.forEach((item, i) => {
		const { columnsSm, columnsMd, columnsLg, autoPlay, fadeSlides, loopSlides } = item.dataset;

		item.classList.add(`bloc-posts-slider-${i}`);

		new Swiper(item.querySelector('.swiper'), {
			effect: fadeSlides === '1' ? 'fade' : 'slide',
			fadeEffect: {
				crossFade: true
			},
			loop: loopSlides === 'true',
			speed: getProp(item, 'speed'),
			spaceBetween: getProp(item, 'gap'),
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
