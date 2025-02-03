import Image from "../secondary/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import PostInfo from "./post-info";
import PostActions from "./post-actions";
import imagekit from "@/lib/tools/imagekit";
import Video from "./video";
import { cn } from "@/lib/utils";
import Link from "next/link";
import clsx from "clsx";
import { Separator } from "../ui/separator";
import moment from "moment";

interface FileDetailsResponse {
	width: number;
	height: number;
	filePath: string;
	url: string;
	fileType: string;
	customMetadata?: { sensitive: boolean };
}

export default async function Post({
	type,
	content,
}: {
	content: string | null;
	type?: "status" | "comment";
}) {
	// FETCH POST MEDIA

	const getFileDetails = async (
		fileId: string
	): Promise<FileDetailsResponse> => {
		return new Promise((resolve, reject) => {
			imagekit.getFileDetails(fileId, function (error, result) {
				if (error) reject(error);
				else resolve(result as FileDetailsResponse);
			});
		});
	};

	const fileDetails = await getFileDetails("67a09203432c476416770578");

	return (
		<Card
			className={`flex gap-3 p-2 rounded-none items-start ${
				type === "status" && "flex-col"
			}`}
		>
			<Image
				path="/assets/temp-images/user.jpg"
				alt="logo"
				w={40}
				h={40}
				className={clsx(type === "status" ? "hidden" : "rounded-full")}
			/>
			<Card className="border-none">
				<CardHeader className="p-0 flex flex-row items-center space-y-0 justify-between">
					<div className="flex gap-2 items-center">
						{type === "status" && (
							<Image
								path="/assets/temp-images/user.jpg"
								alt="logo"
								w={40}
								h={40}
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
							<Link href="/aditya19ap">
								<h4 className="font-bold hover:underline">
									Aditya Prasad
								</h4>
							</Link>
							<span className="text-muted-foreground">
								@username
							</span>
							{type !== "status" && (
								<>
									<span className="text-muted-foreground">
										{" "}
										•{" "}
									</span>
									<span className="text-muted-foreground">
										2h
									</span>
								</>
							)}
						</div>
					</div>
					<PostInfo />
				</CardHeader>
				<CardContent className="px-0 py-2 space-y-2">
					<Link href="/aditya12ap/status/123">
						<p
							className={clsx(
								"text-justify tracking-tighter",
								type === "status" && "text-lg"
							)}
						>
							{content}
						</p>
					</Link>
					{fileDetails && fileDetails.fileType === "image" ? (
						<Image
							path={fileDetails.url}
							alt=""
							w={fileDetails.width}
							h={fileDetails.height}
							className={cn(
								"rounded-md",
								fileDetails.customMetadata?.sensitive
									? "blur-lg"
									: ""
							)}
						/>
					) : (
						<Video
							path={fileDetails.filePath}
							className={cn(
								"rounded-md",
								fileDetails.customMetadata?.sensitive
									? "blur-lg"
									: ""
							)}
						/>
					)}
				</CardContent>
				<CardFooter className="flex flex-col px-2 w-full">
					{type === "status" && (
						<div className="w-full">
							<div className="flex items-center gap-2 my-2">
								<span className="text-muted-foreground">
									{moment(new Date()).format(
										"h:mm A • MMM DD, YYYY"
									)}
								</span>
								•<span>40K views</span>
							</div>
							<Separator className="mb-2" />
						</div>
					)}
					<div className="w-full flex items-center justify-between gap-4 lg:gap-16 pt-2 [&_svg]:size-4 text-sm">
						<PostActions />
					</div>
				</CardFooter>
			</Card>
		</Card>
	);
}
