import NotificationsList from "@/components/main/notifications-list";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Notification() {
	
	return (
		<div>
			{/* Top Bar */}
			<div className="flex items-center gap-10 p-4 bg-secondary/50 sticky top-0 backdrop-blur-md z-10">
				<Link href="/">
					<ArrowLeft />
				</Link>
				<h3 className="text-xl font-bold">Notifications</h3>
			</div>

            <NotificationsList />
		</div>
	);
}
