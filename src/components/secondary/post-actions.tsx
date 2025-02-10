"use client";

import {
	likePost,
	rePostPost,
	savePost,
} from "@/actions/post-interaction.action";
import { socket } from "@/socket";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { Bookmark, Heart, MessageSquare, Repeat2, Share2 } from "lucide-react";
import { useOptimistic, useState } from "react";

export default function PostActions({
	username,
	counts,
	postId,
	isLiked,
	isRePosted,
	isSaved,
}: {
	username: string;
	counts: {
		likes: number;
		rePosts: number;
		comments: number;
	};
	postId: number;
	isLiked: boolean;
	isRePosted: boolean;
	isSaved: boolean;
}) {
	const [state, setState] = useState({
		likes: counts.likes,
		isLiked,
		rePosts: counts.rePosts,
		isRePosted,
		isSaved,
	});

	const { user } = useUser();

	const likeAction = async () => {
		if (!user) return;

		if (!optimisticCounts.isLiked) {
			socket.emit("sendNotification", {
				receiverUsername: username,
				data: {
					senderUsername: user.username,
					type: "like",
					link: `/${username}/status/${postId}`,
				},
			});
		}

		addOptimisticCounts("like");
		await likePost(postId);
		setState((prev) => ({
			...prev,
			likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
			isLiked: !prev.isLiked,
		}));
	};

	const rePostAction = async () => {
		addOptimisticCounts("rePost");
		await rePostPost(postId);
		setState((prev) => ({
			...prev,
			rePosts: prev.isRePosted ? prev.rePosts - 1 : prev.rePosts + 1,
			isRePosted: !prev.isRePosted,
		}));
	};
	const saveAction = async () => {
		addOptimisticCounts("save");
		await savePost(postId);
		setState((prev) => ({
			...prev,
			isSaved: !prev.isSaved,
		}));
	};

	const [optimisticCounts, addOptimisticCounts] = useOptimistic(
		state,
		(prev, type: "like" | "rePost" | "save") => {
			if (type === "like") {
				return {
					...prev,
					likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
					isLiked: !prev.isLiked,
				};
			}
			if (type === "rePost") {
				return {
					...prev,
					rePosts: prev.isRePosted
						? prev.rePosts - 1
						: prev.rePosts + 1,
					isRePosted: !prev.isRePosted,
				};
			}
			if (type === "save") {
				return {
					...prev,
					isSaved: !prev.isSaved,
				};
			}
			return prev;
		}
	);

	return (
		<>
			<div className="flex items-center justify-between flex-1">
				<div className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 cursor-pointer">
					<MessageSquare />
					<span>{counts.comments}</span>
				</div>
				<form action={rePostAction}>
					<button
						className={clsx(
							"flex items-center gap-2 hover:text-green-600 cursor-pointer",
							optimisticCounts.isRePosted
								? "text-green-600"
								: "text-muted-foreground"
						)}
					>
						<Repeat2 />
						<span>{optimisticCounts.rePosts}</span>
					</button>
				</form>
				<form action={likeAction}>
					<button
						className={clsx(
							"flex items-center gap-2 hover:text-rose-600 cursor-pointer",
							optimisticCounts.isLiked
								? "text-rose-600"
								: "text-muted-foreground"
						)}
					>
						<Heart />
						<span>{optimisticCounts.likes}</span>
					</button>
				</form>
			</div>
			<div className="flex items-center gap-2 text-muted-foreground cursor-pointer">
				<form action={saveAction} className="flex items-center">
					<button
						className={clsx(
							"hover:text-blue-600",
							optimisticCounts.isSaved && "text-blue-600"
						)}
					>
						<Bookmark />
					</button>
				</form>
				<button className="hover:text-blue-600">
					<Share2 className="hover:text-blue-600" />
				</button>
			</div>
		</>
	);
}
