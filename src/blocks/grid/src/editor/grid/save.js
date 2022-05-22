import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { getClasses } from "./helpers";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save({ className: getClasses(attributes) });

	return <div {...useInnerBlocksProps.save(blockProps)} />;
}
