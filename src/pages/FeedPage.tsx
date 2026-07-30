import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ProjectCard from '../components/ProjectCard';
import { useAuthStore } from '../store/auth';
import { getProjects } from '../mockData';
import { Button } from '@/components/ui/button';

export default function FeedPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = ['Todos', 'UI/UX', 'Ilustração', 'Dev', 'Fotografia', '3D'];
  const [activeCategory, setActiveCategory] = useState('Todos');
  const { user } = useAuthStore();

  useEffect(() => {
    setProjects(getProjects());
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      {!user && (
        <div className="bg-primary text-white py-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              A vitrine do seu melhor trabalho.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-2xl mx-auto">
              Descubra projetos incríveis e conecte-se com criadores pelo mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-primary">
                <Link to="/register">Criar meu portfólio</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <Link to="/login">Já tenho conta</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 no-scrollbar">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-4 border border-gray-100 h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects
              .filter((p: any) => activeCategory === 'Todos' || p.category === activeCategory)
              .map((project: any) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        )}

        {!loading && projects.filter((p: any) => activeCategory === 'Todos' || p.category === activeCategory).length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Nenhum projeto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
