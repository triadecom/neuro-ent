import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium tracking-[-0.6px] transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#fb623f] text-white border border-white/10 hover:opacity-90 active:scale-[0.98]",
        outline:
          "bg-[#0a0a0a] text-white border border-[#fb623f] hover:opacity-90 active:scale-[0.98]",
        ghost:
          "bg-[#0a0a0a] text-[#ccc] border border-white/10 hover:opacity-90",
        dark: "bg-[rgba(13,13,13,0.8)] text-white border border-white/10 hover:opacity-90",
      },
      size: {
        default: "px-3 py-2",
        lg: "px-4 py-2.5",
        sm: "px-3 py-1.5 text-sm",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
