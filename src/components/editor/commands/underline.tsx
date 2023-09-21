import { EditorSelection } from "@codemirror/state"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const underline: ICommand = {
  name: "Underline",
  keyCommand: "underline",
  button: { "aria-label": "Add underline text" },
  icon: <Icons.underline className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: "<u>" },
          { from: range.to, insert: "</u>" },
        ],
        range: EditorSelection.range(range.from + 3, range.to + 3),
      }))
    )
  },
}
