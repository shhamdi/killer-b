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

interface CreateNewFolderProps {
  refetch: any
  children: React.ReactNode
  userId: string
}

export const CreateNewFolder = ({
  refetch,
  children,
  userId,
}: CreateNewFolderProps) => {
  const addFolder = api.folder.createFolder.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
    onError() {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      })
    },
  })

  const [name, setName] = useState("Untitled")
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Folder</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              autoFocus
              className={cn("w-full placeholder:text-secondary-border")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              addFolder.mutate({ name: name, userId: userId })
              setName("Untitled")
            }}
          >
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

interface RenameFolderProps {
  id: string
  userId: string
  children: React.ReactNode
  refetch: any
}

export const RenameFolder = ({
  id,
  userId,
  children,
  refetch,
}: RenameFolderProps) => {
  const [name, setName] = useState<string>("")

  const renameFolder = api.folder.renameFolder.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              renameFolder.mutate(
                { id: id, userId: userId, name: name },
                {
                  onError(error) {
                    if (error.data?.zodError) {
                      toast({
                        description: error.data.zodError.fieldErrors.name,
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
              setName("")
            }}
          >
            Rename
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
