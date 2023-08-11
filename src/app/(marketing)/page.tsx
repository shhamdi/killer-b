import Link from "next/link"
import { cn } from "@/utils/classname"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import MarketingImg from "@/components/marketing-img"

export default function Home() {
  return (
    <>
      <section className="justify-center pb-10 pt-16 md:pb-16 md:pt-24 lg:pb-24 lg:pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center justify-between gap-6 md:flex-row">
          <div className=" flex flex-col items-start gap-4 text-left">
            <h1
              className={cn(
                "text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl",
                "leading-tight sm:leading-tight md:leading-tight lg:leading-tight",
                "max-w-lg"
              )}
            >
              A markdown-based note-taking app built using Next.js 13{" "}
            </h1>
            <p className="max-w-lg font-normal text-foreground-2 sm:text-xl sm:leading-tight">
              {"I've "} built this web app with Next.js 13 for learning purpose.
              Check the github repository for the source code.
            </p>
            <div className="space-x-4">
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get Started
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                GitHub
              </Link>
            </div>
          </div>
          <div>
            <MarketingImg className=" h-60 w-60 md:h-96 md:w-96" />
          </div>
        </div>
      </section>
      <section
        id="features"
        className="space-y-6 bg-accent/50 py-8 md:py-12 lg:py-24"
      >
        <div className="container flex flex-col items-center space-y-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Features
          </h2>
          <p className="max-w-3xl font-normal text-foreground-2 sm:text-xl sm:leading-tight">
            As the main purpose of this project is to learn how to build modern
            web app, {"I've "} tried to use multiple technologies in combination
            with Next.js 13.
          </p>
        </div>
        <div className="container grid max-w-5xl justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div
            className={cn(
              "rounded-sm border border-secondary-border bg-white p-8 dark:bg-transparent",
              "space-y-3"
            )}
          >
            <Icons.nextjs className="h-12 w-12 text-primary" />
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Next.js 13</h3>
              <p className="text-sm text-foreground-2">
                App dir, Routing, Layouts, Loading UI and Route handlers.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "rounded-sm border border-secondary-border bg-white p-8 dark:bg-transparent",
              "space-y-3"
            )}
          >
            <Icons.react className="h-12 w-12 text-primary" />
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">React 18</h3>
              <p className="text-sm text-foreground-2">
                Client components, Server components and Suspence.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "rounded-sm border border-secondary-border bg-white p-8 dark:bg-transparent",
              "space-y-3"
            )}
          >
            <Icons.prisma className="h-12 w-12 text-primary" />
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Database</h3>
              <p className="text-sm text-foreground-2">
                Prisma as an ORM and serverless MySQL on PlanetScale.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "rounded-sm border border-secondary-border bg-white p-8 dark:bg-transparent",
              "space-y-3"
            )}
          >
            <Icons.tailwind className="h-12 w-12 text-primary" />
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Components</h3>
              <p className="text-sm text-foreground-2">
                UI components based on shadcn/ui and styled using Tailwind CSS.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "rounded-sm border border-secondary-border bg-white p-8 dark:bg-transparent",
              "space-y-3"
            )}
          >
            <Icons.nextAuth className="h-12 w-12 text-primary" />
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Authentication</h3>
              <p className="text-sm text-foreground-2">
                Google, Github and email and password authentication with
                NextAuth.js.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "rounded-sm border border-secondary-border bg-white p-8 dark:bg-transparent",
              "space-y-3"
            )}
          >
            <Icons.trpc className="h-12 w-12 text-primary" />
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Typesafe API</h3>
              <p className="text-sm text-foreground-2">
                Typesafe API using tRPC in conjunction with zod validator.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
