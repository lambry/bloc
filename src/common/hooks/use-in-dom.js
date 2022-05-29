import { useEffect, useState } from "@wordpress/element";

/**
 * Watch an element for changes in it's DOM.
 */
export default function useInDom(ref, selector) {
	const [inDom, setInDom] = useState(false);
	const [observer, setObserver] = useState(null);

	// Setup the observer
	useEffect(() => {
		if (!ref) return;

		const instance = new MutationObserver(updated);

		instance.observe(ref.current, {
			attributes: false,
			childList: true,
			subtree: false,
		});

		setObserver(instance);

		return () => (observer ? observer.disconnect() : null);
	}, []);

	// Handle mutations
	const updated = (mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === "childList" &&
				mutation.addedNodes.length &&
				mutation.target.querySelector(selector)
			) {
				setInDom(true);
			} else {
				setInDom(false);
			}
		});
	};

	return inDom;
}
