import * as React from "react"
import { cn } from "cn"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full border border-transparent px-2.5 py-1 text-xs font-semibold",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
