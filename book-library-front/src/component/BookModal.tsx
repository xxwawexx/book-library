import { useAuthors, Author } from "../hooks/useAuthors"
import { useEffect, useState } from "react"

interface BookModalProps {
  open: boolean
  onClose: () => void
  
  initialData?: { id?: number, title?: string, authorId?: number }
  onSubmit: (data: { title: string; authorId: number }, id?: number) => void
}

export default function BookModal({ open, onClose, initialData, onSubmit }: BookModalProps) {
  const [title, setTitle] = useState("")
  const [authorId, setAuthorId] = useState<number | "">("")
  const { authors, loading, error } = useAuthors()

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title || "")
      setAuthorId(initialData?.authorId ?? "")
    }
  }, [open, initialData])

  if (!open) return null

  const isEdit = !!initialData?.id

  return (
    <div className="fixed inset-0 z-30 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-80 shadow-xl relative animate-fade-in">
        <button className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose} aria-label="Close modal">×</button>
        <h2 className="text-xl font-semibold mb-5 text-blue-700">{isEdit ? "Edit Book" : "Add New Book"}</h2>
        <form onSubmit={e => {
          e.preventDefault()
          if (title.trim() && authorId) {
            onSubmit({ title: title.trim(), authorId: Number(authorId) }, initialData?.id)
          }
        }}>
          <input
            autoFocus
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Book title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <select
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={authorId}
            onChange={e => setAuthorId(Number(e.target.value))}
            required
            disabled={loading || authors.length === 0}
          >
            <option value="">Select an author</option>
            {authors.map((author: Author) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            disabled={loading || !title.trim() || !authorId}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-lg transition disabled:opacity-60"
          >
            {isEdit ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  )
}
