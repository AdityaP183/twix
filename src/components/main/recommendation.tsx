import { prisma } from "@/lib/prisma";
import Image from "../secondary/image";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { auth } from "@clerk/nextjs/server";

export default async function Recommendation() {
	const { userId } = await auth();
	if (!userId) return;

	const followingIds = await prisma.follow.findMany({
		where: { followerId: userId },
		select: { followingId: true },
	});
	const followedUserIds = followingIds.map(
		(following) => following.followingId
	);

	const friendsRecommendations = await prisma.user.findMany({
		where: {
			id: {
				not: userId,
				notIn: followedUserIds,
			},
			following: {
				some: {
					followerId: { in: followedUserIds },
				},
			},
		},
		take: 3,
		select: {
			id: true,
			displayName: true,
			username: true,
			image: true,
		},
	});

	return (
		<Card>
			<CardHeader className="px-4 py-2">
				<CardTitle className="text-xl font-semibold">
					Who To Follow
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				{friendsRecommendations.map((recommendation) => (
					<div
						key={recommendation.id}
						className="flex items-center justify-between mb-4"
					>
						<div className="flex items-center gap-3">
							<div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden">
								<Image
									path={
										recommendation.image ||
										"/assets/default-avatar.png"
									}
									alt="logo"
									w={100}
									h={100}
									tr={true}
								/>
							</div>
							<div className="flex flex-col">
								<h1 className="font-semibold">
									{recommendation.displayName}
								</h1>
								<span className="text-sm text-muted-foreground">
									@{recommendation.username}
								</span>
							</div>
						</div>
						<Button className="rounded-full font-semibold">
							Follow
						</Button>
					</div>
				))}
			</CardContent>
			<CardFooter className="px-4 py-2">
				<Button
					size="sm"
					variant="link"
					className="rounded-full px-0 font-semibold text-blue-500"
				>
					Show More
				</Button>
			</CardFooter>
		</Card>
	);
}
