import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function Save() {
	const blockProps = useBlockProps.save({ className: "bloc-grid-column" });
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return <div {...innerBlocksProps} />;
}
