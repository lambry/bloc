import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function Edit() {
	const blockProps = useBlockProps({ className: "bloc-slider-slide" });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [["core/paragraph"]],
	});

	return <div {...innerBlocksProps} />;
}
