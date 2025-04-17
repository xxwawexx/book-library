import { useState, useMemo } from "react"
import { useBooks } from "../hooks/useBooks"
import BookModal from "../component/BookModal"
import { Link } from 'react-router-dom'


export default function BooksPage() {
  const { books, loading, error, deleteBook, addBook, updateBook } = useBooks()
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editBook, setEditBook] = useState<{ id: number, title: string, authorId: number } | null>(null)

  const filteredBooks = useMemo(
    () =>
      books.filter(b =>
        b.title.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [books, search]
  )

  // Handles both add and edit (modal submit)
  const handleModalSubmit = async (data: { title: string, authorId: number }, bookId?: number) => {
    if (bookId) {
      await updateBook(bookId, data)
    } else {
      await addBook(data.title, data.authorId)
    }
    setShowModal(false)
    setEditBook(null)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
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

      <h1 className="text-4xl font-extrabold text-blue-700 mb-8">Books</h1>
      <div className="flex w-full max-w-xl mb-8 gap-3">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg shadow text-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={() => {
            setEditBook(null)
            setShowModal(true)
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
        >
          Add Book
        </button>
      </div>
      <BookModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditBook(null)
        }}
        initialData={editBook ?? undefined}
        onSubmit={handleModalSubmit}
      />
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <ul className="w-full max-w-xl divide-y divide-blue-100 bg-white rounded-lg shadow min-h-[60px]">
        {loading ? (
          <li className="py-8 text-gray-500 text-center">Loading...</li>
        ) : filteredBooks.length === 0 ? (
          <li className="py-6 text-gray-400 text-center">No books found.</li>
        ) : (
          filteredBooks.map(book => (
            <li key={book.id} className="flex items-center justify-between px-5 py-4 group hover:bg-blue-50 transition">
              <span className="font-medium text-lg text-gray-800">{book.title}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditBook({ id: book.id, title: book.title, authorId: book.author.id })
                    setShowModal(true)
                  }}
                  aria-label="Edit"
                  className="text-blue-500 hover:text-blue-700 transition"
                  title="Edit book"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-10 10a2 2 0 01-.847.51l-4 1a.75.75 0 01-.926-.927l1-4a2 2 0 01.51-.847l10-10z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  aria-label="Delete"
                  className="text-red-400 hover:text-red-600 transition"
                  title="Delete book"
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
