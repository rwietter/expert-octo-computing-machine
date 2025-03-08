import Link from "next/link";
import Header from "./Header";

export default function Page() {
  return (
    <div className="w-full text-zinc-200">
      <div className="gradient-background"></div>
      <div className="blur-overlay"></div>
      <Header />
      <section className="max-w-6xl mx-auto mt-7">
        <h1 className="text-center text-[7rem] text-white font-bold p-4 leading-snug">
          IA na Bibliometria: Insights inteligentes
        </h1>
      </section>
      <section className="absolute bottom-0 left-0 right-0 text-zinc-900 bg-opacity-20 rounded-t-3xl p-4 bg-white/30 backdrop-blur-sm max-w-4xl mx-auto grid grid-cols-1 gap-4">
        <div className="text-center  rounded-lg p-4 h-52">
          <p className="text-xl max-w-xl mx-auto p-4 ">
            Este é um projeto de pesquisa que visa analisar a produção científica sobre Inteligência Artificial. Para ler mais sobre o projeto baixe o artigo no botão abaixo.
          </p>
          <div className="flex justify-center space-x-4 pt-2">
            <button className="bg-zinc-900 text-white py-2 px-4 rounded-full hover:bg-zinc-800">
              <Link href="/artigo.pdf">Baixar Artigo</Link>
            </button>
            <button className="bg-white text-zinc-900 py-2 px-4 rounded-full hover:bg-zinc-100">
              <Link href="/bibliometria">Dashboard</Link>
            </button>
          </div>
        </div>
        {/* separator */}
        <div className="h-[0.5px] w-full bg-white"></div>
        <div className="text-center rounded-lg p-4 h-36">
          <p className="text-xl max-w-xl mx-auto p-4">
            Acesse a bibliometria de Estudos em Inteligência Artificial com a <Link
              href="/bibliometria"
              className="font-bold text-zinc-900 visited:text-zinc-900 hover:text-zinc-900">
              nossa ferramenta
            </Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
