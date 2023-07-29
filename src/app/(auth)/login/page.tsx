import { Metadata } from "next"
import Link from "next/link"
import { getServerAuthSession } from "@/server/auth"

import { Icons } from "@/components/icons"
import ReturnBack from "@/components/return-back"
import UserAuthForm from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

const LoginPage = async () => {
  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <ReturnBack href="/" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-7 w-7" />
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-foreground-2">
            Enter your email and password to sign in to your account
          </p>
        </div>
        <UserAuthForm />
      </div>
      <p className="text-lg underline underline-offset-4">
        <Link href="/register">{"Don't "}have an account? Sign Up</Link>
      </p>
    </div>
  )
}

export default LoginPage
