import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        gold: "bg-gradient-gold text-primary font-bold hover:shadow-gold hover:scale-[1.02]",
        outline: "border-2 border-gold text-gold hover:bg-gold hover:text-primary",
        "outline-light": "border-2 border-primary-foreground/30 text-primary-foreground hover:border-gold hover:text-gold",
        ghost: "text-foreground hover:text-gold",
        navy: "bg-navy text-primary-foreground hover:bg-navy-light",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-12 text-base",
        xl: "h-16 px-16 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
