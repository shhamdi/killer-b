"use client"

import { cn } from "@/utils/classname"
import Highlight from "@tiptap/extension-highlight"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface EditorProps extends React.ComponentProps<"div"> {}

const Editor = ({ className, ...props }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-[#faf594] px-[0.25rem] rounded-[0.375rem]",
        },
      }),
      Typography.configure({
        rightArrow: "🡢",
        leftArrow: "🡠",
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "list-none p-0",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: cn(
            "flex gap-2 items-center",
            "[&>label]:mr-[0.5rem] [&>label]:select-none [&>label]:m-0",
            "[&_p]:m-0",
            "[&_div]:m-0"
          ),
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm md:prose-base dark:prose-invert max-w-none focus:outline-none border",
          "prose-headings:font-medium prose-headings:my-1",
          "prose-p:my-1 prose-p:leading-tight",
          "prose-li:my-1"
        ),
      },
    },
    content: `
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="true">And another one</li>
        </ul>
      `,
  })

  return (
    <div className={className} {...props}>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
