import { undo as undoHandle } from "@codemirror/commands"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const undo: ICommand = {
  name: "Undo",
  keyCommand: "undo",
  button: { "aria-label": "undo-text" },
  icon: <Icons.undo className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    undoHandle(view)
  },
}
