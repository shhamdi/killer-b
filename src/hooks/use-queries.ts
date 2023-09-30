import { api } from "@/utils/api"

export const useNotes = ({
  authorId,
  folderId,
  enabled,
}: {
  authorId: string
  folderId: string | null
  enabled?: boolean
}) => api.note.getNotes.useQuery({ authorId, folderId }, { enabled })

export const useFolders = ({ userId }: { userId: string }) =>
  api.folder.getFolders.useQuery({ userId: userId })
