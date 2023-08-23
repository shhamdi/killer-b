"use client"

import { useEffect, useRef, useState } from "react"
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

const extensions = [
  basicSetup({ foldGutter: false }),
  markdown({ base: markdownLanguage, codeLanguages: languages }),
  EditorView.lineWrapping,
]

// const rehypePlugins = ;

const Editor = () => {
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
      {/* <div className="container grid grid-cols-2 gap-10"> */}
      <Tabs
        defaultValue="editor"
        onValueChange={(value) => {
          handleButtonClick()
          if (value === "editor") setValue("editor")
          if (value === "preview") setValue("preview")
        }}
        className="container"
      >
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <CodeMirror
            className="container bg-transparent text-base"
            value={markdownText}
            extensions={extensions}
            theme={currentTheme}
            ref={codeMirrorRef}
          />
        </TabsContent>
        <TabsContent value="preview" forceMount hidden={value !== "preview"}>
          <MarkdownRenderer
            className="container mx-auto"
            markdown={markdownText}
          />
        </TabsContent>
      </Tabs>

      {/* </div> */}
    </>
  ) : (
    <div className="flex w-full justify-center">
      <Icons.spinner className="h-10 w-10 animate-spin" />
    </div>
  )
}

export default Editor
