import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls, __experimentalLinkControl as LinkControl, BlockControls } from "@wordpress/block-editor";
import { PanelBody, ToolbarButton, Popover } from "@wordpress/components";
import { link, linkOff } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { ImageSelector } from "common/components";
import { getClasses, getInnerClasses } from "./helpers";

export default function Edit({ attributes, setAttributes, isSelected }) {
	const { backgroundImage, linkUrl, linkTarget } = attributes;

    const [isEditingURL, setIsEditingURL] = useState(false);

	const blockProps = useBlockProps({ className: getClasses() });
	const innerBlockProps = useInnerBlocksProps({ template: [["core/paragraph"]], className: getInnerClasses() });

    const opensInNewTab = linkTarget === "_blank";

	return <>
		<BlockControls group="block">
            <ToolbarButton
                name="link"
                icon={linkUrl ? linkOff : link}
                title={__("Link", "bloc")}
                onClick={() => setIsEditingURL(!isEditingURL)}
            />
        </BlockControls>
		{(isSelected && isEditingURL) && (
            <Popover
                position="bottom center"
                onClose={() => setIsEditingURL(false)}
                focusOnMount={isEditingURL ? "firstElement" : false}
            >
                <LinkControl
                    value={{url: linkUrl, opensInNewTab}}
                    onChange={({ url: newURL, opensInNewTab: newOpensInNewTab  }) => {
                        setAttributes({
                            linkUrl: newURL,
                            linkTarget: newOpensInNewTab ? '_blank' : undefined
                        });
                    }}
                    onRemove={() => {
                        setAttributes({
                            linkUrl: undefined,
                            linkTarget: undefined,
                        });
                        setIsEditingURL(false);
                    }}
                    forceIsEditingLink={isEditingURL}
                />
            </Popover>
        )}
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
