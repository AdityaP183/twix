"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../secondary/post";

const fetchPosts = async (pageParam: number, userProfileId?: string) => {
	const res = await fetch(
		"http://localhost:3000/api/posts?cursor=" +
			pageParam +
			"&user=" +
			userProfileId
	);

	return res.json();
};

export default function InfiniteFeed({
	userProfileId,
}: {
	userProfileId?: string;
}) {
	const { data, error, status, hasNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ["posts"],
			queryFn: ({ pageParam = 2 }) =>
				fetchPosts(pageParam, userProfileId),
			initialPageParam: 2,
			getNextPageParam: (lastPage, pages) =>
				lastPage.hasMore ? pages.length + 2 : undefined,
		});

	if (error) return "Something went wrong";
	if (status === "pending") return "Loading...";

	const allPosts = data?.pages?.flatMap((page) => page.posts || []);

	return (
		<InfiniteScroll
			dataLength={allPosts.length}
			next={fetchNextPage}
			hasMore={!!hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
		>
            {
                allPosts.map((post) => (
                    <Post key={post.id} post={post}/>
                ))
            }
        </InfiniteScroll>
	);
}
