import { getAttributes } from "./helpers";

export default function getEditWrapperProps(attributes) {
	return {
		...getAttributes(attributes)
	};
}
