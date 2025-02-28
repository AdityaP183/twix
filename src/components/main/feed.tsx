import { auth } from "@clerk/nextjs/server";
import Post from "../secondary/post";
import { prisma } from "@/lib/prisma";
import InfiniteFeed from "./infinite-feed";

export default async function Feed({
	userProfileId,
}: {
	userProfileId?: string;
}) {
	const { userId } = await auth();

	if (!userId) return;

	const conditionalFetching = userProfileId
		? { userId: userProfileId, parentPostId: null }
		: {
				parentPostId: null,
				userId: {
					in: [
						userId,
						...(
							await prisma.follow.findMany({
								where: {
									followerId: userId,
								},
								select: { followingId: true },
							})
						).map((f) => f.followingId),
					],
				},
		  };

	const posts = await prisma.post.findMany({
		where: conditionalFetching,
		include: {
			user: {
				select: {
					displayName: true,
					username: true,
					image: true,
				},
			},
			rePost: {
				include: {
					user: {
						select: {
							displayName: true,
							username: true,
							image: true,
						},
					},
					_count: {
						select: {
							likes: true,
							rePosts: true,
							comments: true,
						},
					},
					likes: {
						where: {
							userId: userId,
						},
						select: { id: true },
					},
					rePosts: {
						where: { userId: userId },
						select: { id: true },
					},
					saves: { where: { userId: userId }, select: { id: true } },
				},
			},
			_count: {
				select: {
					likes: true,
					rePosts: true,
					comments: true,
				},
			},
			likes: {
				where: {
					userId: userId,
				},
				select: { id: true },
			},
			rePosts: { where: { userId: userId }, select: { id: true } },
			saves: { where: { userId: userId }, select: { id: true } },
		},
		take: 3,
		skip: 0,
		orderBy: { createdAt: "desc" },
	});

	return (
		<div>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
			<InfiniteFeed userProfileId={userProfileId} />
		</div>
	);
}
