import Link from "next/link"
import { cn } from "@/utils/classname"

import { siteConfig } from "@/config/site"

import { Icons } from "./icons"

interface MainLogoProps {
  className?: string
}

const MainLogo = ({ className }: MainLogoProps) => {
  return (
    <Link
      href="/"
      className={cn("hidden items-center space-x-2 md:flex", className)}
    >
      <Icons.logo className="h-5 w-5" />
      <span className="font-semibold">{siteConfig.name}</span>
    </Link>
  )
}

export default MainLogo
