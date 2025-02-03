import Image from "../secondary/image";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

const recommendations = [
	{
		id: 1,
		name: "BCCI",
		handle: "bccindia",
	},
	{
		id: 2,
		name: "Narendra Modi",
		handle: "narendramodi",
	},
	{
		id: 3,
		name: "Crunchyroll",
		handle: "crunchyroll",
	},
];

export default function Recommendation() {
	return (
		<Card>
			<CardHeader className="p-4">
				<CardTitle className="text-xl font-semibold">
					Who To Follow
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				{recommendations.map((recommendation) => (
					<div
						key={recommendation.id}
						className="flex items-center justify-between mb-4"
					>
						<div className="flex items-center gap-3">
							<div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden">
								<Image
									path={`/assets/temp-images/follow-${recommendation.id}.jpg`}
									alt="logo"
									w={100}
									h={100}
									tr={true}
								/>
							</div>
							<div className="flex flex-col">
								<h1 className="font-semibold">
									{recommendation.name}
								</h1>
								<span className="text-sm text-muted-foreground">
									@{recommendation.handle}
								</span>
							</div>
						</div>
						<Button className="rounded-full font-semibold">
							Follow
						</Button>
					</div>
				))}
			</CardContent>
			<CardFooter className="p-4">
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
