import SiteFooter from "@/components/site-footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <main>{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}
