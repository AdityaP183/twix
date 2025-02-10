import LeftSidebar from "@/components/main/left-sidebar";
import RightSidebar from "@/components/main/right-sidebar";

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
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
	);
}
