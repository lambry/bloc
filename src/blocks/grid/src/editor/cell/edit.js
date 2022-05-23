import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { PanelBody, RangeControl } from "@wordpress/components";
import { Breakpoints } from "common/components";
import { getClasses } from "./helpers";

export default function Edit({ attributes, setAttributes, context }) {
	const { columnsSmall, columnsMedium, columnsLarge, rowsSmall, rowsMedium, rowsLarge, gridSmall, gridMedium, gridLarge } = attributes;

	const blockProps = useBlockProps({ className: getClasses(attributes) });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [["core/paragraph"]],
	});

	// Mark sure columns fall within the grid
	useEffect(() => {
		setAttributes({
			gridSmall: context["bloc/grid/small"],
			gridMedium: context["bloc/grid/medium"],
			gridLarge: context["bloc/grid/large"],
			columnsSmall: context["bloc/grid/small"] < columnsSmall ? context["bloc/grid/small"] : columnsSmall,
			columnsMedium: context["bloc/grid/medium"] < columnsMedium ? context["bloc/grid/medium"] : columnsMedium,
			columnslarge: context["bloc/grid/large"] < columnsLarge ? context["bloc/grid/large"] : columnsLarge,
		});
	}, [context]);

	return <>
		<InspectorControls>
			<PanelBody title={__("Display", "bloc")}>
				<Breakpoints render={breakpoint => <>
					{breakpoint === "small" && (
						<RangeControl
							min={1}
							max={gridSmall}
							label={__("Columns", "bloc")}
							value={columnsSmall}
							onChange={(columnsSmall) => setAttributes({ columnsSmall })}
						/>
					)}
					{breakpoint === "medium" && (
						<RangeControl
							min={1}
							max={gridMedium}
							label={__("Columns", "bloc")}
							value={columnsMedium}
							onChange={(columnsMedium) => setAttributes({ columnsMedium })}
						/>
					)}
					{breakpoint === "large" && (
						<RangeControl
							min={1}
							max={gridLarge}
							label={__("Columns", "bloc")}
							value={columnsLarge}
							onChange={(columnsLarge) => setAttributes({ columnsLarge })}
						/>
					)}
				</>} />
				<Breakpoints render={breakpoint => <>
					{breakpoint === "small" && (
						<RangeControl
							min={1}
							max={gridSmall}
							label={__("Rows", "bloc")}
							value={rowsSmall}
							onChange={(rowsSmall) => setAttributes({ rowsSmall })}
						/>
					)}
					{breakpoint === "medium" && (
						<RangeControl
							min={1}
							max={gridMedium}
							label={__("Rows", "bloc")}
							value={rowsMedium}
							onChange={(rowsMedium) => setAttributes({ rowsMedium })}
						/>
					)}
					{breakpoint === "large" && (
						<RangeControl
							min={1}
							max={gridLarge}
							label={__("Rows", "bloc")}
							value={rowsLarge}
							onChange={(rowsLarge) => setAttributes({ rowsLarge })}
						/>
					)}
				</>} />
			</PanelBody>
		</InspectorControls>
		<div {...innerBlocksProps} />
	</>
}
