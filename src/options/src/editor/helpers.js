import classnames from "classnames";

/**
 * Get classes to apply.
 */
export const getClasses = (attributes, classes = "") => {
	const { shiftBlock, paddingTop, paddingRight, paddingBottom, paddingLeft, maxWidth, hideSmall, hideMedium, hideLarge, animateIn } = attributes;

	return classnames(classes, {
		[`bloc-shift-${shiftBlock}`]: shiftBlock,
		[`bloc-padding-top-${paddingTop}`]: paddingTop,
		[`bloc-padding-right-${paddingRight}`]: paddingRight,
		[`bloc-padding-bottom-${paddingBottom}`]: paddingBottom,
		[`bloc-padding-left-${paddingLeft}`]: paddingLeft,
		[`bloc-max-width-${maxWidth}`]: maxWidth,
		[`bloc-hide-sm`]: hideSmall,
		[`bloc-hide-md`]: hideMedium,
		[`bloc-hide-lg`]: hideLarge,
		[`bloc-animate-${animateIn}`]: animateIn,
	});
};
