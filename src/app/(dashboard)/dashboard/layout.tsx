import { notFound } from "next/navigation"
import { getServerAuthSession } from "@/server/auth"
import { cn } from "@/utils/classname"

import { ToggleTheme } from "@/components/ui/custom-switch"
import MainNav from "@/components/main-nav"
import SiteFooter from "@/components/site-footer"
import UserAccountNav from "@/components/user-account-nav"

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
    <div>
      <header
        className={cn(
          "py-2 dark:border-b dark:border-secondary-border md:border-none",
          "bg-background dark:bg-secondary",
          "h-fit"
        )}
      >
        <div className="container flex items-center justify-between">
          <MainNav />
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
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
