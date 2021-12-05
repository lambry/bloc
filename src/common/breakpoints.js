import { __ } from "@wordpress/i18n";
import { Button, ButtonGroup } from "@wordpress/components";
import { breakpoints } from "./options";

export default function Breakpoints({ active, setActive, children }) {
	return (
		<div className="bloc-breakpoints">
			<ButtonGroup className="bloc-breakpoints-options">
				{breakpoints.map(({ value, label }) => (
					<Button
						isSmall
						key={value}
						onClick={() => setActive(value)}
						variant={active === value ? "link" : ""}
						className={active === value ? "is-active" : ""}
					>
						{label}
					</Button>
				))}
			</ButtonGroup>
			{children}
		</div>
	);
}
