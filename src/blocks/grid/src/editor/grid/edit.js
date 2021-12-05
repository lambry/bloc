import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls, BlockControls, BlockVerticalAlignmentToolbar } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { PanelBody, SelectControl, RangeControl, ToggleControl } from "@wordpress/components";
import Breakpoints from "common/breakpoints";
import { getClasses } from "./helpers";
import { displayOptions } from "./options";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { verticalAlignment, display, columnsSmall, columnsMedium, columnsLarge, gapless, autoPlay, loopSlides, fadeSlides, navigation, pagination } = attributes;

	let [column, showColumn] = useState("large");

	const blockProps = useBlockProps({ className: getClasses(attributes) });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["bloc/grid-column"],
		template: [["bloc/grid-column"], ["bloc/grid-column"], ["bloc/grid-column"]],
	});

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
					{display !== 'slider' && <ToggleControl
						label={__("Remove space between items", "bloc")}
						checked={gapless}
						onChange={() => setAttributes({ gapless: !gapless })}
					/>}
					<Breakpoints active={column} setActive={showColumn}>
						{column === "small" && (
							<RangeControl
								min={1}
								max={6}
								label={__("Columns", "bloc")}
								value={columnsSmall}
								onChange={(columnsSmall) => setAttributes({ columnsSmall })}
							/>
						)}
						{column === "medium" && (
							<RangeControl
								min={1}
								max={6}
								label={__("Columns", "bloc")}
								value={columnsMedium}
								onChange={(columnsMedium) => setAttributes({ columnsMedium })}
							/>
						)}
						{column === "large" && (
							<RangeControl
								min={1}
								max={6}
								label={__("Columns", "bloc")}
								value={columnsLarge}
								onChange={(columnsLarge) => setAttributes({ columnsLarge })}
							/>
						)}
					</Breakpoints>
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
