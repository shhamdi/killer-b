"use client"

import { useState } from "react"
import { User } from "next-auth"

import DashboardSidebar from "./dashboard-sidebar"
import { Icons } from "./icons"
import MainLogo from "./main-logo"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet"

interface MobileDashboardSidebarProps {
  userId: string
}

const MobileDashboardSidebar = ({ userId }: MobileDashboardSidebarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="m-0 p-0 md:hidden">
          <Icons.mobileTrigger className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <MainLogo className="flex" />
        </SheetHeader>
        <DashboardSidebar userId={userId} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileDashboardSidebar
