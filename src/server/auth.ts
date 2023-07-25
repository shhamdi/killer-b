import { db } from "@/server/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getServerSession, NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [],
}

export const getServerAuthSession = () => getServerSession(authOptions)
