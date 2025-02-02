import { create } from 'zustand'

export interface Article {
  article_title: string
  author_names: string
  author_universities: string
  doi: string
  publication_year: number
  abstract: string
  publication_date: string
  pages: number
  cited_reference_count: number
  times_cited: number
  total_times_cited: number
  usage_count_180: number
  usage_count_since_2013: number
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
