"use client"

import { MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "./ui/switch"

const ToggleTheme = () => {
  const { setTheme } = useTheme()

  return (
    <Switch
      className="border border-gray-400 data-[state=checked]:bg-accent"
      defaultChecked={false}
      onCheckedChange={(checked) => {
        return checked ? setTheme("dark") : setTheme("light")
      }}
    />
  )
}

export default ToggleTheme
