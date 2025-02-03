import * as React from "react";
import { cn } from "@/lib/utils";

interface ExtraInputProps {
	transparent?: boolean;
	autoResize?: boolean;
}

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea"> & ExtraInputProps
>(({ className, transparent, autoResize, ...props }, ref) => {
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	// Auto-resizing effect
	React.useEffect(() => {
		if (autoResize && (textareaRef.current || ref)) {
			const textarea =
				textareaRef.current ||
				(ref as React.RefObject<HTMLTextAreaElement>).current;

			const handleInput = () => {
				textarea.style.height = "auto"; // Reset height
				textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height
			};

			handleInput(); // Run on mount to set correct height if content exists

			if (textarea) {
				textarea.addEventListener("input", handleInput);
				return () => {
					textarea.removeEventListener("input", handleInput);
				};
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoResize]);

	return (
		<textarea
			ref={textareaRef || ref} // Pass ref properly
			className={cn(
				"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				transparent && "focus-visible:ring-0",
				className
			)}
			{...props}
		/>
	);
});

Textarea.displayName = "Textarea";

export { Textarea };
