import * as React from "react";

import { cn } from "@/lib/utils";

interface ExtraInputProps {
	transparent?: boolean;
}

const Input = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input"> & ExtraInputProps
>(({ className, type, transparent, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				transparent && "border-none focus-visible:ring-0",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

export { Input };
