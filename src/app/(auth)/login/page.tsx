import { Metadata } from "next"
import Link from "next/link"

import { Icons } from "@/components/icons"
import ReturnBack from "@/components/return-back"
import UserAuthForm from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

const LoginPage = async () => {
  return (
    <div className="container my-auto flex flex-col items-center justify-center overflow-y-auto">
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
      <p className="py-2 text-lg underline underline-offset-4">
        <Link href={"/register"}>{"Don't "}have an account? Sign Up</Link>
      </p>
    </div>
  )
}

export default LoginPage
