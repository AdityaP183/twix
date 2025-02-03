"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ImageIcon, MapPin, Smile, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { shareAction } from "@/actions/post.action";
import ImageEditor from "./image-editor";

export default function AddPost() {
	const [media, setMedia] = useState<File | null>(null);
	const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
	const [settings, setsettings] = useState<{
		type: "original" | "wide" | "square";
		sensitive: boolean;
	}>({
		type: "original",
		sensitive: false,
	});

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setMedia(e.target.files[0]);
		}
	};

	const previewUrl = media ? URL.createObjectURL(media) : "";

	return (
		<form
			action={(formData) => shareAction(formData, settings)}
			className="flex gap-3 p-2 rounded-none items-start"
		>
			<Image
				src="/temp-images/user.jpg"
				alt="logo"
				width={40}
				height={40}
				className="rounded-full"
			/>
			<Card className="border-none flex-1">
				<CardContent className="p-0 flex flex-col">
					<Textarea
						transparent
						autoResize
						name="content"
						className="border-none text-wrap resize-none px-0"
						placeholder="What's on your mind?"
					/>
					<div className="relative rounded-xl overflow-hidden">
						{media?.type.includes("image") && previewUrl && (
							<Image
								src={previewUrl}
								alt="logo"
								width={600}
								height={600}
								className={`rounded-md w-full ${
									settings.type === "original"
										? "h-full object-contain"
										: settings.type === "square"
										? "aspect-square object-cover"
										: "aspect-video object-cover"
								}`}
							/>
						)}
						{previewUrl && (
							<Button
								type="button"
								size={"sm"}
								variant={"secondary"}
								className="absolute top-2 left-2 rounded-full font-semibold px-5 hover:bg-background"
								onClick={() => setIsEditorOpen(true)}
							>
								Edit
							</Button>
						)}
						{previewUrl && (
							<Button
								type="button"
								size={"sm"}
								variant={"secondary"}
								className="absolute top-2 right-2 rounded-full font-semibold px-5 hover:bg-background cursor-pointer"
								onClick={() => setMedia(null)}
							>
								<Trash2Icon />
							</Button>
						)}
						{media?.type.includes("video") && previewUrl && (
							<div className="relative">
								<video src={previewUrl} controls />
								<Button
									type="button"
									size={"sm"}
									variant={"secondary"}
									className="absolute top-2 right-2 rounded-full font-semibold px-5 hover:bg-background cursor-pointer"
									onClick={() => setMedia(null)}
								>
									<Trash2Icon />
								</Button>
							</div>
						)}
					</div>
					{isEditorOpen && previewUrl && (
						<ImageEditor
							onClose={() => setIsEditorOpen(false)}
							previewUrl={previewUrl}
							settings={settings}
							setSettings={setsettings}
						/>
					)}
				</CardContent>
				<Separator className="my-3" />
				<CardFooter className="px-0 flex items-center justify-between">
					<div className="flex items-center gap-3 *:cursor-pointer *:text-blue-600">
						<input
							type="file"
							name="media"
							id="media"
							className="hidden"
							accept="image/*,video/*"
							onChange={handleMediaChange}
						/>
						<label htmlFor="media">
							<ImageIcon />
						</label>
						<Smile />
						<MapPin />
					</div>
					<Button className="rounded-full font-semibold">Post</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
