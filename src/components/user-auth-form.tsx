"use client"

import { signIn } from "next-auth/react"

import { Button } from "./ui/button"

const UserAuthForm = () => {
  return (
    <div>
      <Button onClick={() => signIn()}>sign in</Button>
    </div>
  )
}

export default UserAuthForm
