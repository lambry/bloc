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
		item.classList.add("is-open");
		item.querySelector(".bloc-posts-accordion-toggle").setAttribute("aria-expanded", "true");

		const content = item.querySelector(".bloc-posts-accordion-content");

		content.style.height = "auto";

		let height = `${content.clientHeight}px`;

		content.style.height = "0px";

		setTimeout(() => {
			content.style.height = height;

			content.addEventListener("transitionend", () => content.style.height = "auto", { once: true });
		}, 0);
	}

	// Close and accordion item
	function closeAccordion(item) {
		item.classList.remove("is-open");
		item.querySelector(".bloc-posts-accordion-toggle").setAttribute("aria-expanded", "false");

		const content = item.querySelector(".bloc-posts-accordion-content");

		content.style.height = `${content.clientHeight}px`;

		setTimeout(() => content.style.height = "0px", 0);
	}
})();
