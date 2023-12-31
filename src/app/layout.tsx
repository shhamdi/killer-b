import { ThemeProvider } from "@/providers/theme-provider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { TrpcProvider } from "@/providers/trpc-provider"
import { cn } from "@/utils/classname"

import { siteConfig } from "@/config/site"
import { Toaster } from "@/components/ui/toaster"
import RenderCount from "@/components/render-count"
import TailwindIndicator from "@/components/tailwind-indicator"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "React", "TailWind CSS", "tRPC", "Radix UI"],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased selection:bg-primary selection:text-primary-foreground",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TrpcProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </TrpcProvider>
          <Toaster />
          <TailwindIndicator />
          <RenderCount />
        </ThemeProvider>
      </body>
    </html>
  )
}
