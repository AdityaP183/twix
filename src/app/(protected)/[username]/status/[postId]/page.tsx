import Comments from "@/components/secondary/comments";
import Post from "@/components/secondary/post";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({
	params,
}: {
	params: Promise<{ username: string; postId: string }>;
}) {
	const { userId } = await auth();
	if (!userId) return;

	const { postId } = await params;
	const post = await prisma.post.findFirst({
		where: { id: Number(postId) },
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
			rePosts: { where: { userId: userId }, select: { id: true } },
			saves: { where: { userId: userId }, select: { id: true } },
			comments: {
                orderBy: { createdAt: 'desc' },
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
		},
	});
	if (!post) return notFound();

	return (
		<div className="flex flex-col">
			{/* Top Bar */}
			<div className="flex items-center gap-10 p-4 bg-secondary/50 sticky top-0 backdrop-blur-md z-10 border-b border-border">
				<Link href="/">
					<ArrowLeft />
				</Link>
				<h3 className="text-xl font-bold">Post</h3>
			</div>

			{/* Post */}
			<Post type="status" post={post} />

			{/* Comments */}
			<Comments
				comments={post.comments}
				postId={post.id}
				username={post.user.username}
			/>
		</div>
	);
}
