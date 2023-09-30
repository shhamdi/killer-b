import { Skeleton } from "./ui/skeleton"

const Loading = () => {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export default Loading
