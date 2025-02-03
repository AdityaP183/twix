"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function CustomIconTheme({
	lightMode,
	darkMode,
}: {
	lightMode: React.ReactNode;
	darkMode: React.ReactNode;
}) {
	const { resolvedTheme } = useTheme(); // Ensures accurate theme detection
	const [mounted, setMounted] = useState(false);

	// Ensure the component is mounted before rendering
	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent hydration mismatch by rendering only after mount
	if (!mounted) {
		return lightMode; // Return light mode as default during SSR
	}

	return <>{resolvedTheme === "dark" ? darkMode : lightMode}</>;
}
