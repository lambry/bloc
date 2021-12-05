import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import ServerSideRender from "@wordpress/server-side-render";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, FormTokenField, RangeControl, ToggleControl, TextControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import Breakpoints from "common/breakpoints";
import { displayOptions, filterTypes, orderOptions, orderByOptions } from "./options";
import { get, query, unique, debounce, tokenValues, tokenLabels, tokenSuggestions } from "common/helpers";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { display, number, columnsSmall, columnsMedium, columnsLarge, autoPlay, loopSlides, fadeSlides, openFirst, openIndividually, navigation, pagination, loadMore, type, taxonomy, term, offset, specific, include, children, sticky, filter, filterBy, filterType, filterValue, order, orderBy, orderMeta } = attributes;

	const types = [...(useSelect((select) => select("core").getPostTypes()) || [])]
		.filter(({ viewable }) => viewable)
		.map(({ slug, name }) => ({ value: slug, label: name }));

	let [terms, setTerms] = useState([]);
	let [taxonomies, setTaxonomies] = useState([]);
	let [includes, setIncludes] = useState([]);
	let [fields, setFields] = useState([]);
	let [column, showColumn] = useState("large");

	// On load setup
	useEffect(() => {
		if (type.length) {
			get(`posts/fields?${query({ type })}`).then(setFields);
			get(`posts/taxonomies?${query({ type })}`).then(setTaxonomies);
		}
		if (taxonomy.length) {
			get(`posts/terms?${query({ taxonomy })}`).then(setTerms);
		}
		if (include.length) {
			get(`posts/search?${query({ include })}`).then(setIncludes);
		}
	}, []);

	// Update post type dependant options
	useEffect(() => {
		get(`posts/fields?${query({ type })}`).then(setFields);
		get(`posts/taxonomies?${query({ type })}`).then(setTaxonomies);
	}, [type]);

	// Update taxonomy dependant options
	useEffect(() => {
		get(`posts/terms?${query({ taxonomy })}`).then(setTerms);
	}, [taxonomy]);

	// Update filter dependant options
	useEffect(() => {
		if (filterBy.split("::")[1] === "string" && !["is", "not"].includes(filterType)) {
			setAttributes({ filterType: "is" });
		}
	}, [filterBy]);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Display", "bloc")}
					className="bloc-panel"
					initialOpen={true}
				>
					<SelectControl
						label={__("Type", "bloc")}
						value={display}
						options={displayOptions}
						onChange={(display) => setAttributes({ display })}
					/>
					{(!specific || children) && (
						<RangeControl
							min={1}
							max={50}
							label={__("Number of posts to show", "bloc")}
							value={number}
							onChange={(number) => setAttributes({ number })}
						/>
					)}
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
					{display === "slider" && (
						<RangeControl
							min={0}
							max={10}
							label={__("Auto Play", "bloc")}
							value={autoPlay}
							renderTooltipContent={(value) => `${value}s`}
							onChange={(autoPlay) => setAttributes({ autoPlay })}
						/>
					)}
					{display === "slider" && (
						<ToggleControl
							label={__("Loop slides", "bloc")}
							checked={loopSlides}
							onChange={() => setAttributes({ loopSlides: !loopSlides })}
						/>
					)}
					{display === "slider" && (
						<ToggleControl
							label={__("Fade between slides", "bloc")}
							checked={fadeSlides}
							onChange={() => setAttributes({ fadeSlides: !fadeSlides })}
						/>
					)}
					{display === "accordion" && (
						<ToggleControl
							label={__("Open first item", "bloc")}
							checked={openFirst}
							onChange={() => setAttributes({ openFirst: !openFirst })}
						/>
					)}
					{display === "accordion" && (
						<ToggleControl
							label={__("Open one at a time", "bloc")}
							checked={openIndividually}
							onChange={() => setAttributes({ openIndividually: !openIndividually })}
						/>
					)}
					{display === "slider" && (
						<ToggleControl
							label={__("Show navigation", "bloc")}
							checked={navigation}
							onChange={() => setAttributes({ navigation: !navigation })}
						/>
					)}
					{(display === "slider" ||
						(!specific && !include.length)) && (
						<ToggleControl
							label={__("Show pagination", "bloc")}
							checked={pagination}
							onChange={() => setAttributes({
								pagination: !pagination,
								loadMore: false,
							})}
						/>
					)}
					{display !== "slider" && !specific && !include.length && (
						<ToggleControl
							label={__("Show load more", "bloc")}
							checked={loadMore}
							onChange={() => setAttributes({
								loadMore: !loadMore,
								pagination: false,
							})}
						/>
					)}
				</PanelBody>
				<PanelBody title={__("Source", "bloc")} initialOpen={false}>
					{!specific && (
						<FormTokenField
							label={__("Post Types", "bloc")}
							value={tokenLabels(type, types)}
							suggestions={tokenSuggestions(types)}
							onChange={(values) => setAttributes({ type: tokenValues(values, types) })}
						/>
					)}
					{!specific && type.length > 0 && taxonomies.length > 0 && (
						<FormTokenField
							label={__("Taxonomies", "bloc")}
							value={tokenLabels(taxonomy, taxonomies)}
							suggestions={tokenSuggestions(taxonomies)}
							onChange={(values) => setAttributes({ taxonomy: tokenValues(values, taxonomies) })}
						/>
					)}
					{!specific && taxonomy.length > 0 && terms.length > 0 && (
						<FormTokenField
							label={__("Terms", "bloc")}
							value={tokenLabels(term, terms)}
							suggestions={tokenSuggestions(terms)}
							onChange={(values) => setAttributes({ term: tokenValues(values, terms) })}
						/>
					)}
					{(!specific || !include.length) && (
						<RangeControl
							min={0}
							max={50}
							label={__("Offset posts by", "bloc")}
							value={offset}
							onChange={(offset) => setAttributes({ offset })}
						/>
					)}
					<ToggleControl
						label={__("Choose specific posts", "bloc")}
						checked={specific}
						onChange={() => setAttributes({ specific: !specific })}
					/>
					{specific && (
						<FormTokenField
							label={__("Include posts", "bloc")}
							value={tokenLabels(include, includes)}
							suggestions={tokenSuggestions(includes)}
							onInputChange={debounce((value) =>
								get(`posts/search?${query({ search: value })}`).then((data) =>
									setIncludes(unique([...includes, ...data]))
								)
							)}
							onChange={(values) => setAttributes({ include: tokenValues(values, includes)})}
						/>
					)}
					{specific && include.length > 0 && (
						<ToggleControl
							label={__("Show only children", "bloc")}
							checked={children}
							onChange={() => setAttributes({ children: !children })}
						/>
					)}
					<ToggleControl
						label={__("Include sticky posts", "bloc")}
						checked={sticky}
						onChange={() => setAttributes({ sticky: !sticky })}
					/>
					{(!specific || !include.length) && (
						<ToggleControl
							label={__("Filter by custom field", "bloc")}
							checked={filter}
							onChange={() => setAttributes({ filter: !filter })}
						/>
					)}
					{filter && (
						<SelectControl
							label={__("Custom Field", "bloc")}
							value={filterBy}
							options={[{ label: __("Select field", "bloc"), value: "" }, ...fields ]}
							onChange={(filterBy) => setAttributes({ filterBy })}
						/>
					)}
					{filter && filterBy && (
						<SelectControl
							label={__("Filter method", "bloc")}
							value={filterType}
							options={filterTypes.filter(({ value }) => {
								return (filterBy.split("::")[1] === "int" || ["is", "not"].includes(value));
							})}
							onChange={(filterType) => setAttributes({ filterType })}
						/>
					)}
					{filter && filterBy && (
						<TextControl
							label={__("Filter Value", "bloc")}
							value={filterValue}
							onChange={(filterValue) => setAttributes({ filterValue })}
						/>
					)}
				</PanelBody>
				<PanelBody title={__("Order", "bloc")} initialOpen={false}>
					<SelectControl
						label={__("Order By", "bloc")}
						value={orderBy}
						options={orderByOptions}
						onChange={(orderBy) => setAttributes({ orderBy })}
					/>
					{orderBy === "meta" && (
						<SelectControl
							label={__("Custom Field", "bloc")}
							value={orderMeta}
							options={[{ label: __("Select field", "bloc"), value: "" }, ...fields]}
							onChange={(orderMeta) => setAttributes({ orderMeta })}
						/>
					)}
					{orderBy !== "rand" && (
						<SelectControl
							label={__("Sort Order", "bloc")}
							value={order}
							options={orderOptions}
							onChange={(order) => setAttributes({ order })}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<ServerSideRender block="bloc/posts" attributes={attributes} />
		</>
	);
}
