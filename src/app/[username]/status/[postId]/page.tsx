import Comments from "@/components/secondary/comments";
import Post from "@/components/secondary/post";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostPage() {
	return (
		<div>
			{/* Top Bar */}
			<div className="flex items-center gap-10 p-4 bg-secondary/50 sticky top-0 backdrop-blur-md z-10 border-b border-border">
				<Link href="/">
					<ArrowLeft />
				</Link>
				<h3 className="text-xl font-bold">Post</h3>
			</div>

			{/* Post */}
			<Post
				type="status"
				content={
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quia."
				}
			/>

			{/* Comments */}
			<Comments />
		</div>
	);
}
