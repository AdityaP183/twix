import Feed from "@/components/main/feed";
import FollowUser from "@/components/secondary/follow-user";
import Image from "@/components/secondary/image";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
	ArrowLeft,
	Briefcase,
	CalendarDays,
	Link2,
	MapPin,
	MoreHorizontal,
	Search,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Profile({
	params,
}: {
    params: Promise<{ username: string }>;
}) {
	const { userId } = await auth();
	const { username } = await params;
	const user = await prisma.user.findUnique({
		where: { username: username },
		include: {
			_count: {
				select: {
					followers: true,
					following: true,
				},
			},
			following: userId
				? {
						where: {
							followerId: userId,
						},
				  }
				: undefined,
		},
	});

	if (!user) return notFound();
	return (
		<div>
			{/* Top Bar */}
			<div className="flex items-center gap-10 p-4 bg-secondary/50 sticky top-0 backdrop-blur-md z-10">
				<Link href="/">
					<ArrowLeft />
				</Link>
				<h3 className="text-xl font-bold">{user.displayName}</h3>
			</div>

			{/* Profile Info */}
			<div className="mb-5">
				{/* Cover & Avatar */}
				<div className="relative w-full">
					<div className="w-full aspect-[3/1] relative">
						<Image
							path={user.cover || "/assets/default-banner.jpg"}
							alt="user banner"
							w={600}
							h={200}
							tr={true}
						/>
					</div>
					<div className="w-1/5 aspect-square rounded-full overflow-hidden border-[4px] border-background absolute -translate-y-1/2 left-4">
						<Image
							path={user.image || "/assets/default-avatar.png"}
							alt="user avatar"
							w={100}
							h={100}
							tr={true}
						/>
					</div>
				</div>
				{/* Actions */}
				<div className="flex w-full items-center justify-end gap-2 p-2">
					<Button
						size="icon"
						variant={"outline"}
						className="rounded-full"
					>
						<MoreHorizontal />
					</Button>
					<Button
						size="icon"
						variant={"outline"}
						className="rounded-full"
					>
						<Search />
					</Button>

					{userId && (
						<FollowUser
							userId={user.id}
							isFollowed={!!user.following.length}
						/>
					)}
				</div>
				{/* Info */}
				<div className="px-5">
					<div className="my-4">
						<h1 className="text-2xl font-bold">
							{user.displayName}
						</h1>
						<span className="text-muted-foreground">
							@{user.username}
						</span>
					</div>
					<div className="space-y-3">
						{user.bio && <p>{user.bio}</p>}
						<div className="flex items-center gap-4">
							{/* Location */}
							{user.location && (
								<div className="flex items-center gap-1">
									<MapPin width={18} height={18} />
									{user.location}
								</div>
							)}
							{/* Website */}
							{user.website && (
								<div className="flex items-center gap-1">
									<Link2
										className="-rotate-[40deg]"
										width={18}
										height={18}
									/>
									<Link
										href={user.website}
										className="text-blue-500 underline"
									>
										{user.website}
									</Link>
								</div>
							)}
							{/* Job */}
							{user.job && (
								<div className="flex items-center gap-1">
									<Briefcase width={18} height={18} />
									{user.job}
								</div>
							)}
							{/* Location */}
							<div className="flex items-center gap-1">
								<CalendarDays width={18} height={18} />
								Joined{" "}
								{moment(user.createdAt).format("MMMM YYYY")}
							</div>
						</div>
						<div className="flex items-center gap-10">
							<div className="inline-flex gap-1">
								<h4 className="font-semibold">
									{user._count.following}
								</h4>
								<span className="text-muted-foreground">
									Following
								</span>
							</div>
							<div className="inline-flex gap-1">
								<h4 className="font-semibold">
									{user._count.followers}
								</h4>
								<span className="text-muted-foreground">
									Followers
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Feed */}
			<Feed userProfileId={user?.id} />
		</div>
	);
}
