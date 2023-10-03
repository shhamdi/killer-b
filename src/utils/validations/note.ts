import { z } from "zod"

export const notePatchSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(128, { message: "Title must be less than 128 characters" }),
})
