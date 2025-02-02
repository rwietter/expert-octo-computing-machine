'use client'

import React from 'react'
import { PiDotFill } from 'react-icons/pi'
import Accordion from './Accordion'
import { useArticles } from './states/articles'

const doi = (doi: any) => `https://doi.org/${doi}`

const Results = () => {
  const [openStates, setOpenStates] = React.useState<boolean[]>([]);

  const articleStore = useArticles()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [articlesPerPage] = React.useState(10)

  // Calcular os índices dos artigos da página atual
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articleStore.articles?.slice(indexOfFirstArticle, indexOfLastArticle)

  // Inicializa o estado de abertura/fechamento para cada artigo
  React.useEffect(() => {
    if (articleStore.articles) {
      setOpenStates(new Array(articleStore.articles.length).fill(false));
    }
  }, [articleStore.articles]);

  const toggleAccordion = (index: number) => {
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (articleStore.articles === null) {
    return (
      <section className='w-full flex flex-col items-center max-w-xl mx-auto'>
        <h2 className='text-xl text-red-500 font-bold text-center py-4'>
          Nenhum artigo encontrado. Tente novamente com um termo diferente.
        </h2>
      </section>
    )
  }

  return (
    <section className='w-full flex flex-col items-center max-w-2xl mx-auto'>
      {articleStore.articles.length > 0 && (
        <h2 className='text-3xl text-gray-200 font-bold text-center py-4'>Artigos encontrados</h2>
      )}
      <ul className='space-y-5 py-4 max-w-2xl w-full p-2'>
        {currentArticles?.map((article, index) => (
          <li
            key={`${article.author_universities}:${index}`}
            className="text-gray-300 hover:text-white transition-colors duration-300 bg-[#272727] hover:bg-indigo-700 p-3 rounded-md"
          >
            <a
              target="_blank"
              className='flex items-center'
              rel="noopener noreferrer"
              href={doi(article.doi)}
            >
              {article.article_title} ({article.publication_year}){' '}
            </a>
            <p className='text-sm py-2'>
              <span className='font-semibold text-balance text-gray-400'>{article.author_names?.toUpperCase()}</span> <span className='text-gray-500 text-balance'>({article.author_universities?.toLowerCase()})</span>
            </p>
            <p className='text-sm text-gray-400 truncate mt-2'>
              {article.abstract}
            </p>
            <div className='flex justify-between pt-4'>
              <div className='flex items-center space-x-2'>
                <p className='text-sm text-gray-400'>
                  {article.publication_date?.toUpperCase()}/{article.publication_year}
                </p>
                <PiDotFill size={10} className='text-gray-400' />
                <p className='text-sm text-gray-400'>
                  {article?.pages} páginas
                </p>
              </div>
            </div>
            <div className="group-hover:bg-indigo-800 transition-colors duration-300">
              <Accordion
                isOpen={openStates[index]}
                article={article}
                toggleAccordion={() => toggleAccordion(index)}
              />
            </div>
          </li>
        ))}
      </ul>
      {articleStore.articles.length > articlesPerPage && (
        <div className='flex justify-center items-center flex-col'>
          <span className='text-gray-500 text-base block'>
            Página {currentPage} de {Math.ceil(articleStore.articles.length / articlesPerPage)}
          </span>
          <div className='space-x-4 flex items-center'>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-indigo-500 py-2 px-8 text-gray-200 hover:bg-indigo-600 transition-colors duration-400 mt-4 rounded-md ${currentPage === 1 ? 'cursor-not-allowed bg-indigo-400 hover:bg-indigo-400' : ''}`}
            >
              Anterior
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastArticle >= articleStore.articles.length}
              className={`bg-indigo-500 py-2 px-8 text-gray-200 hover:bg-indigo-600 transition-colors duration-400 mt-4 rounded-md ${indexOfLastArticle >= articleStore.articles.length ? 'cursor-not-allowed bg-indigo-400 hover:bg-indigo-400' : ''}`}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Results