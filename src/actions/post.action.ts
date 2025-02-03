"use server";

import imagekit from "@/lib/tools/imagekit";

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
