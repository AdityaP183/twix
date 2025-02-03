import Link from "next/link";
import Popular from "./popular";
import Recommendation from "./recommendation";
import Search from "./search";
import { Copyright } from "lucide-react";

export default function RightSidebar() {
	return (
		<div className="pt-4 flex flex-col gap-4 sticky top-0 h-max">
			<Search />
			<Popular />
			<Recommendation />
			<div className="text-sm">
				<div className="text-muted-foreground flex gap-x-4 flex-wrap">
					<Link href="/" className="hover:underline">
						Terms of Service
					</Link>
					<Link href="/" className="hover:underline">
						Privacy Policy
					</Link>
					<Link href="/" className="hover:underline">
						Cookie Policy
					</Link>
					<Link href="/" className="hover:underline">
						Accessibility
					</Link>
					<Link href="/" className="hover:underline">
						Ads Info
					</Link>
				</div>
				<span className="flex items-center justify-center gap-2">
					<Copyright size={14} /> {new Date().getFullYear()} Twix
					Corp.
				</span>
			</div>
		</div>
	);
}
