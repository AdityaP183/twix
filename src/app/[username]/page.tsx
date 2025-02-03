import Feed from "@/components/main/feed";
import Image from "@/components/secondary/image";
import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	CalendarDays,
	Link2,
	MapPin,
	MoreHorizontal,
	Search,
} from "lucide-react";
import Link from "next/link";

export default function Profile() {
	return (
		<div>
			{/* Top Bar */}
			<div className="flex items-center gap-10 p-4 bg-secondary/50 sticky top-0 backdrop-blur-md z-10">
				<Link href="/">
					<ArrowLeft />
				</Link>
				<h3 className="text-xl font-bold">Aditya Prasad</h3>
			</div>

			{/* Profile Info */}
			<div className="mb-5">
				{/* Cover & Avatar */}
				<div className="relative w-full">
					<div className="w-full aspect-[3/1] relative">
						<Image
							path="/assets/temp-images/banner.jpg"
							alt="user banner"
							w={600}
							h={200}
							tr={true}
						/>
					</div>
					<div className="w-1/5 aspect-square rounded-full overflow-hidden border-[4px] border-background absolute -translate-y-1/2 left-4">
						<Image
							path="/assets/temp-images/user.jpg"
							alt="user banner"
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
					<Button className="rounded-full font-bold">Follow</Button>
				</div>
				{/* Info */}
				<div className="px-5">
					<div className="my-4">
						<h1 className="text-2xl font-bold">Aditya Prasad</h1>
						<span className="text-muted-foreground">
							@aditya19p
						</span>
					</div>
					<div className="space-y-3">
						<p>You can&apos;t see me.👋</p>
						<div className="flex items-center gap-4">
							{/* Location */}
							<div className="flex items-center gap-1">
								<MapPin width={18} height={18} />
								India
							</div>
							{/* Location */}
							<div className="flex items-center gap-1">
								<Link2
									className="-rotate-[40deg]"
									width={18}
									height={18}
								/>
								<Link
									href={"www.google.com"}
									className="text-blue-500 underline"
								>
									google.com
								</Link>
							</div>
							{/* Location */}
							<div className="flex items-center gap-1">
								<CalendarDays width={18} height={18} />
								Joined January 2025
							</div>
						</div>
						<div className="flex items-center gap-10">
							<div className="inline-flex gap-1">
								<h4 className="font-semibold">50</h4>
								<span className="text-muted-foreground">
									Following
								</span>
							</div>
							<div className="inline-flex gap-1">
								<h4 className="font-semibold">5</h4>
								<span className="text-muted-foreground">
									Followers
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Feed */}
			<Feed />
		</div>
	);
}
