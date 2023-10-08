"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/utils/api"
import { cn } from "@/utils/classname"
import { registerUserSchema } from "@/utils/validations/auth-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, type SignInResponse } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const RegisterForm = () => {
  type FormData = z.infer<typeof registerUserSchema>
  const form = useForm<FormData>({ resolver: zodResolver(registerUserSchema) })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  const router = useRouter()

  const user = api.user.createUser.useMutation()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    user.mutate(
      {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password,
      },
      {
        onSettled() {
          setIsLoading(false)
        },
        onError(error) {
          return toast({ description: error.message, variant: "destructive" })
        },
        async onSuccess() {
          const signInResult = (await signIn("credentials", {
            redirect: false,
            email: data.email.toLowerCase(),
            password: data.password,
          })) as SignInResponse

          setIsLoading(false)

          if (!signInResult?.error) {
            router.push("/dashboard")
          }

          if (signInResult?.error) {
            return toast({
              title: "Something went wrong",
              description: "Please try again",
              variant: "destructive",
            })
          }
        },
      }
    )
  }

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-2"
        >
          <div className="flex justify-between gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
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
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
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
          </div>
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
            Register
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

export default RegisterForm
