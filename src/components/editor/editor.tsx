"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/utils/api"
import { cn } from "@/utils/classname"
import { notePatchSchema } from "@/utils/validations/note"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorView } from "@codemirror/view"
import { zodResolver } from "@hookform/resolvers/zod"
import { Note } from "@prisma/client"
import CodeMirror, {
  basicSetup,
  ReactCodeMirrorRef,
} from "@uiw/react-codemirror"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { z } from "zod"

import { useNotes } from "@/hooks/use-queries"
import { toast } from "@/hooks/use-toast"

import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { MarkdownRenderer } from "./markdown-renderer"
import MarkdownToolbar from "./markdown-toolbar"

const extensions = [
  basicSetup({ foldGutter: false }),
  markdown({ base: markdownLanguage, codeLanguages: languages }),
  EditorView.lineWrapping,
]

// const rehypePlugins = ;

interface EditorProps extends React.ComponentPropsWithoutRef<"div"> {
  note: Pick<Note, "id" | "title" | "content" | "folderId" | "authorId">
}

const Editor = ({ note, className, ...props }: EditorProps) => {
  let currentTheme: "dark" | "light"
  const [markdownText, setMarkdownText] = useState<string>(note.content)
  const [isClient, setIsClient] = useState<boolean>(false)
  const [value, setValue] = useState<string>("editor")
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null)
  const { theme } = useTheme()
  const router = useRouter()

  const notes = useNotes({
    authorId: note.authorId,
    folderId: note.folderId,
    enabled: false,
  })

  const updateNote = api.note.updateNote.useMutation({
    onSettled: () => {
      notes.refetch()
      router.refresh()
    },
  })

  const [isSaving, setIsSaving] = useState<boolean>(false)

  type FormData = z.infer<typeof notePatchSchema>

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(notePatchSchema),
  })

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

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    // @ts-ignore
    const content = codeMirrorRef.current?.view!.viewState.state.doc.toString()

    updateNote.mutate(
      { id: note.id, title: data.title, content: content },
      {
        onError(error) {
          if (error !== null) {
            return toast({
              title: "Something went wrong",
              description: "Your note was not saved. Please try again",
              variant: "destructive",
            })
          }
        },
      }
    )

    // if (updateNote.error !== null) {
    //   return toast({
    //     title: "Something went wrong",
    //     description: "Your note was not saved. Please try again",
    //     variant: "destructive",
    //   })
    // }

    setIsSaving(false)

    router.refresh()

    return toast({
      description: "Your note has been saved",
    })
  }

  return isClient ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-3">
        <div>
          <TextareaAutosize
            id="title"
            defaultValue={note.title}
            autoFocus
            placeholder="Untitled"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
        </div>
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
            <div className="flex justify-between">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <button type="submit" className={cn(buttonVariants())}>
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Save</span>
              </button>
            </div>
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
            <TabsContent
              value="preview"
              forceMount
              hidden={value !== "preview"}
            >
              <MarkdownRenderer className="w-full" markdown={markdownText} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </form>
  ) : (
    <div className="flex h-[calc(100vh-3.5rem)] w-full items-center justify-center">
      <Icons.spinner className="h-10 w-10 animate-spin" />
    </div>
  )
}

export default Editor
