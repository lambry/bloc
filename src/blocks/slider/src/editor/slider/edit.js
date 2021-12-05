import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls, BlockControls, BlockVerticalAlignmentToolbar } from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { getClasses } from "./helpers";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { verticalAlignment, autoPlay, loopSlides, fadeSlides, navigation, pagination } = attributes;

	const blockProps = useBlockProps({ className: getClasses(attributes) });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["bloc/slider-slide"],
		template: [["bloc/slider-slide"]],
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Display", "bloc")}>
					<RangeControl
						min={0}
						max={10}
						label={__("Auto Play", "bloc")}
						value={autoPlay}
						renderTooltipContent={(value) => `${value}s`}
						onChange={(autoPlay) => setAttributes({ autoPlay })}
					/>
					<ToggleControl
						label={__("Loop slides", "bloc")}
						checked={loopSlides}
						onChange={() => setAttributes({ loopSlides: !loopSlides })}
					/>
					<ToggleControl
						label={__("Fade between slides", "bloc")}
						checked={fadeSlides}
						onChange={() => setAttributes({ fadeSlides: !fadeSlides })}
					/>
					<ToggleControl
						label={__("Show navigation", "bloc")}
						checked={navigation}
						onChange={() => setAttributes({ navigation: !navigation })}
					/>
					<ToggleControl
						label={__("Show pagination", "bloc")}
						checked={pagination}
						onChange={() => setAttributes({ pagination: !pagination })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					value={verticalAlignment}
					onChange={(verticalAlignment) => setAttributes({ verticalAlignment })}
				/>
			</BlockControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
