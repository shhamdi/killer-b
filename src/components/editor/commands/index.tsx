import { ReactCodeMirrorRef } from "@uiw/react-codemirror"

import { bold } from "@/components/editor/commands/bold"
import { code } from "@/components/editor/commands/code"
import { italic } from "@/components/editor/commands/italic"
import { link } from "@/components/editor/commands/link"
import { olist } from "@/components/editor/commands/ordered-list"
import { quote } from "@/components/editor/commands/quote"
import { redo } from "@/components/editor/commands/redo"
import { strike } from "@/components/editor/commands/strike"
import { todo } from "@/components/editor/commands/todo"
import { underline } from "@/components/editor/commands/underline"
import { undo } from "@/components/editor/commands/undo"
import { ulist } from "@/components/editor/commands/unordered-list"

export type ButtonHandle = (
  command: ICommand
  // props: IMarkdownEditor,
  // options: ToolBarProps
) => JSX.Element

export type ICommand = {
  icon?: React.ReactElement
  name?: string
  keyCommand?: string
  // button?: ButtonHandle | React.ComponentProps<"button">
  button?: any
  execute?: (editor: ReactCodeMirrorRef) => void
}

export const defaultCommands: ICommand[] = [
  bold,
  italic,
  underline,
  code,
  strike,
  link,
  quote,
  ulist,
  olist,
  todo,
  undo,
  redo,
]
