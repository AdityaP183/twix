"use client";

import { socket } from "@/socket";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type NotificationType = {
	id: string;
	senderUsername: string;
	type: "like" | "comment" | "rePost" | "follow";
	link: string;
};

export default function NotificationIcon() {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);

	useEffect(() => {
	    socket.on("getNotification", (notification: NotificationType) => {
	        setNotifications((prev) => [...prev, notification]);
	    })
	})

	return (
		<Link
			href={"/notifications"}
			className="py-2 rounded-full hover:bg-secondary flex items-center gap-4 w-fit px-3"
		>
			<div className="relative">
				<Bell />
				{notifications.length > 0 && <div className="absolute -top-3 -right-3 rounded-full flex items-center justify-center text-sm bg-sky-500 w-5 h-5 text-bold">
                    {notifications.length}
				</div>}
			</div>
			<span className="hidden 2xl:inline">Notifications</span>
		</Link>
	);
}
