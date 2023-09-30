import { z } from "zod"

export const notePatchSchema = z.object({
  title: z.string().min(3).max(128),
})
