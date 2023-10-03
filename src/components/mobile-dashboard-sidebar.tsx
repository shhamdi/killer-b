"use client"

import { useState } from "react"

import { Icons } from "./icons"
import MainLogo from "./main-logo"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface MobileDashboardSidebarProps {
  children: React.ReactNode
}

const MobileDashboardSidebar = ({ children }: MobileDashboardSidebarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="m-0 p-0 md:hidden">
          <Icons.mobileTrigger className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <MainLogo className="flex" />
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default MobileDashboardSidebar
