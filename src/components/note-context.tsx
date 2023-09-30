"use client"

import Link from "next/link"
import { api } from "@/utils/api"

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
}

const NoteContext = ({ title, id, authorId, refetch }: NoteContextProps) => {
  const renameNote = api.note.renameNote.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

  const deleteNote = api.note.deleteNote.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

  return (
    <div className="w-full rounded-md px-2 py-1 text-left hover:bg-secondary">
      <ContextMenu modal={false}>
        <ContextMenuTrigger>
          <div className="truncate">
            <Link href={`/dashboard/editor/${id}`} className="w-full">
              {title}
            </Link>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <RenameNote id={id} authorId={authorId} mutation={renameNote}>
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault()
              }}
            >
              Rename
            </ContextMenuItem>
          </RenameNote>
          <ContextMenuItem
            onSelect={() => deleteNote.mutate({ id: id, authorId: authorId })}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export default NoteContext
