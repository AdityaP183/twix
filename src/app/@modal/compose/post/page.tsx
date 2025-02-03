"use client";

import AddPost from "@/components/main/add-post";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostModal() {
	const router = useRouter();

	return (
		<div className="w-full h-screen bg-[#293139a6] absolute z-10 top-0 left-0 flex justify-center">
			<Card className="h-fit w-1/2 mt-10">
				<CardHeader className="flex items-center justify-between flex-row">
					<CardTitle className="text-2xl font-bold">
						Create a new post
					</CardTitle>
					<Button
						variant="secondary"
						size="icon"
						onClick={() => router.back()}
					>
						<X />
					</Button>
				</CardHeader>
				<CardContent>
					<AddPost />
				</CardContent>
			</Card>
		</div>
	);
}
