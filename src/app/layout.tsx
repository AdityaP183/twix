import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/lib/tools/theme-provider";
import QueryProvider from "@/providers/query-provider";

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
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<QueryProvider>
				<html lang="en" suppressHydrationWarning>
					<link
						rel="shortcut icon"
						href="/favicon.svg"
						type="image/x-icon"
					/>
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
						<ThemeProvider attribute="class" defaultTheme="dark">
							{children}
						</ThemeProvider>
					</body>
				</html>
			</QueryProvider>
		</ClerkProvider>
	);
}
