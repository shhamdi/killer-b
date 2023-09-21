import { cn } from "@/utils/classname"
import { ReactCodeMirrorRef } from "@uiw/react-codemirror"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { defaultCommands, ICommand } from "./commands"

interface MarkdownToolbarProps extends React.ComponentPropsWithoutRef<"div"> {
  editor: React.RefObject<ReactCodeMirrorRef>
}

const MarkdownToolbar = ({
  editor,
  className,
  ...props
}: MarkdownToolbarProps) => {
  function handleClick(execute: ICommand["execute"]) {
    if (execute) {
      execute(editor.current!)
    }
  }

  return (
    <div className={cn("flex gap-1 overflow-x-auto", className)} {...props}>
      {defaultCommands.map((command, key) => {
        const buttonProps: React.ComponentPropsWithoutRef<"button"> = {}

        if (!command) return null

        buttonProps.children = command.icon
        buttonProps.onClick = () => handleClick(command.execute)
        ;(
          Object.keys(
            command.button
          ) as (keyof React.ComponentPropsWithoutRef<"button">)[]
        ).forEach((key) => {
          buttonProps[key] = command.button[key]
        })

        return (
          <TooltipProvider key={key}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"outline"}
                  {...buttonProps}
                  className="rounded-sm"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{command.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </div>
  )
}

export default MarkdownToolbar
