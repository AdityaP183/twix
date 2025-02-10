import Image from "../secondary/image";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

const trendingTopics = [
	{
		title: "Trending - Technology",
		topic: "AI Breakthroughs",
		totalPosts: "1.2M",
	},
	{
		title: "Trending - Health",
		topic: "New Vaccine Developments",
		totalPosts: "80K",
	},
	{
		title: "Trending - Environment",
		topic: "Climate Change Actions",
		totalPosts: "2K",
	},
];

export default function Popular() {
	return (
		<Card>
			<CardHeader className="px-4 py-2">
				<CardTitle className="text-xl font-semibold">
					{"What's"} Happening?
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				{/* Trending Event */}
				<div className="flex gap-3 items-center">
					<div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden">
						<Image
							path={"/assets/temp-images/event.png"}
							alt="logo"
							w={120}
							h={120}
							tr={true}
						/>
					</div>
					<div className="flex-1 flex flex-col gap-1">
						<h1 className="font-semibold">
							A Deadly Asteroid May Strike Earth?
						</h1>
						<span className="text-muted-foreground">
							NASA say&apos;s that asteroid may....
						</span>
					</div>
				</div>

				<Separator className="my-3" />

				{/* Trending Topics */}
				<div>
					{trendingTopics.map((topic, index) => (
						<div
							key={topic.title + index}
							className="mt-4 space-y-1 leading-tight"
						>
							<h1 className="font-sm text-muted-foreground">
								{topic.title}
							</h1>
							<h2 className="text-semibold">{topic.topic}</h2>
							<p className="text-muted-foreground text-sm">
								{topic.totalPosts} posts
							</p>
						</div>
					))}
				</div>
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
