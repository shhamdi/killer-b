import { redo as redoHandle } from "@codemirror/commands"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const redo: ICommand = {
  name: "Redo",
  keyCommand: "redo",
  button: { "aria-label": "redo text" },
  icon: <Icons.redo className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    redoHandle(view)
  },
}
