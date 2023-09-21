import { EditorSelection } from "@codemirror/state"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const link: ICommand = {
  name: "Link",
  keyCommand: "link",
  button: { "aria-label": "Add link text" },
  icon: <Icons.link className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    if (!state || !view) return
    const main = view.state.selection.main
    const txt = view.state.sliceDoc(
      view.state.selection.main.from,
      view.state.selection.main.to
    )
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `[${txt}]()`,
      },
      selection: EditorSelection.range(main.from + 3 + txt.length, main.to + 3),
      // selection: { anchor: main.from + 4 },
    })
  },
}
