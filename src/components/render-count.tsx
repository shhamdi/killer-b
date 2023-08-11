import { env } from "@/env.mjs"

let renderCount = 0

const RenderCount = () => {
  if (env.NODE_ENV === "production") return null
  renderCount++

  return (
    <div className="fixed left-1 top-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-foreground p-3 font-mono text-xs text-white dark:text-gray-900">
      <div>{renderCount}</div>
    </div>
  )
}

export default RenderCount
