"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { MainNavItem } from "@/types"
import { cn } from "@/utils/classname"

import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"

import { Icons } from "./icons"
import MobileNav from "./mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

const MainNav = ({ items, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="flex gap-6">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-5 w-5" />
        <span className="font-semibold">{siteConfig.name}</span>
      </Link>

      {items?.length ? (
        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item, index) => (
            <Link
              href={item.disabled ? "#" : item.href}
              key={index}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                item.href.startsWith(`/${segment}`)
                  ? "underline underline-offset-4"
                  : "",
                item.disabled &&
                  "hover:text-foureground cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <MobileNav items={marketingConfig.mainNav} />
    </div>
  )
}

export default MainNav
