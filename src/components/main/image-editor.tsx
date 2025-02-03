import {
	ArrowLeft,
	Eye,
	EyeOff,
	RectangleHorizontal,
	Scan,
	Square,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

interface ImageEditorProps {
	previewUrl: string;
	onClose: () => void;
	settings: {
		type: "original" | "wide" | "square";
		sensitive: boolean;
	};
	setSettings: React.Dispatch<
		React.SetStateAction<{
			type: "original" | "wide" | "square";
			sensitive: boolean;
		}>
	>;
}

export default function ImageEditor({
	previewUrl,
	settings,
	setSettings,
	onClose,
}: ImageEditorProps) {
	const handleSensitivityChange = () => {
		setSettings((prevSettings) => ({
			...prevSettings,
			sensitive: !prevSettings.sensitive,
		}));
	};

	return (
		<div className="fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-75 z-10 flex items-center justify-center">
			<Card>
				<CardHeader className="flex items-center justify-between flex-row">
					<div className="flex items-center gap-10 cursor-pointer">
						<ArrowLeft onClick={onClose} />
						<CardTitle className="text-xl">Crop Image</CardTitle>
					</div>
					<Button
						type="submit"
						className="rounded-full font-semibold"
						onClick={onClose}
					>
						Save
					</Button>
				</CardHeader>
				<CardContent>
					<div className="w-[600px] h-[600px] flex items-center">
						<Image
							src={previewUrl}
							alt="image"
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
					</div>
				</CardContent>
				<CardFooter className="flex items-center flex-row justify-between text-sm">
					<div className="flex items-center gap-10 *:cursor-pointer">
						<Scan
							onClick={() =>
								setSettings((prev) => ({
									...prev,
									type: "original",
								}))
							}
							className={`hover:text-blue-500 ${
								settings.type === "original" && "text-blue-500"
							}`}
						/>
						<Square
							onClick={() =>
								setSettings((prev) => ({
									...prev,
									type: "square",
								}))
							}
							className={`hover:text-blue-500 ${
								settings.type === "square" && "text-blue-500"
							}`}
						/>
						<RectangleHorizontal
							onClick={() =>
								setSettings((prev) => ({
									...prev,
									type: "wide",
								}))
							}
							className={`hover:text-blue-500 ${
								settings.type === "wide" && "text-blue-500"
							}`}
						/>
					</div>
					<button
						type="button"
						className={`font-semibold  text-sm inline-flex gap-2 px-3 py-2 rounded-full items-center ${
							settings.sensitive
								? "bg-destructive text-destructive-foreground"
								: "bg-primary text-primary-foreground"
						}`}
						onClick={handleSensitivityChange}
					>
						{settings.sensitive ? <EyeOff /> : <Eye />}
						Sensitive
					</button>
				</CardFooter>
			</Card>
		</div>
	);
}
