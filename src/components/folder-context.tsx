import { Dispatch, SetStateAction } from "react"
import { api } from "@/utils/api"

import { useNotes } from "@/hooks/use-queries"
import { toast } from "@/hooks/use-toast"

import { RenameFolder } from "./folder-operations"
import Loading from "./loading"
import NoteContext from "./note-context"
import { CreateNewNote } from "./note-operations"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

interface FolderContextProps {
  name: string
  value: string
  userId: string
  refetch: any
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const FolderContext = ({
  name,
  value,
  userId,
  refetch,
  setOpen,
}: FolderContextProps) => {
  const deleteFolder = api.folder.deleteFolder.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

  const getNotesInsideFolder = useNotes({
    authorId: userId,
    folderId: value,
    enabled: false,
  })

  return (
    <ContextMenu modal={false}>
      <AccordionItem value={value} className="border-none">
        <ContextMenuTrigger>
          <AccordionTrigger
            className="gap-2 rounded-md px-2 py-1 text-left hover:bg-secondary"
            onClick={() => getNotesInsideFolder.refetch()}
          >
            <div className="truncate">{name}</div>
          </AccordionTrigger>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <CreateNewNote
            authorId={userId}
            folderId={value}
            refetch={getNotesInsideFolder}
          >
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault()
              }}
            >
              Add note
            </ContextMenuItem>
          </CreateNewNote>

          <RenameFolder id={value} userId={userId} refetch={refetch}>
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault()
              }}
            >
              Rename
            </ContextMenuItem>
          </RenameFolder>

          <ContextMenuItem
            onSelect={() =>
              deleteFolder.mutate(
                { id: value, userId: userId },
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
        <AccordionContent>
          {getNotesInsideFolder.isLoading ? (
            <Loading />
          ) : (
            getNotesInsideFolder.data?.map((item, index) => (
              <NoteContext
                key={index}
                id={item.id}
                title={item.title}
                authorId={userId}
                refetch={getNotesInsideFolder}
                setOpen={setOpen}
              />
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </ContextMenu>
  )
}

export default FolderContext
