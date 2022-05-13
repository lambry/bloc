import { getSliderAttrs } from "./helpers";

export default function getEditWrapperProps(attributes) {
	return {
		...getSliderAttrs(attributes)
	};
}
