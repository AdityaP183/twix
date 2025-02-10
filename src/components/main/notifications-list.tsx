"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";

type NotificationType = {
	id: string;
	senderUsername: string;
	type: "like" | "comment" | "rePost" | "follow";
	link: string;
};

export default function NotificationsList() {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);

	useEffect(() => {
		socket.on("getNotification", (notification: NotificationType) => {
			setNotifications((prev) => [...prev, notification]);
		});
	});
	return (
		<div>
            {
                notifications.length === 0 && <p className="text-center text-muted-foreground text-lg font-semibold p-3">
                    You have no notifications
                </p>
            }
			{notifications.map((notification) => (
				<div key={notification.id}>
					{notification.type === "like" && (
						<p>{notification.senderUsername} liked your post</p>
					)}
					{notification.type === "comment" && (
						<p>
							{notification.senderUsername} commented on your post
						</p>
					)}
					{notification.type === "rePost" && (
						<p>{notification.senderUsername} re-posted your post</p>
					)}
					{notification.type === "follow" && (
						<p>{notification.senderUsername} followed you</p>
					)}
				</div>
			))}
		</div>
	);
}
