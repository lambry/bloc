import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { ImageSelector } from "common/components";
import { getClasses, getInnerClasses } from "./helpers";

export default function Edit({ attributes, setAttributes }) {
	const { backgroundImage } = attributes;

	const blockProps = useBlockProps({ className: getClasses() });
	const innerBlockProps = useInnerBlocksProps({ template: [["core/paragraph"]], className: getInnerClasses() });

	return <>
		<InspectorControls>
			<PanelBody title={__("Display", "bloc")}>
				<ImageSelector
					title={__("Select Background Image", "bloc")}
					image={backgroundImage}
					setImage={(image) => setAttributes({ backgroundImage: { ...image } })}
				/>
			</PanelBody>
		</InspectorControls>
		<div {...blockProps}>
			{backgroundImage?.url && <img src={backgroundImage.url} alt={backgroundImage.alt} className="bloc-slider-background-image" />}
			<div {...innerBlockProps} />
		</div>
	</>;
}
