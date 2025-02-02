// app/page.js
import { Metadata } from 'next';
import Header from './Header';
import UniversityMap from './Map';
import Results from './Results';
import Search from './Search';

export const Matadata: Metadata = {
  title: 'Estudo Bibliométrico em IA',
  description: 'Este App é um mecanismo de busca para estudos bibliométricos na área de Inteligência Artificial. Neste app, existem duas funcionalidades principais: um mecanismo de busca e um mapa com universidades, autores e artigos. O mecanismo de busca permite que os usuários pesquisem artigos por título, autor ou universidade. O mapa mostra a localização de universidades, autores e artigos.',
  category: 'Bibliometria',
  keywords: ['IA', 'Bibliometria', 'Inteligência Artificial'],
  classification: 'Public',
  applicationName: 'Estudo Bibliométrico em IA',
  generator: 'Next.js',
  robots: 'noindex, nofollow',
  icons: [
    {
      url: '/favicon.ico',
      sizes: '64x64',
      type: 'image/png',
    },
  ],
}

// This App is a search engine for research bibliometric studies in the field of Artificial Intelligence. In this app, there are two main features: a search engine and a map with universities, authors, and articles. The search engine allows users to search for articles by title, author, or university. The map shows the location of universities, authors, and articles.

export default async function Home() {

  return (
    <main className='w-full min-h-dvh'>
      {/* Header */}
      <Header />

      {/* Search Engine */}
      <Search />

      {/* Results */}
      <Results />

      {/* Earth map with universities/autors/articles */}

      <UniversityMap />
    </main>
  );
}