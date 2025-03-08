// app/page.js
import Header from '../Header';
import UniversityMap from '../Map';
import Publishers from '../publishers';
import Results from '../Results';
import Search from '../Search';


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

      <div className='grid grid-cols-2 gap-4 h-[400px]'>
        <Publishers />
        <Publishers />
      </div>
    </main>
  );
}