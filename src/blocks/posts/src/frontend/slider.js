import Swiper, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";

// configure Swiper to use modules
Swiper.use([EffectFade, Autoplay, Navigation, Pagination]);

(function () {
	const sliders = document.querySelectorAll(".bloc-posts-slider");

	const getProp = (el, name) => parseInt(getComputedStyle(el).getPropertyValue(`--bloc-posts-slider-${name}`));

	[...sliders].forEach((item, i) => {
		const { columnsSm, columnsMd, columnsLg, autoPlay, loopSlides, fadeSlides } = item.dataset;

		item.classList.add(`bloc-posts-slider-${i}`);

		new Swiper(item.querySelector('.swiper'), {
			effect: fadeSlides ? 'fade' : 'slide',
			fadeEffect: { crossFade: true },
			loop: loopSlides,
			speed: getProp(item, 'speed'),
			spaceBetween: getProp(item, 'gap'),
			autoplay: Number(autoPlay) ? {
				delay: autoPlay * 1000,
				pauseOnMouseEnter: true,
			} : false,
			pagination: {
				clickable: true,
				el: `.bloc-posts-slider-${i} .bloc-posts-slider-pagination`,
			},
			navigation: {
				nextEl: `.bloc-posts-slider-${i} .bloc-posts-slider-button-next`,
				prevEl: `.bloc-posts-slider-${i} .bloc-posts-slider-button-prev`,
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
