"use client"

import { useState } from "react"
import { api } from "@/utils/api"
import { cn } from "@/utils/classname"

import { toast } from "@/hooks/use-toast"

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
  refetch: any
  children: React.ReactNode
  authorId: string
  folderId?: string | null
}

export const CreateNewNote = ({
  refetch,
  children,
  authorId,
  folderId = null,
}: CreateNewNoteProps) => {
  const addNote = api.note.createNote.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

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
              addNote.mutate(
                {
                  title: title,
                  authorId: authorId,
                  folderId: folderId,
                },
                {
                  onError(error) {
                    if (error.data?.zodError) {
                      toast({
                        description: error.data.zodError.fieldErrors.title,
                        variant: "destructive",
                      })
                    } else {
                      toast({
                        title: "Something went wrong",
                        description: "Please try again",
                        variant: "destructive",
                      })
                    }
                  },
                }
              )
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
  refetch: any
  id: string
  authorId: string
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const RenameNote = ({
  id,
  authorId,
  children,
  refetch,
}: RenameNoteProps) => {
  const renameNote = api.note.renameNote.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

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
              renameNote.mutate(
                { id: id, title: title, authorId: authorId },
                {
                  onError(error) {
                    if (error.data?.zodError) {
                      toast({
                        description: error.data.zodError.fieldErrors.title,
                        variant: "destructive",
                      })
                    } else {
                      toast({
                        title: "Something went wrong",
                        description: "Please try again",
                        variant: "destructive",
                      })
                    }
                  },
                }
              )
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
