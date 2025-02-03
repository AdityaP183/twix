"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Ensure the component is mounted before rendering
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// Return null or a placeholder during SSR to prevent mismatch
		return null;
	}
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="[&_svg]:size-7"
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</Button>
	);
}
