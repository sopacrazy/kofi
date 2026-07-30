import CreatorCard from '../components/CreatorCard';
import { getCreators } from '../mockData';

export default function CreatorsPage() {
  const creators = getCreators();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Criadores</h1>
        <p className="text-gray-500 mt-1">Conheça quem está publicando na Folio.</p>
      </div>

      {creators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">Nenhum criador encontrado.</p>
        </div>
      )}
    </div>
  );
}
