"use client"

import { useState } from "react"
import { cn } from "@/utils/classname"

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
  mutation: any
  children: React.ReactNode
  userId: string
}

export const CreateNewFolder = ({
  mutation,
  children,
  userId,
}: CreateNewFolderProps) => {
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
              mutation.mutate({ name: name, userId: userId })
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
  mutation: any
}

export const RenameFolder = ({
  id,
  userId,
  children,
  mutation,
}: RenameFolderProps) => {
  const [name, setName] = useState<string>("")
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
              mutation.mutate({ id: id, userId: userId, name: name })
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
