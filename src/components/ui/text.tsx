import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        default:
          "text-foreground",
        title:
          "font-semibold text-card-foreground",
      },
      size: {
        default: "text-base",
        sm: "text-xs",
        lg: "text-lg"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SpanProps
  extends React.ParamHTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

const Text = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"
    return (
      <Comp
        className={cn(textVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
