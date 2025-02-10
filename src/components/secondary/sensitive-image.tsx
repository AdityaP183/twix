"use client";

import Image from "./image";
import { useState } from "react";
import { Button } from "../ui/button";
import { EyeOff } from "lucide-react";

export default function SensitiveImage({
	path,
	height,
	isSensitive,
}: {
	path: string;
	height: number;
	isSensitive: boolean;
}) {
	const [showImage, setShowImage] = useState(isSensitive);
	return (
		<>
			<Image path={path} alt="" w={600} h={height || 600} />
			{showImage && (
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0b0c0e] via-[#2d2a2a] to-[#0b0c0e] flex items-center justify-center">
					<div className="p-2 flex items-center justify-center flex-col">
						<EyeOff className="w-8 h-8 text-white" />
						<h5 className="font-semibold">Content warning: <span className="text-red-500">Sensitive content</span></h5>
						<p>
							The post author flagged this post as showing
							sensitive content.
						</p>
						<Button className="mt-2" onClick={() => setShowImage(false)}>
							Show
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
