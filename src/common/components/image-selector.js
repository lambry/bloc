// ImageSelector.js
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";
import { Button, SelectControl } from "@wordpress/components";

export default function ImageSelector({ title, image, setImage }) {
	const { id, url, size, alt } = image;

	const sizes = [...(useSelect((select) => select("core/block-editor").getSettings().imageSizes) || [])]
		.map(({ slug, name }) => ({ value: slug, label: name }));

	const imageInfo = useSelect((select) => select("core").getMedia(id), [size]);

	useEffect(() => {
		if (imageInfo) {
			setImage({ ...image, url: imageInfo.media_details.sizes[size].source_url });
		}
	}, [size]);

	return (
		<MediaUploadCheck>
			<MediaUpload
				title={title}
				allowedTypes={["image"]}
				value={url}
				onSelect={(selected) => {
					setImage({
						...image,
						id: selected.id,
						url: selected.sizes?.[size].url || selected.sizes.large.url,
						alt: selected.alt || selected.title,
					});
				}}
				render={({ open }) => (
					<Button
						onClick={open}
						className={`components-base-control editor-post-featured-image__${url ? "preview" : "toggle"}`}
					>
						{url ? <img src={url} alt={alt} /> : title}
					</Button>
				)}
			/>
			{id && (
				<>
					<SelectControl
						label={__("Image Size", "bloc")}
						value={size}
						options={sizes}
						onChange={(size) => setImage({ ...image, size })}
					/>
					<Button
						isLink
						isDestructive
						onClick={() => setImage({ url: "" })}
					>
						{__("Remove image", "bloc")}
					</Button>
				</>
			)}
		</MediaUploadCheck>
	);
}
