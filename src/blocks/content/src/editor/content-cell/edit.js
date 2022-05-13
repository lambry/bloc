import { InnerBlocks, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { getClasses } from "./helpers";

export default function Edit({ setAttributes, context }) {
	const blockProps = useBlockProps({ className: getClasses(context) });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [["core/paragraph"]],
	});

	useEffect(() => setAttributes({ display: context["bloc/content/display"] }), [context]);

	return <div {...innerBlocksProps} />;
}
