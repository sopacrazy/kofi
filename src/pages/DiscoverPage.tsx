import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../mockData';
import { cn } from '@/lib/utils';

export default function DiscoverPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = ['Todos', 'UI/UX', 'Ilustração', 'Dev', 'Fotografia', '3D', 'Branding'];
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim().toLowerCase() ?? '';

  useEffect(() => {
    setProjects(getProjects());
    setLoading(false);
  }, []);

  const filteredProjects = projects.filter((p: any) => {
    const matchesCategory = activeCategory === 'Todos' || p.tags?.includes(activeCategory);
    const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.user?.fullName?.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen">
      {/* Categorias (sticky) */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'relative py-3 text-sm font-semibold whitespace-nowrap transition-colors outline-none',
                  activeCategory === cat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {query && (
          <p className="text-sm text-muted-foreground mb-6">
            Resultados para <span className="font-semibold text-foreground">"{searchParams.get('q')}"</span>
          </p>
        )}

        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="mb-6 break-inside-avoid animate-pulse bg-white rounded-2xl border border-gray-100"
                style={{ height: 220 + (i % 3) * 60 }}
              />
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {filteredProjects.map((project: any) => (
              <div key={project.id} className="mb-6 break-inside-avoid">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Nenhum projeto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
