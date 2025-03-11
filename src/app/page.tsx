import Link from "next/link";
import Header from "./Header";

export default function Page() {
  return (
    <div className="w-full text-zinc-200 relative h-screen">
      <div className="gradient-background"></div>
      <div className="blur-overlay"></div>
      <Header />
      <section className="max-w-8xl mx-auto relative z-10 md:pt-5 xl:pt-15 2xl:pt-20">
        <h1 className="font-black text-center text-white p-4 leading-snug text-5xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-[7.5rem]">
          Insights bibliométricos aplicados à AI.
        </h1>
      </section>
      <section className="absolute bottom-0 left-0 right-0 text-zinc-900 bg-opacity-20 rounded-t-3xl p-4 bg-white/30 backdrop-blur-sm max-w-4xl mx-auto grid grid-cols-1 gap-4">
        <div className="text-center  rounded-lg p-4 ">
          <p className="text-base md:text-xl max-w-xl mx-auto p-4 ">
            Este é um <strong>projeto de pesquisa</strong> que visa analisar a produção científica sobre Inteligência Artificial. Para ler mais sobre o projeto baixe o artigo no botão abaixo ou acesse a ferramenta de pesquisa bibliométrica.
          </p>
          <div className="flex justify-center space-x-4 pt-2">
            <button className="bg-zinc-900 text-base text-white py-2 px-4 rounded-full hover:bg-zinc-800">
              <Link href="/artigo.pdf">Baixar Artigo</Link>
            </button>
            <button className="bg-white text-base text-zinc-900 py-2 px-4 rounded-full hover:bg-zinc-100">
              <Link href="/bibliometria">Dashboard</Link>
            </button>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-white" />
        <div className="text-center rounded-lg p-4">
          <p className="text-base md:text-xl max-w-xl mx-auto p-4">
            Acesse os dados bibliométricos e pesquise pelos artigos com a <Link
              href="/bibliometria"
              className="font-bold text-zinc-900 visited:text-zinc-900 hover:text-zinc-900 underline ">
              nossa ferramenta
            </Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
