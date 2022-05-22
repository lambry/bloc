import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { getClasses, getInnerClasses } from "./helpers";

export default function Save({ attributes }) {
	const { backgroundImage } = attributes;

	const blockProps = useBlockProps.save({ className: getClasses() });
	const innerBlockProps = useInnerBlocksProps.save({ className: getInnerClasses() });

	return (
		<div {...blockProps}>
			{backgroundImage?.url && <img src={backgroundImage.url} alt={backgroundImage.alt} className="bloc-slider-background-image" />}
			<div {...innerBlockProps} />
		</div>
	);
}
