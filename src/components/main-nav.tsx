"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { MainNavItem } from "@/types"
import { cn } from "@/utils/classname"

import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"

import { Icons } from "./icons"
import MainLogo from "./main-logo"
import MobileNav from "./mobile-nav"

interface MainNavProps extends React.ComponentPropsWithoutRef<"div"> {
  items?: MainNavItem[]
  children?: React.ReactNode
  className?: string
}

const MainNav = ({ items, children, className }: MainNavProps) => {
  const segment = useSelectedLayoutSegment()

  return (
    <div className={cn("flex gap-6", className)}>
      <MainLogo />

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
      <MobileNav items={items} />
    </div>
  )
}

export default MainNav
