"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const likePost = async (postId: number) => {
	const { userId } = await auth();
	if (!userId) return;

	const existingLike = await prisma.like.findFirst({
		where: {
			postId,
			userId,
		},
	});

	if (existingLike) {
		await prisma.like.delete({
			where: {
				id: existingLike.id,
			},
		});
	} else {
		await prisma.like.create({
			data: {
				postId,
				userId,
			},
		});
	}
};

export const rePostPost = async (postId: number) => {
	const { userId } = await auth();
	if (!userId) return;

	const existingRePost = await prisma.post.findFirst({
		where: {
			rePostId: postId,
			userId,
		},
	});

	if (existingRePost) {
		await prisma.post.delete({
			where: {
				id: existingRePost.id,
			},
		});
	} else {
		await prisma.post.create({
			data: {
				rePostId: postId,
				userId,
			},
		});
	}
};
export const savePost = async (postId: number) => {
	const { userId } = await auth();
	if (!userId) return;

	const existingSavedPost = await prisma.savedPosts.findFirst({
		where: {
			postId,
			userId,
		},
	});

	if (existingSavedPost) {
		await prisma.savedPosts.delete({
			where: {
				id: existingSavedPost.id,
			},
		});
	} else {
		await prisma.savedPosts.create({
			data: {
				postId,
				userId,
			},
		});
	}
};
