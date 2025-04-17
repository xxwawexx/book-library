import { useState, useMemo } from "react"
import { useAuthors } from "../hooks/useAuthors"
import AuthorModal from "../component/AuthorModal"
import { Link } from 'react-router-dom'

export default function AuthorsPage() {
  const { authors, loading, error, addAuthor, updateAuthor, deleteAuthor } = useAuthors()
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editAuthor, setEditAuthor] = useState<{ id: number, name: string } | null>(null)

  const filteredAuthors = useMemo(
    () =>
      authors.filter(a =>
        a.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [authors, search]
  )

  const handleModalSubmit = async (name: string, id?: number) => {
    if (id) {
      await updateAuthor(id, name)
    } else {
      await addAuthor(name)
    }
    setShowModal(false)
    setEditAuthor(null)
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10">
      <Link to="/" className="absolute top-6 left-8 flex items-center gap-2 group">
        <svg
            className="w-8 h-8 text-gray-600 group-hover:text-gray-800 transition"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10"
            />
        </svg>
        <span className="sr-only">Home</span>
      </Link>

      <h1 className="text-4xl font-extrabold text-purple-600 mb-8">Authors</h1>
      <div className="flex w-full max-w-xl mb-8 gap-3">
        <input
          type="text"
          placeholder="Search authors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg shadow text-lg bg-white border focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <button
          onClick={() => {
            setEditAuthor(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow transition"
        >
          Add Author
        </button>
      </div>
      <AuthorModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditAuthor(null)
        }}
        initialData={editAuthor ?? undefined}
        onSubmit={handleModalSubmit}
      />
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <ul className="w-full max-w-xl divide-y divide-indigo-100 bg-white rounded-lg shadow min-h-[60px]">
        {loading ? (
          <li className="py-8 text-gray-500 text-center">Loading...</li>
        ) : filteredAuthors.length === 0 ? (
          <li className="py-6 text-gray-400 text-center">No authors found.</li>
        ) : (
          filteredAuthors.map(author => (
            <li key={author.id} className="flex items-center justify-between px-5 py-4 group hover:bg-indigo-50 transition">
              <span className="font-medium text-lg text-gray-800">{author.name}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditAuthor({ id: author.id, name: author.name })
                    setShowModal(true)
                  }}
                  aria-label="Edit"
                  className="text-indigo-500 hover:text-indigo-700 transition"
                  title="Edit author"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-10 10a2 2 0 01-.847.51l-4 1a.75.75 0 01-.926-.927l1-4a2 2 0 01.51-.847l10-10z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteAuthor(author.id)}
                  aria-label="Delete"
                  className="text-red-400 hover:text-red-600 transition"
                  title="Delete author"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7v12a2 2 0 002 2h8a2 2 0 002-2V7m-1-4H7a2 2 0 00-2 2v2h14V5a2 2 0 00-2-2zm-5 8v6m4-6v6"/>
                  </svg>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
