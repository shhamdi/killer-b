"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/utils/classname"
import { FormData, userAuthSchema } from "@/utils/validations/auth-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, type SignInResponse } from "next-auth/react"
import { useForm } from "react-hook-form"

import { toast } from "@/hooks/use-toast"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const form = useForm<FormData>({ resolver: zodResolver(userAuthSchema) })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    const signInResult = (await signIn("credentials", {
      redirect: false,
      email: data.email.toLowerCase(),
      password: data.password,
    })) as SignInResponse

    setIsLoading(false)

    if (!signInResult?.error) {
      router.push(searchParams?.get("from") || "/dashboard")
    }

    if (signInResult?.error) {
      return toast({
        title: "Error",
        description: signInResult.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    className={cn(
                      "w-full placeholder:text-secondary-border",
                      form.formState.errors.email?.message &&
                        "focus-visible:ring-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    className={cn(
                      "w-full placeholder:text-secondary-border",
                      form.formState.errors.password?.message &&
                        "focus-visible:ring-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="my-2"
            disabled={isLoading || isGoogleLoading || isGitHubLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Login
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <div className="bg-background px-2 text-muted-foreground">
            Or continue with
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github")
        }}
        disabled={isLoading || isGitHubLoading || isGoogleLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-4 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-4 h-4 w-4" />
        )}
        Github
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("google")
        }}
        disabled={isLoading || isGitHubLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-4 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-4 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
