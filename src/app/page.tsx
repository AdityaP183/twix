import AddPost from "@/components/main/add-post";
import Feed from "@/components/main/feed";
import clsx from "clsx";
import Link from "next/link";

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { following, communities } = await searchParams;

	return (
		<div className="text-center">
			{/* Section */}
			<div className="w-full h-12 bg-transparent border-b-[1px] border-border p-2 flex items-center gap-4">
				<Link
					className={clsx(
						"w-full rounded-md flex-1 h-full items-center flex justify-center",
						!following && !communities
							? "bg-secondary text-secondary-foreground"
							: "bg-transparent border border-secondary text-secondary-foreground"
					)}
					href="/"
				>
					For You
				</Link>
				<Link
					className={clsx(
						"w-full rounded-md flex-1 h-full items-center flex justify-center",
						following
							? "bg-secondary text-secondary-foreground"
							: "bg-transparent border border-secondary text-secondary-foreground"
					)}
					href="/?following=true"
				>
					Following
				</Link>
				<Link
					className={clsx(
						"w-full rounded-md flex-1 h-full items-center flex justify-center",
						communities
							? "bg-secondary text-secondary-foreground"
							: "bg-transparent border border-secondary text-secondary-foreground"
					)}
					href="/?communities=true"
				>
					Communities
				</Link>
			</div>

			{/* Add Post */}
			<AddPost />

			{/* Feed Posts */}
			<Feed />
		</div>
	);
}
