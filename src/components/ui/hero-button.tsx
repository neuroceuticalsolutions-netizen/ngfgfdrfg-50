import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const heroButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        hero: "bg-royal-purple text-primary-foreground hover:bg-fresh-teal hover:scale-105 transform shadow-purple hover:shadow-teal",
        outline: "border-2 border-royal-purple text-royal-purple bg-transparent hover:bg-royal-purple hover:text-primary-foreground",
        ghost: "text-royal-purple hover:bg-royal-purple/10 hover:text-royal-purple-dark",
        teal: "bg-fresh-teal text-accent-foreground hover:bg-fresh-teal-dark hover:scale-105 transform shadow-teal",
      },
      size: {
        default: "h-10 sm:h-12 px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base",
        sm: "h-8 sm:h-10 px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm",
        lg: "h-12 sm:h-14 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg",
        xl: "h-14 sm:h-16 px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl",
      },
    },
    defaultVariants: {
      variant: "hero",
      size: "default",
    },
  }
)

export interface HeroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heroButtonVariants> {
  asChild?: boolean
}

const HeroButton = React.forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(heroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
HeroButton.displayName = "HeroButton"

export { HeroButton, heroButtonVariants }