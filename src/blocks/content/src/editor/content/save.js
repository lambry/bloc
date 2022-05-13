import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { getClasses, getSliderAttrs } from "./helpers";

export default function Save({ attributes }) {
	const { display, pagination, navigation } = attributes;
	const blockProps = useBlockProps.save({ className: getClasses(attributes), ...getSliderAttrs(attributes) });

	if (display === "grid") {
		return <div {...useInnerBlocksProps.save(blockProps)} />;
	}

	return (
		<div {...blockProps}>
			<div className="swiper">
				<div {...useInnerBlocksProps.save({ className: 'swiper-wrapper' })} />
			</div>
			{pagination && <div className="swiper-pagination" />}
			{navigation && <>
				<button type="button" className="swiper-navigation swiper-button-prev"></button>
				<button type="button" className="swiper-navigation swiper-button-next"></button>
			</>}
		</div>
	);
}
