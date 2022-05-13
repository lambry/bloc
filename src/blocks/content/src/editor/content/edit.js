import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls, BlockControls, BlockVerticalAlignmentToolbar } from "@wordpress/block-editor";
import { PanelBody, SelectControl, RangeControl, ToggleControl } from "@wordpress/components";
import { useRef, useEffect } from '@wordpress/element';
import Breakpoints from "common/components/breakpoints";
import useSlider from "common/hooks/use-slider";
import { getClasses, getSliderAttrs } from "./helpers";
import { displayOptions } from "./options";


import "./editor.scss";


export default function Edit({ attributes, setAttributes }) {
	const { verticalAlignment, display, columnsSmall, columnsMedium, columnsLarge, gapless, autoPlay, fadeSlides, loopSlides, navigation, pagination } = attributes;



	const sliderRef = useRef();
	const [update, remove] = useSlider(sliderRef, attributes);

	useEffect(() => {
		return display === 'slider' ? update(attributes) : remove();
	}, [display, columnsSmall, columnsMedium, columnsLarge, gapless, navigation, pagination]);




	const blockProps = useBlockProps({ className: getClasses(attributes), ...getSliderAttrs(attributes) });

	const innerProps = {
		allowedBlocks: ["bloc/content-cell"],
		template: Array(columnsLarge).fill(["bloc/content-cell"])
	};

	const innerBlocksProps = useInnerBlocksProps(blockProps, innerProps);
	const innerBlockProps = useInnerBlocksProps({ className: 'swiper-wrapper' }, innerProps)

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Display", "bloc")}>
					<SelectControl
						label={__("Type", "bloc")}
						value={display}
						options={displayOptions}
						onChange={(display) => setAttributes({ display })}
					/>
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
					{display === "slider" && <>
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
					</>}
					<ToggleControl
						label={__("Remove cell gap", "bloc")}
						checked={gapless}
						onChange={() => setAttributes({ gapless: !gapless })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					value={verticalAlignment}
					onChange={(verticalAlignment) => setAttributes({ verticalAlignment })}
				/>
			</BlockControls>
			{display === 'grid' ? <div { ...innerBlocksProps } /> : <div {...blockProps} ref={sliderRef}>
				<div className="swiper">
					<div {...innerBlockProps} />
				</div>
				<div className="swiper-pagination" />
				<button type="button" className="swiper-navigation swiper-button-prev"></button>
				<button type="button" className="swiper-navigation swiper-button-next"></button>
			</div>}
		</>
	);
}
