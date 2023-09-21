import { EditorSelection } from "@codemirror/state"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const italic: ICommand = {
  name: "Italic",
  keyCommand: "italic",
  button: { "aria-label": "Add italic text" },
  icon: <Icons.italic className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: "*" },
          { from: range.to, insert: "*" },
        ],
        range: EditorSelection.range(range.from + 1, range.to + 1),
      }))
    )
  },
}
