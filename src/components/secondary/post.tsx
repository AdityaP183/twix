import Image from "../secondary/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import PostInfo from "./post-info";
import PostActions from "./post-actions";
import Link from "next/link";
import clsx from "clsx";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Repeat2 } from "lucide-react";
import type { Post, User } from "@prisma/client";
import SensitiveImage from "./sensitive-image";

type PostWithDetails = Post & {
	user: Pick<User, "displayName" | "username" | "image">;
	rePost?:
		| (Post & {
				user: Pick<User, "displayName" | "username" | "image">;
				_count: {
					likes: number;
					rePosts: number;
					comments: number;
				};
				likes: { id: number }[];
				rePosts: { id: number }[];
				saves: { id: number }[];
		  })
		| null;
	_count: {
		likes: number;
		rePosts: number;
		comments: number;
	};
	likes: { id: number }[];
	rePosts: { id: number }[];
	saves: { id: number }[];
};

export default function Post({
	type,
	post,
}: {
	type?: "status" | "comment";
	post: PostWithDetails;
}) {
	const originalPost = post.rePost || post;

	return (
		<Card className="rounded-none w-full">
			{post.rePostId && (
				<div className="flex items-center justify-start text-muted-foreground/60 gap-2 py-1 px-3">
					<Repeat2 />
					<span>{post.user.displayName} reposted</span>
				</div>
			)}
			<div
				className={`flex gap-3 p-2 rounded-none items-start ${
					type === "status" && "flex-col"
				}`}
			>
				<Image
					path={
						originalPost.user.image || "/assets/default-avatar.png"
					}
					alt="avatar"
					w={40}
					h={40}
					className={clsx(
						type === "status" ? "hidden" : "rounded-full"
					)}
				/>
				<Card className="border-none flex-1 w-full">
					<CardHeader className="p-0 flex flex-row items-center space-y-0 justify-between">
						<div className="flex gap-2 items-center">
							{type === "status" && (
								<Image
									path={
										originalPost.user.image ||
										"/assets/default-avatar.png"
									}
									alt="avatar"
									w={50}
									h={50}
									className="rounded-full"
								/>
							)}
							<div
								className={
									type === "status"
										? "flex items-start flex-col"
										: "flex items-center gap-2"
								}
							>
								<Link href={`/${originalPost.user.username}`}>
									<h4 className="font-bold hover:underline">
										{originalPost.user.displayName}
									</h4>
								</Link>
								<span className="text-muted-foreground">
									@{originalPost.user.username}
								</span>
								{type !== "status" && (
									<>
										<span className="text-muted-foreground">
											{" "}
											•{" "}
										</span>
										<span className="text-muted-foreground">
											{moment(
												originalPost.createdAt
											).fromNow()}
										</span>
									</>
								)}
							</div>
						</div>
						<PostInfo />
					</CardHeader>
					<CardContent className="px-0 py-2 space-y-2">
						<Link
							href={`/${originalPost.user.username}/status/${originalPost.id}`}
						>
							<p
								className={clsx(
									"text-justify tracking-tighter",
									type === "status" && "text-lg"
								)}
							>
								{originalPost.desc}
							</p>
						</Link>
						<div className="relative rounded-md overflow-hidden">
							{originalPost &&
								originalPost.image &&
								originalPost.image && (
									<SensitiveImage
										path={originalPost.image}
										height={originalPost.imageHeight || 600}
										isSensitive={originalPost.isSensitive}
									/>
								)}
						</div>

						{/* <Video
								path={fileDetails.filePath}
								className={cn(
									"rounded-md",
									fileDetails.customMetadata?.sensitive
										? "blur-lg"
										: ""
								)}
							/> */}
					</CardContent>
					<CardFooter className="flex flex-col px-0 w-full">
						{type === "status" && (
							<div className="w-full">
								<div className="flex items-center gap-2 my-2">
									<span className="text-muted-foreground">
										{moment(originalPost.createdAt).format(
											"h:mm A • MMM DD, YYYY"
										)}
									</span>
								</div>
								<Separator className="mb-2" />
							</div>
						)}
						<div className="w-full flex items-center justify-between gap-4 lg:gap-16 pt-2 [&_svg]:size-4 text-sm">
							<PostActions
								username={originalPost.user.username}
								counts={originalPost._count}
								postId={originalPost.id}
								isLiked={!!post.likes.length}
								isRePosted={!!post.rePosts.length}
								isSaved={!!post.saves.length}
							/>
						</div>
					</CardFooter>
				</Card>
			</div>
		</Card>
	);
}
