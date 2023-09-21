import React from "react"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const ulist: ICommand = {
  name: "Unordered list",
  keyCommand: "ulist",
  button: { "aria-label": "Add ulist text" },
  icon: <Icons.unorderedList className="h-4 w-4" />,
  execute: ({ state, view }) => {
    if (!state || !view) return
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from)
    let mark = "- "
    const matchMark = lineInfo.text.match(/^-/)
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
