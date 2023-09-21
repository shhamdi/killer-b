import { Icons } from "@/components/icons"

import { ICommand } from "."

export const olist: ICommand = {
  name: "Ordered list",
  keyCommand: "olist",
  button: { "aria-label": "Add ordered list" },
  icon: <Icons.orderedList className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from)
    let mark = "1. "
    const matchMark = lineInfo.text.match(/^\1\./)
    if (matchMark && matchMark[0]) {
      mark = ""
    }
    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: `${mark}${lineInfo.text}`,
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: view.state.selection.main.from + mark.length },
    })
  },
}
