"use server";

import imagekit from "@/lib/tools/imagekit";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

export const shareAction = async (
	formData: FormData,
	settings: {
		type: "original" | "wide" | "square";
		sensitive: boolean;
	}
) => {
	const media = formData.get("media") as File;
	// const content = formData.get("content") as string;

	if (media) {
		const bytes = await media.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const transformation = `w-600 ${
			settings.type === "square"
				? "ar-1-1"
				: settings.type === "wide"
				? "ar-16-9"
				: ""
		}`;

		imagekit.upload(
			{
				file: buffer,
				fileName: media.name,
				folder: "/posts",
				...(media.type.includes("image") && {
					transformation: {
						pre: transformation,
					},
				}),
				customMetadata: {
					sensitive: settings.sensitive,
				},
			},
			function (error, result) {
				if (error) {
					console.log(error);
				} else {
					console.log(result);
				}
			}
		);
	}
};

export const addPost = async (
	prevState: { success: boolean; error: boolean },
	formData: FormData
) => {
	const { userId } = await auth();

	if (!userId) return { success: false, error: true };

	const desc = formData.get("desc");
	const file = formData.get("file") as File;
	const isSensitive = formData.get("isSensitive") as string;
	const imgType = formData.get("imgType");

	const uploadFile = async (file: File): Promise<UploadResponse> => {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const transformation = `w-600,${
			imgType === "square"
				? "ar-1-1"
				: imgType === "wide"
				? "ar-16-9"
				: ""
		}`;

		return new Promise((resolve, reject) => {
			imagekit.upload(
				{
					file: buffer,
					fileName: file.name,
					folder: "/posts",
					...(file.type.includes("image") && {
						transformation: {
							pre: transformation,
						},
					}),
				},
				function (error, result) {
					if (error) reject(error);
					else resolve(result as UploadResponse);
				}
			);
		});
	};

	const Post = z.object({
		desc: z.string().max(140),
		isSensitive: z.boolean().optional(),
	});

	const validatedFields = Post.safeParse({
		desc,
		isSensitive: JSON.parse(isSensitive),
	});

	if (!validatedFields.success) {
		console.log(validatedFields.error.flatten().fieldErrors);
		return { success: false, error: true };
	}

	let image = "";
	let imageHeight = 0;
	let video = "";

	if (file.size) {
		const result: UploadResponse = await uploadFile(file);

		if (result.fileType === "image") {
			image = result.filePath;
			imageHeight = result.height;
		} else {
			video = result.filePath;
		}
	}

	try {
		await prisma.post.create({
			data: {
				...validatedFields.data,
				userId,
				image,
				imageHeight,
				video,
			},
		});
		revalidatePath("/");
		return { success: true, error: false };
	} catch (error) {
		console.log(error);
		return { success: false, error: true };
	}
};

export const addComment = async (
	prevState: { success: boolean; error: boolean },
	formData: FormData
) => {
	const { userId } = await auth();

	if (!userId) return { success: false, error: true };

	const postId = formData.get("postId");
	const username = formData.get("username");
	const desc = formData.get("desc");

	const Comment = z.object({
		parentPostId: z.number(),
		desc: z.string().max(140),
	});

	const validatedFields = Comment.safeParse({
		parentPostId: Number(postId),
		desc,
	});

	if (!validatedFields.success) {
		console.log(validatedFields.error.flatten().fieldErrors);
		return { success: false, error: true };
	}

	try {
		await prisma.post.create({
			data: {
				...validatedFields.data,
				userId,
			},
		});
		revalidatePath(`/${username}/status/${postId}`);
		return { success: true, error: false };
	} catch (error) {
		console.log(error);
		return { success: false, error: true };
	}
};

export const followUser = async (targetUserId: string) => {
	const { userId } = await auth();

	if (!userId) return;

	const existingFollower = await prisma.follow.findFirst({
		where: {
			followerId: userId,
			followingId: targetUserId,
		},
	});

	if (existingFollower) {
		await prisma.follow.delete({
			where: {
				id: existingFollower.id,
			},
		});
	} else {
		await prisma.follow.create({
			data: {
				followerId: userId,
				followingId: targetUserId,
			},
		});
	}
};