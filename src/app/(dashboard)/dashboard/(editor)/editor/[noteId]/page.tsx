import { notFound, redirect } from "next/navigation"
import { authOptions, getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import { Note, User } from "@prisma/client"

import Editor from "@/components/editor/editor"

async function getNoteForUser(noteId: Note["id"], userId: User["id"]) {
  return await db.note.findFirst({
    where: {
      id: noteId,
      authorId: userId,
    },
  })
}

interface NotePageProps {
  params: { noteId: string }
}

const NotePage = async ({ params }: NotePageProps) => {
  const user = (await getServerAuthSession())?.user

  // const updateNote = api.note.updateNote.useMutation()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login")
  }

  const note = await getNoteForUser(params.noteId, user.id)

  if (!note) {
    notFound()
  }

  return (
    <Editor
      note={{ id: note.id, title: note.title, content: note.content }}
      className="my-4"
      user={{ id: user.id }}
    />
  )
}

export default NotePage
