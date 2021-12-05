import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Fragment, useState, useEffect } from "@wordpress/element";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls, BlockControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, DropdownMenu, ToggleControl, FormTokenField } from "@wordpress/components";
import { flipVertical } from "@wordpress/icons";
import { supportsOptions, sizes, shift, animations } from "./options";
import { get, tokenValues, tokenLabels, tokenSuggestions } from "common/helpers";

/**
 * Add new editor controls.
 */
addFilter("editor.BlockEdit", "bloc/options", createHigherOrderComponent((BlockEdit) => (props) => {
	const { name, attributes, setAttributes } = props;
	const { shiftBlock, maxWidth, paddingTop, paddingRight, paddingBottom, paddingLeft, animateIn, whenRole, hideSmall, hideMedium, hideLarge } = attributes;

	let [roles, setRoles] = useState([]);

	useEffect(() => {
		get("options/roles").then(setRoles);
	}, []);

	if (!supportsOptions.includes(name)) {
		return <BlockEdit {...props} />;
	}

	return (
		<Fragment>
			<BlockEdit {...props} />
			<BlockControls>
				<DropdownMenu
					className="components-toolbar"
					icon={shiftBlock ? shift[shiftBlock].icon : flipVertical}
					label={__("Shift block", "bloc")}
					controls={Object.keys(shift).map((key) => ({
						...shift[key],
						isActive: shiftBlock === key,
						onClick: () => setAttributes({ shiftBlock: shiftBlock !== key ? key : null })
					}))}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__("Options", "bloc")}
					initialOpen={false}
				>
					<h4>{__("Padding", "bloc")}</h4>
					<div style={{ display: "flex", gap: "5px" }}>
						<SelectControl
							label={__("Top", "bloc")}
							value={paddingTop}
							options={sizes}
							onChange={(paddingTop) => setAttributes({ paddingTop })}
						/>
						<SelectControl
							label={__("Right", "bloc")}
							value={paddingRight}
							options={sizes}
							onChange={(paddingRight) => setAttributes({ paddingRight })}
						/>
						<SelectControl
							label={__("Bottom", "bloc")}
							value={paddingBottom}
							options={sizes}
							onChange={(paddingBottom) => setAttributes({ paddingBottom })}
						/>
						<SelectControl
							label={__("Left", "bloc")}
							value={paddingLeft}
							options={sizes}
							onChange={(paddingLeft) => setAttributes({ paddingLeft })}
						/>
					</div>
					<SelectControl
						label={__("Max width", "bloc")}
						value={maxWidth}
						options={sizes.map(({ title, value }) => ({
							label: title, value
						}))}
						onChange={(maxWidth) => setAttributes({ maxWidth })}
					/>
					<SelectControl
						label={__("Animate in", "bloc")}
						value={animateIn}
						options={animations}
						onChange={(animateIn) => setAttributes({ animateIn })}
					/>
					<FormTokenField
						label={__("Only show when", "bloc")}
						value={tokenLabels(whenRole, roles)}
						suggestions={tokenSuggestions(roles)}
						onChange={(values) => setAttributes({ whenRole: tokenValues(values, roles) })}
					/>
					<ToggleControl
						label={__("Hide on small screens", "bloc")}
						checked={hideSmall}
						onChange={() => setAttributes({ hideSmall: !hideSmall })}
					/>
					<ToggleControl
						label={__("Hide on medium screens", "bloc")}
						checked={hideMedium}
						onChange={() => setAttributes({ hideMedium: !hideMedium })}
					/>
					<ToggleControl
						label={__("Hide on large screens", "bloc")}
						checked={hideLarge}
						onChange={() => setAttributes({ hideLarge: !hideLarge })}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}));
