import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ToggleTheme from "@/components/toggle-theme"

export default function Home() {
  return (
    <div className="container flex flex-col justify-center gap-6">
      <div className="flex items-center justify-between">
        <h1 className="mb-8 mt-8 text-9xl font-bold">Heading </h1>
        <ToggleTheme />
      </div>
      <p className="font-semibold text-foreground-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et animi
        asperiores cum fuga inventore quam ratione laboriosam aut explicabo
        perspiciatis. Iusto nulla facere dolore odio id hic nisi ducimus. Velit!
      </p>
      <div className="flex items-center justify-start gap-3">
        <Button className="w-[300px]" variant="default">
          default button
        </Button>
        <Button className="w-[300px]" variant="secondary">
          secondary button
        </Button>
      </div>

      <Input placeholder="email" />
    </div>
  )
}
