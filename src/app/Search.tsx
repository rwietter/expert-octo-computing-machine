'use client'

import React from 'react'
import { useArticles } from './states/articles';

// This App is a search engine for research bibliometric studies in the field of Artificial Intelligence. In this app, there are two main features: a search engine and a map with universities, authors, and articles. The search engine allows users to search for articles by title, author, or university. The map shows the location of universities, authors, and articles.

const fetchArticles = async (search: string) => {
  try {
    const res = await fetch(`/api/articles?search=${search}`);
    if (!res.ok) {
      throw new Error('Falha ao buscar artigos');
    }
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

const Search = () => {
  const [loading, setLoading] = React.useState(false);
  const articleState = useArticles();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get('search') as string;

    if (!search.trim()) {
      alert('Digite um termo para buscar');
      setLoading(false);
      return;
    }

    const data = await fetchArticles(search);
    if (data.length === 0) {
      articleState.setArticles(null);
      setLoading(false);
      return;
    }
    articleState.setArticles(data);
    setLoading(false);
  }

  return (
    <section className='w-full flex justify-center max-w-5xl mx-auto p-4 text-gray-200'>
      <form onSubmit={handleSubmit} className='pt-10 flex flex-col w-full max-w-xl'>
        <fieldset>
          <legend className='text-2xl text-center'>Buscar artigos</legend>
          <input type="text" placeholder="Título, autor ou universidade" className='bg-[#272727] py-2 px-4 rounded-md mt-3 w-full' name="search" id="search" />
        </fieldset>
        <button
          type="submit"
          className='bg-indigo-500 py-2 px-4 w-full text-gray-200 hover:bg-indigo-600 transition-colors duration-400 mt-4 rounded-md flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
          disabled={loading}
        >
          <div className='flex items-center'>
            {loading && (
              <div className='w-4 h-4 rounded-full border-3 border-t-4 border-gray-200 border-opacity-70 animate-spin mx-auto' />
            )}
            <span className='pl-2'>Buscar</span>
          </div>
        </button>
      </form>
    </section>
  )
}

export default Search