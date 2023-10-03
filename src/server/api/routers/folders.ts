import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { z } from "zod"

export const foldersRouter = createTRPCRouter({
  createFolder: protectedProcedure
    .input(z.object({ userId: z.string(), name: z.string().min(3).max(128) }))
    .mutation(async ({ input }) => {
      const { name, userId } = input

      return await db.folder.create({
        data: { name, userId },
      })
    }),

  renameFolder: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        name: z
          .string()
          .min(3, { message: "Folder name must be at least 3 characters" })
          .max(128, {
            message: "Folder name must be less than 128 characters",
          }),
      })
    )
    .mutation(async ({ input }) => {
      const { id, userId, name } = input

      return await db.folder.update({
        where: {
          id,
          userId,
        },
        data: { name },
      })
    }),

  deleteFolder: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const { id, userId } = input

      return await db.folder.delete({
        where: {
          id,
          userId,
        },
      })
    }),

  getFolders: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input

      const folders = await db.folder.findMany({
        select: { id: true, name: true },
        where: {
          userId,
        },
        orderBy: { name: "asc" },
      })
      return folders
    }),
})
