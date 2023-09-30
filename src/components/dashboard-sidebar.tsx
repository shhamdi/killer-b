"use client"

import { Suspense } from "react"
import { api } from "@/utils/api"

import FolderContext from "./folder-context"
import { CreateNewFolder } from "./folder-operations"
import { Icons } from "./icons"
import Loading from "./loading"
import NoteContext from "./note-context"
import { CreateNewNote } from "./note-operations"
import { Accordion } from "./ui/accordion"
import { Skeleton } from "./ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface DashboardSidebarProps {
  userId: string
}

const DashboardSidebar = ({ userId }: DashboardSidebarProps) => {
  const getFolders = api.folder.getFolders.useQuery({ userId: userId })
  const addFolder = api.folder.createFolder.useMutation({
    onSettled: () => {
      getFolders.refetch()
    },
  })

  const getNotes = api.note.getNotes.useQuery({
    authorId: userId,
    folderId: null,
  })
  const addNote = api.note.createNote.useMutation({
    onSettled: () => {
      getNotes.refetch()
    },
  })

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-0 flex h-10 gap-2 py-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CreateNewNote mutation={addNote} authorId={userId}>
                <button>
                  <Icons.addNote className="h-5 w-5" />
                </button>
              </CreateNewNote>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new note</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CreateNewFolder mutation={addFolder} userId={userId}>
                <Icons.addFolder className="h-5 w-5" />
              </CreateNewFolder>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new folder</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <Icons.sort className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-full">
        <Accordion type="multiple">
          {getFolders.isLoading ? (
            <Loading />
          ) : (
            getFolders.data?.map((item, index) => (
              <FolderContext
                key={index}
                value={item.id}
                name={item.name}
                userId={userId}
                refetch={getFolders}
              />
            ))
          )}
        </Accordion>
      </div>

      <div>
        {getNotes.isLoading ? (
          <Loading />
        ) : (
          getNotes.data?.map((item, index) => (
            <NoteContext
              key={index}
              id={item.id}
              title={item.title}
              authorId={userId}
              refetch={getNotes}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default DashboardSidebar
