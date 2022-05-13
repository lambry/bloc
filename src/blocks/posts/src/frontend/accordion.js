(function () {
	const accordions = document.querySelectorAll(".bloc-posts-accordion");
	const accordionItems = document.querySelectorAll(".bloc-posts-accordion-item");

	// Auto open the first accordion?
	accordions.forEach((accordion) => {
		if (accordion.dataset.openFirst === "1") {
			openAccordion(accordion.querySelector(".bloc-posts-accordion-item"));
		}
	});

	// Setup accordion item events
	accordionItems.forEach((accordion) => {
		accordion.querySelector(".bloc-posts-accordion-toggle").addEventListener("click", () => {
			const parent = accordion.closest(".bloc-posts-accordion");

			// Close other items?
			if (parent.dataset.openIndividually === "1") {
				parent.querySelectorAll(".is-open").forEach(item => closeAccordion(item));
			}

			if (accordion.classList.contains("is-open")) {
				closeAccordion(accordion);
			} else {
				openAccordion(accordion);
			}
		});
	});

	// Open and accordion item
	function openAccordion(item) {
		const content = item.querySelector(".bloc-posts-accordion-content");

		item.classList.add("is-open");
		item.querySelector(".bloc-posts-accordion-toggle").setAttribute("aria-expanded", "true");

		content.style.height = "auto";

		let height = `${content.clientHeight}px`;

		content.style.height = "0px";

		setTimeout(() => content.style.height = height, 0);
	}

	// Close and accordion item
	function closeAccordion(item) {
		const content = item.querySelector(".bloc-posts-accordion-content");

		content.style.height = "0px";

		item.querySelector(".bloc-posts-accordion-toggle").setAttribute("aria-expanded", "false");

		content.addEventListener("transitionend", () => {
			item.classList.remove("is-open");
		}, { once: true });
	}
})();
