import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const userProfileId = searchParams.get("user");
	const page = searchParams.get("cursor");
	const LIMIT = 3;

	const { userId } = await auth();

	if (!userId) return;

	const conditionalFetching =
		userProfileId !== "undefined"
			? { userId: userProfileId as string, parentPostId: null }
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
		take: LIMIT,
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
		skip: (Number(page) - 1) * LIMIT,
		orderBy: { createdAt: "desc" },
	});

	const totalPosts = await prisma.post.count({ where: conditionalFetching });

	const hasMore = Number(page) * LIMIT < totalPosts;

	return Response.json({ posts, hasMore });
}
