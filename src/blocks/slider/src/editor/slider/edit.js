import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { useRef, useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { useSelect, dispatch } from '@wordpress/data';
import { Breakpoints } from "common/components";
import { useSlider } from "common/hooks";
import { getClasses, getAttributes } from "./helpers";

import "./editor.scss";

export default function Edit({ attributes, setAttributes, isSelected, clientId }) {
	const { columnsSmall, columnsMedium, columnsLarge, gapless, autoPlay, fadeSlides, loopSlides, navigation, pagination } = attributes;

	const sliderRef = useRef();
	const { initSlider, updateSlider } = useSlider(sliderRef, { name: 'slider' });
	const innerBlockCount = useSelect(select => select('core/block-editor').getBlock(clientId).innerBlocks.length);

	const blockProps = useBlockProps({
		ref: sliderRef,
		...getAttributes(attributes),
		className: getClasses(attributes)
	});

	const innerBlocksProps = useInnerBlocksProps({ className: 'swiper-wrapper' }, {
		renderAppender: false,
		allowedBlocks: ["bloc/slide"],
		template: Array(columnsLarge).fill(["bloc/slide"])
	});

	// Init and update slider
	useEffect(() => initSlider(attributes), []);

	useEffect(() => {
		updateSlider(attributes);
	}, [innerBlockCount, columnsSmall, columnsMedium, columnsLarge, gapless, navigation, pagination]);

	// Add new slides and scroll into view
	const addSlide = () => {
		const index = innerBlockCount + 1;

		dispatch("core/editor").insertBlocks(createBlock("bloc/slide"), index, clientId);
		updateSlider(attributes, index);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Display", "bloc")}>
					<Breakpoints render={breakpoint => <>
						{breakpoint === "small" && (
							<RangeControl
								min={1}
								max={6}
								label={__("Columns", "bloc")}
								value={columnsSmall}
								onChange={(columnsSmall) => setAttributes({ columnsSmall })}
							/>
						)}
						{breakpoint === "medium" && (
							<RangeControl
								min={1}
								max={6}
								label={__("Columns", "bloc")}
								value={columnsMedium}
								onChange={(columnsMedium) => setAttributes({ columnsMedium })}
							/>
						)}
						{breakpoint === "large" && (
							<RangeControl
								min={1}
								max={6}
								label={__("Columns", "bloc")}
								value={columnsLarge}
								onChange={(columnsLarge) => setAttributes({ columnsLarge })}
							/>
						)}
					</>} />
					<RangeControl
						min={0}
						max={10}
						label={__("Auto Play", "bloc")}
						value={autoPlay}
						renderTooltipContent={(value) => `${value}s`}
						onChange={(autoPlay) => setAttributes({ autoPlay })}
					/>
					<ToggleControl
						label={__("Fade slides", "bloc")}
						checked={fadeSlides}
						onChange={() => setAttributes({ fadeSlides: !fadeSlides })}
					/>
					<ToggleControl
						label={__("Loop slides", "bloc")}
						checked={loopSlides}
						onChange={() => setAttributes({ loopSlides: !loopSlides })}
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
					<ToggleControl
						label={__("Remove slide gap", "bloc")}
						checked={gapless}
						onChange={() => setAttributes({ gapless: !gapless })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="swiper">
					<div {...innerBlocksProps} />
				</div>
				<div className="swiper-pagination" />
				<button type="button" className="swiper-navigation swiper-button-prev"></button>
				<button type="button" className="swiper-navigation swiper-button-next"></button>
				{isSelected && <button className="appender" type="button" onClick={addSlide}>{__("Add slide", "bloc")}</button>}
			</div>
		</>
	);
}
