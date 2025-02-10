"use client";

import { useOptimistic, useState } from "react";
import { Button } from "../ui/button";
import { followUser } from "@/actions/post.action";

export default function FollowUser({
	userId,
	isFollowed,
}: {
	userId: string;
	isFollowed: boolean;
}) {
	const [state, setState] = useState(isFollowed);

	const followAction = async () => {
		switchOptimisticFollow("");
		await followUser(userId);
		setState((prev) => !prev);
	};

	const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
		state,
		(prev) => !prev
	);

	return (
		<form action={followAction}>
			<Button
				className="rounded-full font-bold"
				variant={optimisticFollow ? "outline" : "default"}
			>
				{optimisticFollow ? "UnFollow" : "Follow"}
			</Button>
		</form>
	);
}
