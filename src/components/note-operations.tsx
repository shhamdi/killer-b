"use client"

import { useState } from "react"
import { cn } from "@/utils/classname"
import { boolean } from "zod"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Input } from "./ui/input"

interface CreateNewNoteProps {
  mutation: any
  children: React.ReactNode
  authorId: string
  folderId?: string | null
}

export const CreateNewNote = ({
  mutation,
  children,
  authorId,
  folderId = null,
}: CreateNewNoteProps) => {
  const [title, setTitle] = useState("Untitled")
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Note</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              autoFocus
              className={cn("w-full placeholder:text-secondary-border")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutation.mutate({
                title: title,
                authorId: authorId,
                folderId: folderId,
              })
              setTitle("Untitled")
            }}
          >
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

interface RenameNoteProps {
  children: React.ReactNode
  mutation: any
  id: string
  authorId: string
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const RenameNote = ({
  id,
  authorId,
  children,
  mutation,
}: RenameNoteProps) => {
  const [title, setTitle] = useState<string>("")
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter New Title</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              autoFocus
              className={cn("w-full placeholder:text-secondary-border")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutation.mutate({ id: id, title: title, authorId: authorId })
              setTitle("")
            }}
          >
            Rename
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
