import { MdOutlineQueryStats } from "react-icons/md";
import { PiArrowSquareInDuotone } from "react-icons/pi";
import { Article } from "./states/articles";

interface PropTypes {
  isOpen: boolean;
  toggleAccordion: () => void;
  article: Article
}
const doi = (doi: any) => `https://doi.org/${doi}`

export default function Accordion({ isOpen, toggleAccordion, article }: PropTypes) {
  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-end space-x-4">
        <button
          onClick={toggleAccordion}
          className="bg-transparent focus:outline-none"
        >
          <MdOutlineQueryStats size={20} className="text-white" />
        </button>
        <button type="button" className="bg-transparent focus:outline-none">
          <a href={doi(article?.doi)} target="_blank" rel="noopener noreferrer" className='transition-colors duration-300'>
            <PiArrowSquareInDuotone size={20} className='text-white' />
          </a>
        </button>
      </div>

      {isOpen && (
        <section id="stats" className="mt-4 pt-4 px-2 border-t-2 border-gray-400">
          <p className="text-gray-400 text-sm">Referências: {article?.cited_reference_count}</p>
          <p className="text-gray-400 text-sm">Vezes citado: {article?.times_cited}</p>
          <p className="text-gray-400 text-sm">Citado externamente: {article?.total_times_cited}</p>
          <p className="text-gray-400 text-sm">Acessos em 180 dias: {article?.usage_count_180}</p>
          <p className="text-gray-400 text-sm">Acessos desde 2013: {article?.usage_count_since_2013}</p>
        </section>
      )}
    </div>
  );
}