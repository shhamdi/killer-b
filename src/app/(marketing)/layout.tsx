import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
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
          "py-2 dark:border-b dark:border-secondary-border md:border-none",
          "bg-background dark:bg-secondary",
          "h-fit"
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
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
