import { create } from 'zustand'

interface Article {
  article_title: string
  author_names: string
  author_universities: string
  doi: string
  publication_year: number
  abstract: string
  publication_date: string
  pages: number
}

type ArticlesState = {
  articles: Article[] | [] | null
  setArticles: (articles: Article[] | [] | null) => void
}

const useArticles = create<ArticlesState>((set) => ({
  articles: [],
  setArticles: (articles: Article[] | [] | null) => set({ articles }),
}))

export { useArticles }