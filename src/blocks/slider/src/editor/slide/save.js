import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { getClasses, getInnerClasses } from "./helpers";

export default function Save({ attributes }) {
	const { backgroundImage, linkUrl, linkTarget } = attributes;

	const blockProps = useBlockProps.save({ className: getClasses() });
	const innerBlockProps = useInnerBlocksProps.save({ className: getInnerClasses() });

	return (
		<div {...blockProps}>
			{backgroundImage?.url && <img
				src={backgroundImage.url}
				alt={backgroundImage.alt}
				className="bloc-slider-background-image" />}
			{linkUrl && <a
				href={linkUrl}
				target={linkTarget}
				className="bloc-slider-link"
				aria-label={__("View", "bloc") + ' ' + linkUrl} />}
			<div {...innerBlockProps} />
		</div>
	);
}
