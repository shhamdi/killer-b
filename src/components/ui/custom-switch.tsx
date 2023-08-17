"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/utils/classname"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { useTheme } from "next-themes"

import { Icons } from "../icons"

const ToggleTheme = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme()
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    isClient && (
      <div className="flex items-center gap-2">
        <SwitchPrimitives.Root
          aria-label="dark-mode-toggle"
          className={cn(
            "relative",
            "peer inline-flex h-5 w-[43px] shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            "border border-gray-400 data-[state=checked]:bg-accent",
            className
          )}
          {...props}
          ref={ref}
          defaultChecked={theme === "dark"}
          onCheckedChange={(checked) =>
            checked ? setTheme("dark") : setTheme("light")
          }
        >
          <Icons.moon className="absolute left-0 h-4 w-4" />
          <Icons.sun className="absolute right-0 h-4 w-4" />
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:bg-secondary-border"
            )}
          />
        </SwitchPrimitives.Root>
      </div>
    )
  )
})
ToggleTheme.displayName = SwitchPrimitives.Root.displayName

export { ToggleTheme }
