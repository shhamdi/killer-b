import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { db } from "@/server/db"
import { hash } from "bcrypt"
import { z } from "zod"

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(3).max(128),
        lastName: z.string().min(3).max(128),
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      let { firstName, lastName, email, password } = input

      const user = await db.user.findUnique({
        where: { email: email.toLocaleLowerCase() },
      })

      if (user) {
        throw new Error("User already exist")
      }

      const name = firstName.trim() + " " + lastName.trim()
      password = await hash(password, 12)

      return await db.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          password,
        },
      })
    }),
})
