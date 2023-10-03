import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { z } from "zod"

export const notesRouter = createTRPCRouter({
  createNote: protectedProcedure
    .input(
      z.object({
        authorId: z.string(),
        folderId: z.nullable(z.string()),
        title: z
          .string()
          .min(3, { message: "Title must be at least 3 characters" })
          .max(128, { message: "Title must be less than 128 characters" }),
      })
    )
    .mutation(async ({ input }) => {
      const { title, authorId, folderId } = input

      return await db.note.create({
        data: { title, authorId, folderId, content: "" },
      })
    }),

  renameNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        authorId: z.string(),
        title: z
          .string()
          .min(3, { message: "Title must be at least 3 characters" })
          .max(128, { message: "Title must be less than 128 characters" }),
      })
    )
    .mutation(async ({ input }) => {
      const { id, title, authorId } = input

      return await db.note.update({
        where: {
          id,
          authorId,
        },
        data: { title: title },
      })
    }),

  deleteNote: protectedProcedure
    .input(z.object({ id: z.string(), authorId: z.string() }))
    .mutation(async ({ input }) => {
      const { id, authorId } = input

      return await db.note.delete({
        where: {
          id,
          authorId,
        },
      })
    }),

  updateNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(3).max(128),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, title, content } = input

      return await db.note.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      })
    }),

  getNotes: protectedProcedure
    .input(z.object({ authorId: z.string(), folderId: z.nullable(z.string()) }))
    .query(async ({ input }) => {
      const { authorId, folderId } = input

      return await db.note.findMany({
        select: { id: true, title: true },
        where: {
          authorId,
          folderId,
        },
        orderBy: { title: "asc" },
      })
    }),

  getAllNotes: protectedProcedure
    .input(z.object({ authorId: z.string() }))
    .query(async ({ input }) => {
      const { authorId } = input

      return await db.note.findMany({
        select: { id: true, title: true },
        where: {
          authorId,
        },
        orderBy: { title: "asc" },
      })
    }),
})
