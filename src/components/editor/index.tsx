"use client"

import { useEffect, useState } from "react"
import { cn } from "@/utils/classname"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorView, ViewUpdate } from "@codemirror/view"
import CodeMirror, { basicSetup } from "@uiw/react-codemirror"
import { useTheme } from "next-themes"

import { Icons } from "../icons"
import { MarkdownRenderer } from "./markdown-renderer"

const extensions = [
  basicSetup({ foldGutter: false }),
  markdown({ base: markdownLanguage, codeLanguages: languages }),
  EditorView.lineWrapping,
]

// const rehypePlugins = ;

const Editor = () => {
  let currentTheme: "dark" | "light"
  const [input, setInput] = useState<string>("")
  const [isClient, setIsClient] = useState<boolean>(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (theme === "light") currentTheme = "light"
  else currentTheme = "dark"

  return isClient ? (
    <div className="container grid grid-cols-2 gap-10">
      <div>
        <CodeMirror
          className=" bg-transparent text-base"
          value={input}
          onChange={(value, viewUpdate: ViewUpdate) => setInput(value)}
          extensions={extensions}
          theme={currentTheme}
        />
      </div>
      <div>
        <MarkdownRenderer className="container mx-auto" markdown={input} />
      </div>
    </div>
  ) : (
    <div className="flex w-full justify-center">
      <Icons.spinner className="h-10 w-10 animate-spin" />
    </div>
  )
}

export default Editor
