import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "./image";
import Post from "./post";

export default function Comments() {
	return (
		<div>
			<div className="flex items-center justify-between px-2 py-3 border-y border-border gap-2">
				<div className="flex items-center gap-2 flex-1">
					<div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden">
						<Image
							path="/assets/temp-images/user.jpg"
							alt="user banner"
							w={40}
							h={40}
							tr={true}
						/>
					</div>
					<Input
						transparent
						name="comment"
						placeholder="Leave a comment..."
					/>
				</div>
				<Button className="rounded-full font-semibold">Post</Button>
			</div>
			<Post
				content={"Lorem ipsum dolor sit amet consectetur adipisicing."}
			/>
			<Post
				content={"Lorem ipsum dolor sit amet consectetur adipisicing."}
			/>
		</div>
	);
}
