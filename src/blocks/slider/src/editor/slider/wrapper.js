export default function getEditWrapperProps(attributes) {
	const { autoPlay, loopSlides, fadeSlides } = attributes;

	return {
		'data-auto-play': autoPlay,
		'data-loop-slides': loopSlides,
		'data-fade-slides': fadeSlides,
	};
}
