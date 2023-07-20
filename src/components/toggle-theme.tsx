"use client"

import { MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

import { Switch } from "./ui/switch"

interface ToggleThemeProps {
  className?: string
}

const ToggleTheme = ({ className }: ToggleThemeProps) => {
  const { setTheme } = useTheme()

  return (
    <Switch
      className={cn(
        "border border-gray-400 data-[state=checked]:bg-accent",
        className
      )}
      defaultChecked={false}
      onCheckedChange={(checked) => {
        return checked ? setTheme("dark") : setTheme("light")
      }}
    />
  )
}

export default ToggleTheme
