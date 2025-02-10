"use client";

import { Post as PostType, User } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "./image";
import Post from "./post";
import { useUser } from "@clerk/nextjs";
import { useActionState } from "react";
import { addComment } from "@/actions/post.action";

type CommentsWithDetails = PostType & {
	user: Pick<User, "displayName" | "username" | "image">;
	_count: { likes: number; rePosts: number; comments: number };
	likes: { id: number }[];
	rePosts: { id: number }[];
	saves: { id: number }[];
};

type CommentsProps = {
	comments: CommentsWithDetails[];
	postId: number;
	username: string;
};

export default function Comments({
	comments,
	postId,
	username,
}: CommentsProps) {
	const { user } = useUser();
	const [state, formAction, isPending] = useActionState(addComment, {
		success: false,
		error: false,
	});

	return (
		<div>
			{user && (
				<form
					className="flex items-center justify-between px-2 py-3 border-y border-border gap-2"
					action={formAction}
				>
					<div className="flex items-center gap-2 flex-1">
						<div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden">
							<Image
								src={user.imageUrl}
								alt="user logo"
								w={40}
								h={40}
								tr={true}
							/>
						</div>
						<Input
							type="number"
							name="postId"
							readOnly
							hidden
							value={postId}
						/>
						<Input
							type="string"
							name="username"
							readOnly
							hidden
							value={username}
						/>
						<Input
							transparent
							name="desc"
							placeholder="Leave a comment..."
						/>
					</div>
					<Button
						className="rounded-full font-semibold"
						disabled={isPending}
					>
						{isPending ? "Replying..." : "Reply"}
					</Button>
				</form>
			)}
			{state.error && (
				<span className="text-red-500 p-4">Something went wrong!</span>
			)}
			{comments.map((comment) => (
				<div key={comment.id}>
					<Post post={comment} type="comment" />
				</div>
			))}
		</div>
	);
}
