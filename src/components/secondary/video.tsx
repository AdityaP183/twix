"use client";

import { IKVideo } from "imagekitio-next";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

interface VideoTypes {
	path: string;
	className?: string;
}

export default function Video({ path, className }: VideoTypes) {
	return (
		<IKVideo
			urlEndpoint={urlEndpoint}
			path={path}
			transformation={[{ width: "1920", height: "1080", q: "90" }]}
			controls={true}
			className={className}
		/>
	);
}
