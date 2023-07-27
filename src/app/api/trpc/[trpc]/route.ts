// The [trpc].ts file is the tRPC API entrypoint. It is used to handle tRPC requests.

import { appRouter } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { env } from "@/env.mjs"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            )
          }
        : undefined,
  })

export { handler as GET, handler as POST }
