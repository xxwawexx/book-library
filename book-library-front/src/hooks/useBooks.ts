import { useEffect, useState, useCallback } from "react"
import api from "../api/client"

export interface Book { 
    id: number
    title: string
    author: {
        id: number
        name: string
    };
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBooks = useCallback(() => {
    setLoading(true)
    api.get<Book[]>("/books")
      .then(res => setBooks(res.data))
      .catch(() => setError("Failed to fetch books"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchBooks() }, [fetchBooks])

  const deleteBook = async (id: number) => {
    try {
      await api.delete(`/books/${id}`)
      setBooks(books => books.filter(b => b.id !== id))
    } catch {
      setError("Failed to delete")
    }
  }

  const addBook = async (title: string, authorId: number) => {
    try {
      const resp = await api.post<Book>("/books", { title, authorId })
      setBooks(books => [...books, resp.data])
    } catch {
      setError("Failed to add")
    }
  }

  const updateBook = async (bookId: number, data: { title: string, authorId: number }) => {
    try {
      await api.put(`/books/${bookId}`, { title: data.title })
      
      const bookRes = await api.get(`/books/${bookId}`)
      setBooks(books =>
        books.map(b => (b.id === bookId ? bookRes.data : b))
      )
    } catch {
      setError("Failed to update.")
    }
  }

  return { books, loading, error, fetchBooks, deleteBook, addBook, updateBook }
}
