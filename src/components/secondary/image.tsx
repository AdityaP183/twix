"use client";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
import { IKImage } from "imagekitio-next";

interface ImageProps {
	path?: string;
	src?: string;
	w?: number;
	h?: number;
	alt: string;
	className?: string;
	tr?: boolean;
}

export default function Image({
	path,
	src,
	alt,
	className,
	w,
	h,
	tr,
}: ImageProps) {
	return (
		<IKImage
			urlEndpoint={urlEndpoint}
			path={path}
			src={src}
			{...(tr
				? {
						transformation: [
							{
								width: `${w}`,
								height: `${h}`,
							},
						],
				  }
				: {
						width: w,
						height: h,
				  })}
			alt={alt}
			className={className}
			lqip={{ active: true, quality: 20 }}
		/>
	);
}
