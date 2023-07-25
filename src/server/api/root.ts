// The root.ts file is used to merge tRPC routers and export them as a single router,
// as well as the router’s type definition.

import { exampleRouter } from "@/server/api/routers/example"
import { createTRPCRouter } from "@/server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
