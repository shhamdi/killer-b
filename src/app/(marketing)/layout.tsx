import Link from "next/link"
import { cn } from "@/utils/classname"

import { marketingConfig } from "@/config/marketing"
import { buttonVariants } from "@/components/ui/button"
import { ToggleTheme } from "@/components/ui/custom-switch"
import MainNav from "@/components/main-nav"
import SiteFooter from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div>
      <header
        className={cn(
          // "border-b border-secondary-border md:border-none",
          "shadow-sm md:shadow-none",
          "bg-background dark:bg-secondary",
          "h-14 py-2",
          "fixed inset-x-0 top-0",
          "flex items-center"
        )}
      >
        <div className="container flex items-center justify-between">
          <MainNav items={marketingConfig.mainNav} />
          <nav className="flex items-center gap-4">
            <ToggleTheme />
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" })
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="mt-14">{children}</main>
      <SiteFooter />
    </div>
  )
}
