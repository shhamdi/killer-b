"use client"

import { Dispatch, SetStateAction } from "react"

import { useFolders, useNotes } from "@/hooks/use-queries"

import FolderContext from "./folder-context"
import { CreateNewFolder } from "./folder-operations"
import { Icons } from "./icons"
import Loading from "./loading"
import NoteContext from "./note-context"
import { CreateNewNote } from "./note-operations"
import { Accordion } from "./ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface DashboardSidebarProps {
  userId: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const DashboardSidebar = ({ userId, setOpen }: DashboardSidebarProps) => {
  const getFolders = useFolders({ userId: userId })

  const getNotes = useNotes({ authorId: userId, folderId: null })

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-0 flex h-10 gap-2 bg-background py-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CreateNewNote refetch={getNotes} authorId={userId}>
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
              <CreateNewFolder refetch={getFolders} userId={userId}>
                <Icons.addFolder className="h-5 w-5" />
              </CreateNewFolder>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new folder</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div>
        <div>
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
                  setOpen={setOpen}
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
                setOpen={setOpen}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
