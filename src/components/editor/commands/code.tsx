import { EditorSelection } from "@codemirror/state"

import { Icons } from "@/components/icons"

import { ICommand } from "."

export const code: ICommand = {
  name: "code",
  keyCommand: "code",
  button: { "aria-label": "Insert code" },
  icon: (
    <svg viewBox="0 0 48 48" fill="none" height="15" width="15">
      <path
        d="M16 13 4 25.432 16 37m16-24 12 12.432L32 37"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m28 4-7 40"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: "`" },
          { from: range.to, insert: "`" },
        ],
        range: EditorSelection.range(range.from + 1, range.to + 1),
      }))
    )
  },
}

export const codeBlock: ICommand = {
  name: "Code",
  keyCommand: "codeBlock",
  button: { "aria-label": "Insert Code Block" },
  icon: <Icons.code className="h-4 w-4" />,
  execute: ({ state, view }) => {
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
        insert: `\`\`\`js\n${txt}\n\`\`\``,
      },
      selection: EditorSelection.range(main.from + 3, main.from + 5),
    })
  },
}
