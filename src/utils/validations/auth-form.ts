import z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export type FormData = z.infer<typeof userAuthSchema>

export const registerUserSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(128, { message: "First name must be less than 128 charaters" }),
  lastname: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(128, { message: "Last name must be less than 128 charaters" }),

  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
})
