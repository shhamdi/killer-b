"use client"

import { useState } from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { MainNavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

interface MobileNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

const MobileNav = ({ items, children }: MobileNavProps) => {
  const [open, setOpen] = useState(false)
  const segment = useSelectedLayoutSegment()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="m-0 p-0 md:hidden">
          <Icons.mobileTrigger className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setOpen(false)}
        >
          <Icons.logo className="h-5 w-5" />
          <span className="font-semibold">{siteConfig.name}</span>
        </Link>
        <ScrollArea>
          {items?.length ? (
            <div className="flex flex-col space-y-2 pt-6">
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
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ) : null}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
