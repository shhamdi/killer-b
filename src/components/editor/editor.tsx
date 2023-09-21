"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/utils/classname"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorView, ViewUpdate } from "@codemirror/view"
import CodeMirror, {
  basicSetup,
  ReactCodeMirrorRef,
} from "@uiw/react-codemirror"
import { useTheme } from "next-themes"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { MarkdownRenderer } from "./markdown-renderer"
import MarkdownToolbar from "./markdown-toolbar"

const extensions = [
  basicSetup({ foldGutter: false }),
  markdown({ base: markdownLanguage, codeLanguages: languages }),
  EditorView.lineWrapping,
]

// const rehypePlugins = ;

interface EditorProps extends React.ComponentProps<"div"> {}

const Editor = ({ className, ...props }: EditorProps) => {
  let currentTheme: "dark" | "light"
  const [markdownText, setMarkdownText] = useState<string>("")
  const [isClient, setIsClient] = useState<boolean>(false)
  const [value, setValue] = useState<string>("editor")
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null)
  const { theme } = useTheme()

  const handleButtonClick = () => {
    if (codeMirrorRef.current !== null) {
      if (codeMirrorRef.current.view !== undefined) {
        setMarkdownText(
          // @ts-ignore
          codeMirrorRef.current.view.viewState.state.doc.toString()
        )
      }
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (theme === "light") currentTheme = "light"
  else currentTheme = "dark"

  return isClient ? (
    <>
      <div className={cn("relative", className)} {...props}>
        <Tabs
          defaultValue="editor"
          onValueChange={(value) => {
            handleButtonClick()
            if (value === "editor") setValue("editor")
            if (value === "preview") setValue("preview")
          }}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" forceMount hidden={value !== "editor"}>
            <div className="relative flex flex-col space-y-2">
              <MarkdownToolbar
                editor={codeMirrorRef}
                className="sticky top-0 w-full"
              />
              <div className="">
                <CodeMirror
                  className="w-full bg-transparent text-base"
                  value={markdownText}
                  extensions={extensions}
                  theme={currentTheme}
                  ref={codeMirrorRef}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview" forceMount hidden={value !== "preview"}>
            <MarkdownRenderer className="w-full" markdown={markdownText} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  ) : (
    <div className="flex w-full justify-center">
      <Icons.spinner className="h-10 w-10 animate-spin" />
    </div>
  )
}

export default Editor
