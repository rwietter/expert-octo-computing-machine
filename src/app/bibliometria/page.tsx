// app/page.js
'use client'
import dynamic from 'next/dynamic';
import Header from '../Header';
import Publishers from '../publishers';
import Results from '../Results';
import Search from '../Search';

// Dynamically import the Map component with SSR disabled
const UniversityMap = dynamic(() => import('../Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[80vh] bg-[#121212] flex items-center justify-center">
      <div className="text-white text-lg">Carregando mapa...</div>
    </div>
  ),
});

export default function Home() {
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

      <Publishers />
    </main>
  );
}
