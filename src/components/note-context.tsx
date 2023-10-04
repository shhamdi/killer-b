"use client"

import { Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { api } from "@/utils/api"

import { toast } from "@/hooks/use-toast"

import { RenameNote } from "./note-operations"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

interface NoteContextProps {
  title: string
  id: string
  authorId: string
  refetch: any
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const NoteContext = ({
  title,
  id,
  authorId,
  refetch,
  setOpen,
}: NoteContextProps) => {
  const deleteNote = api.note.deleteNote.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

  return (
    <div className="w-full rounded-md px-2 py-1 text-left hover:bg-secondary">
      <ContextMenu modal={false}>
        <ContextMenuTrigger>
          <Link
            href={`/dashboard/editor/${id}`}
            className="w-full"
            onClick={() => {
              if (setOpen) {
                setOpen(false)
              }
            }}
          >
            <div className="truncate">{title}</div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <RenameNote id={id} authorId={authorId} refetch={refetch}>
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault()
              }}
            >
              Rename
            </ContextMenuItem>
          </RenameNote>
          <ContextMenuItem
            onSelect={() =>
              deleteNote.mutate(
                { id: id, authorId: authorId },
                {
                  onError() {
                    toast({
                      title: "Something went wrong",
                      description: "Please try again",
                      variant: "destructive",
                    })
                  },
                }
              )
            }
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export default NoteContext
