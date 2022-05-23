import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls, BlockControls, BlockVerticalAlignmentToolbar } from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { Breakpoints } from "common/components";
import { getClasses } from "./helpers";

export default function Edit({ attributes, setAttributes }) {
	const { verticalAlignment, columnsSmall, columnsMedium, columnsLarge, gapless } = attributes;

	const blockProps = useBlockProps({ className: getClasses(attributes) });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["bloc/cell"],
		template: Array(columnsLarge).fill(["bloc/cell"])
	});

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
					<ToggleControl
						label={__("Remove column gap", "bloc")}
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
			<div { ...innerBlocksProps } />
		</>
	);
}
