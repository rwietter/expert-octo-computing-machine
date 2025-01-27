// app/page.js
import React from 'react';
import Search from './Search';
import Header from './Header';
import { useArticles } from './states/articles';
import Results from './Results';
import UniversityMap from './Map';

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