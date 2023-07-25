import SiteFooter from "@/components/site-footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}
