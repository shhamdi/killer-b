import { api } from "@/utils/api"

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
}

const FolderContext = ({
  name,
  value,
  userId,
  refetch,
}: FolderContextProps) => {
  const deleteFolder = api.folder.deleteFolder.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

  const renameFolder = api.folder.renameFolder.useMutation({
    onSettled: () => {
      refetch.refetch()
    },
  })

  const getNotesInsideFolder = api.note.getNotes.useQuery(
    { authorId: userId, folderId: value },
    { enabled: false }
  )

  const addNote = api.note.createNote.useMutation({
    onSettled: () => {
      getNotesInsideFolder.refetch()
    },
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
          <CreateNewNote authorId={userId} folderId={value} mutation={addNote}>
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault()
              }}
            >
              Add note
            </ContextMenuItem>
          </CreateNewNote>

          <RenameFolder id={value} userId={userId} mutation={renameFolder}>
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault()
              }}
            >
              Rename
            </ContextMenuItem>
          </RenameFolder>

          <ContextMenuItem
            onSelect={() => deleteFolder.mutate({ id: value, userId: userId })}
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
              />
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </ContextMenu>
  )
}

export default FolderContext
