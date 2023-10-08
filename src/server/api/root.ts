// The root.ts file is used to merge tRPC routers and export them as a single router,
// as well as the router’s type definition.

import { exampleRouter } from "@/server/api/routers/example"
import { foldersRouter } from "@/server/api/routers/folders"
import { notesRouter } from "@/server/api/routers/notes"
import { createTRPCRouter } from "@/server/api/trpc"

import { usersRouter } from "./routers/users"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  folder: foldersRouter,
  note: notesRouter,
  user: usersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
