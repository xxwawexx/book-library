import { useState, useEffect, useCallback } from "react"
import api from "../api/client"

export interface Author {
  id: number
  name: string
  books: {
    id: number
    title: string
    authorId: number
    createdAt: string
    updatedAt: string
  }[]
}

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAuthors = useCallback(() => {
    setLoading(true)
    api.get<Author[]>("/authors")
      .then(res => setAuthors(res.data))
      .catch(() => setError("Failed to fetch authors"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchAuthors() }, [fetchAuthors])

  const addAuthor = async (name: string) => {
    try {
      const res = await api.post<Author>("/authors", { name })
      setAuthors(a => [...a, res.data])
    } catch {
      setError("Failed to add author")
    }
  }

  const updateAuthor = async (id: number, name: string) => {
    try {
      await api.put(`/authors/${id}`, { name })
      setAuthors(a =>
        a.map(author =>
          author.id === id ? { ...author, name } : author
        )
      )
    } catch {
      setError("Failed to update author")
    }
  }

  const deleteAuthor = async (id: number) => {
    try {
      await api.delete(`/authors/${id}`)
      setAuthors(authors => authors.filter(a => a.id !== id))
    } catch {
      setError("Failed to delete author")
    }
  }

  return { authors, loading, error, addAuthor, updateAuthor, deleteAuthor, fetchAuthors }
}
