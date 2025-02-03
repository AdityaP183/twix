import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/tools/theme-provider";
import LeftSidebar from "@/components/main/left-sidebar";
import RightSidebar from "@/components/main/right-sidebar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Twix - Stay Connected, Stay Updated",
	description:
		"Join Twix to share your thoughts, explore trending topics, and engage with the world in real-time.",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex justify-between">
						<div className="px-2 xs:px-4 2xl:px-6 2xl:mx-2">
							<LeftSidebar />
						</div>
						<div className="flex-1 lg:min-w-[600px] border-x-[1px] border-border">
							{children}
							{modal}
						</div>
						<div className="hidden lg:flex ml-4 md:ml-8 flex-1">
							<RightSidebar />
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
