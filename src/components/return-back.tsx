"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/utils/classname"

import { Icons } from "./icons"
import { Button, ButtonProps } from "./ui/button"

const ReturnBack = ({ className, ...props }: ButtonProps) => {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className={cn("absolute left-4 top-4 md:left-8 md:top-8", className)}
      onClick={() => router.back()}
      {...props}
    >
      <Icons.chevronLeft className="h-5 w-5" />
      Back
    </Button>
  )
}

export default ReturnBack
