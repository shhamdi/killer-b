import { Metadata } from "next"
import Link from "next/link"

import { Icons } from "@/components/icons"
import RegisterForm from "@/components/register-form"
import ReturnBack from "@/components/return-back"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create new account",
}

const RegisterPage = () => {
  return (
    <div className="container my-auto flex min-h-screen flex-col items-center justify-center overflow-y-auto">
      <ReturnBack href="/" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-7 w-7" />
          <h1 className="text-2xl font-semibold">Create an account</h1>
        </div>
        <RegisterForm />
      </div>
      <p className="py-2 text-lg underline underline-offset-4">
        <Link href={"/login"}>Already have an account? Login</Link>
      </p>
    </div>
  )
}

export default RegisterPage
