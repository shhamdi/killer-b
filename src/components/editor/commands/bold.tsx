import { EditorSelection } from "@codemirror/state"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const bold: ICommand = {
  name: "Bold",
  keyCommand: "bold",
  button: { "aria-label": "Add bold text" },
  icon: <Icons.bold className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: "**" },
          { from: range.to, insert: "**" },
        ],
        range: EditorSelection.range(range.from + 2, range.to + 2),
      }))
    )
  },
}
