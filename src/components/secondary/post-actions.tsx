"use client";

import {
	Bookmark,
	ChartColumn,
	Heart,
	MessageSquare,
	Repeat2,
	Share2,
} from "lucide-react";

export default function PostActions() {
	return (
		<>
			<div className="flex items-center justify-between flex-1">
				<div className="flex gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
					<MessageSquare />
					<span>1K</span>
				</div>
				<div className="flex gap-2 text-muted-foreground hover:text-green-600 cursor-pointer">
					<Repeat2 />
					<span>21K</span>
				</div>
				<div className="flex gap-2 text-muted-foreground hover:text-rose-600 cursor-pointer">
					<Heart />
					<span>1K</span>
				</div>
				<div className="flex gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
					<ChartColumn />
					<span>2M</span>
				</div>
			</div>
			<div className="flex gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
				<Bookmark />
				<Share2 />
			</div>
		</>
	);
}
