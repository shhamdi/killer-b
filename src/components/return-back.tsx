import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/utils/classname"

import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

interface ReturnBackProps extends LinkProps {
  className?: string
}

const ReturnBack = ({ className, ...props }: ReturnBackProps) => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute left-4 top-4 flex items-center space-x-1 md:left-8 md:top-8",
        className
      )}
      {...props}
    >
      <Icons.chevronLeft className="h-5 w-5" />
      <span className="inline-block">Back</span>
    </Link>
  )
}

export default ReturnBack
