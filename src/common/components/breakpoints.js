import { __ } from "@wordpress/i18n";
import { Button, ButtonGroup } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { breakpoints } from "common/scripts/options";

export default function useBreakpoints({ render }) {
	let [breakpoint, setBreakpoint] = useState("large");

	return (
		<div className="bloc-breakpoints">
			<ButtonGroup className="bloc-breakpoints-options">
				{breakpoints.map(({ value, label }) => (
					<Button
						isSmall
						key={value}
						onClick={() => setBreakpoint(value)}
						variant={breakpoint === value ? "link" : ""}
						className={breakpoint === value ? "is-active" : ""}
					>
						{label}
					</Button>
				))}
			</ButtonGroup>
			{render(breakpoint)}
		</div>
	);
}
