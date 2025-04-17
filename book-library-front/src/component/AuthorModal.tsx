import { useEffect, useState } from "react"

type AuthorModalProps = {
  open: boolean
  onClose: () => void
  initialData?: { id?: number, name?: string }
  onSubmit: (name: string, id?: number) => void
}

export default function AuthorModal({ open, onClose, initialData, onSubmit }: AuthorModalProps) {
  const [name, setName] = useState("")

  useEffect(() => {
    if (open) setName(initialData?.name || "")
  }, [open, initialData])

  if (!open) return null

  const isEdit = !!initialData?.id

  return (
    <div className="fixed inset-0 z-30 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-80 shadow-xl relative animate-fade-in">
        <button className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose} aria-label="Close modal">×</button>
        <h2 className="text-xl font-semibold mb-5 text-blue-700">{isEdit ? "Edit Author" : "Add New Author"}</h2>
        <form onSubmit={e => {
          e.preventDefault()
          if (name.trim()) onSubmit(name.trim(), initialData?.id)
        }}>
          <input
            autoFocus
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Author name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-lg transition disabled:opacity-60"
          >
            {isEdit ? "Update Author" : "Add Author"}
          </button>
        </form>
      </div>
    </div>
  )
}
