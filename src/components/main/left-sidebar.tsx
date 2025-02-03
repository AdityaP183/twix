import {
	Bell,
	Compass,
	Home,
	MessageCircleMore,
	Tags,
	UserCircle2,
	Users2Icon,
} from "lucide-react";
// import Image from "next/image";
import Image from "../secondary/image";
import Link from "next/link";
import { Button } from "../ui/button";
import ThemeToggle from "../secondary/theme-toggle";
import CustomIconTheme from "../secondary/custom-icon-theme";

const menuItems = [
	{
		id: 1,
		label: "Home",
		link: "/",
		icon: Home,
	},
	{
		id: 2,
		label: "Explore",
		link: "/",
		icon: Compass,
	},
	{
		id: 3,
		label: "Notification",
		link: "/",
		icon: Bell,
	},
	{
		id: 4,
		label: "Messages",
		link: "/",
		icon: MessageCircleMore,
	},
	{
		id: 5,
		label: "Bookmarks",
		link: "/",
		icon: Tags,
	},
	{
		id: 6,
		label: "Communities",
		link: "/",
		icon: Users2Icon,
	},
	{
		id: 7,
		label: "Profile",
		link: "/aditya19p",
		icon: UserCircle2,
	},
];

export default function LeftSidebar() {
	return (
		<div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
			{/* LOGO MENU BUTTON */}
			<div className="flex flex-col gap-4 text-lg items-center 2xl:items-start">
				{/* LOGO */}
				<Link href="/" className="px-2 py-4">
					<CustomIconTheme
						lightMode={
							<Image
								path="/assets/logo-light.svg"
								alt="logo"
								w={35}
								h={35}
								className="block 2xl:hidden"
							/>
						}
						darkMode={
							<Image
								path="/assets/logo-dark.svg"
								alt="logo"
								w={35}
								h={35}
								className="block 2xl:hidden"
							/>
						}
					/>
					<CustomIconTheme
						lightMode={
							<Image
								path="/assets/full-logo-light.svg"
								alt="logo"
								w={75}
								h={45}
								className="hidden 2xl:block"
							/>
						}
						darkMode={
							<Image
								path="/assets/full-logo-dark.svg"
								alt="logo"
								w={75}
								h={45}
								className="hidden 2xl:block"
							/>
						}
					/>
				</Link>
				{/* MENU LIST */}
				<div className="flex flex-col gap-4">
					{menuItems.map((item) => (
						<Link
							href={item.link}
							className="py-2 rounded-full hover:bg-secondary flex items-center gap-4 w-fit px-3"
							key={item.id}
						>
							<item.icon />
							<span className="hidden 2xl:inline">
								{item.label}
							</span>
						</Link>
					))}
				</div>
				{/* Post Button */}
				<Link
					href="/compose/post"
					className="rounded-full w-12 2xl:w-full h-12 flex items-center justify-center overflow-hidden"
				>
					<Button className="w-full h-full">
						<CustomIconTheme
							lightMode={
								<Image
									path={"/assets/post-light.svg"}
									alt="new post"
									w={25}
									h={25}
								/>
							}
							darkMode={
								<Image
									path={"/assets/post-dark.svg"}
									alt="new post"
									w={25}
									h={25}
								/>
							}
						/>
						<span className="hidden 2xl:inline text-xl font-medium">
							Post
						</span>
					</Button>
				</Link>

				{/* Theme Toggle Button */}
				<ThemeToggle />
			</div>
			{/* USER */}
			<div className="flex items-center justify-center 2xl:justify-between">
				<div className="flex items-center gap-2">
					<div className="w-10 h-10 relative rounded-full overflow-hidden cursor-pointer 2xl:cursor-default">
						<Image
							path="/assets/temp-images/user.jpg"
							alt="user"
							tr={true}
						/>
					</div>
					<div className="hidden 2xl:flex flex-col">
						<span className="font-bold">Aditya Prasad</span>
						<span className="text-sm text-muted-foreground">
							@adityap12
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
