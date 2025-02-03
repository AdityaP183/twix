import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

export default function Search() {
	return (
		<div className="rounded-full bg-secondary flex items-center gap-1 px-4 py-1">
			<SearchIcon />
			<Input transparent placeholder="Search..." />
		</div>
	);
}
