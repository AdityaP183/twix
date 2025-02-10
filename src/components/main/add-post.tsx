"use client";

import Image from "../secondary/image";
import NextImage from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ImageIcon, MapPin, Smile, Trash2Icon } from "lucide-react";
import React, { useActionState, useEffect, useRef, useState } from "react";
import ImageEditor from "./image-editor";
import { useUser } from "@clerk/nextjs";
import { addPost } from "@/actions/post.action";

export default function AddPost() {
	const [media, setMedia] = useState<File | null>(null);
	const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
	const [settings, setSettings] = useState<{
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
	const { user } = useUser();
	const [state, formAction, isPending] = useActionState(addPost, {
		success: false,
		error: false,
	});

	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		if (state.success) {
			formRef.current?.reset();
			setMedia(null);
			setSettings({ type: "original", sensitive: false });
		}
	}, [state]);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="flex gap-3 p-2 rounded-none items-start"
		>
			<Image
				src={user?.imageUrl}
				alt="user logo"
				w={40}
				h={40}
				className="rounded-full"
			/>
			<Card className="border-none flex-1">
				<CardContent className="p-0 flex flex-col">
					<input
						type="text"
						name="imgType"
						value={settings.type}
						hidden
						readOnly
					/>
					<input
						type="text"
						name="isSensitive"
						value={settings.sensitive ? "true" : "false"}
						hidden
						readOnly
					/>
					<Textarea
						transparent
						autoResize
						name="desc"
						className="border-none text-wrap resize-none px-0"
						placeholder="What's on your mind?"
					/>
					<div className="relative rounded-xl overflow-hidden">
						{media?.type.includes("image") && previewUrl && (
							<NextImage
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
							setSettings={setSettings}
						/>
					)}
				</CardContent>
				<Separator className="my-3" />
				<CardFooter className="px-0 flex items-center justify-between">
					<div className="flex items-center gap-3 *:cursor-pointer *:text-blue-600">
						<input
							type="file"
							name="file"
							id="file"
							className="hidden"
							accept="image/*,video/*"
							onChange={handleMediaChange}
						/>
						<label htmlFor="file">
							<ImageIcon />
						</label>
						<Smile />
						<MapPin />
					</div>
					<Button
						className="rounded-full font-semibold"
						type="submit"
						disabled={isPending}
					>
						{isPending ? "Posting..." : "Post"}
					</Button>
					{state.error && (
						<span className="text-red-300 p-4">
							Something went wrong!
						</span>
					)}
				</CardFooter>
			</Card>
		</form>
	);
}
