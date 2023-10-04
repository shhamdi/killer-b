import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServerAuthSession } from "@/server/auth"
import { cn } from "@/utils/classname"

import { ToggleTheme } from "@/components/ui/custom-switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardSidebar from "@/components/dashboard-sidebar"
import MainLogo from "@/components/main-logo"
import MobileDashboardSidebar from "@/components/mobile-dashboard-sidebar"
import UserAccountNav from "@/components/user-account-nav"

export const metadata: Metadata = {
  title: "Dashboard",
}

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = (await getServerAuthSession())?.user

  if (!user) {
    return notFound()
  }

  return (
    <div className="relative min-h-screen">
      <header
        className={cn(
          "border-b border-secondary-border",
          "bg-background dark:bg-secondary",
          "h-14",
          "flex items-center",
          "fixed inset-x-0 top-0 z-30 w-full"
        )}
      >
        <div className="container flex items-center justify-between">
          <MainLogo />
          <MobileDashboardSidebar userId={user.id} />

          <nav className="flex items-center gap-4">
            <ToggleTheme />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </nav>
        </div>
      </header>
      <div className="container relative flex-1 items-start md:grid md:grid-cols-[300px_minmax(0,1fr)] md:gap-6">
        <aside className="hidden md:block">
          <div className="fixed inset-0 top-14 z-[50] w-[300px] border-r border-secondary-border">
            <ScrollArea className="h-full w-full">
              <div className="w-[300px] px-8">
                <DashboardSidebar userId={user.id} />
              </div>
            </ScrollArea>
          </div>
        </aside>
        <main className="relative mt-14 min-h-[calc(100vh-3.5rem)] w-full overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
