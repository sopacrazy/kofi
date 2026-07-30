import { Link } from 'react-router';
import { ArrowRight, Briefcase, Coffee, Heart, Sparkles, Sprout } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { getCreators, getLatestProjects } from '../mockData';
import { Button } from '@/components/ui/button';
import CreatorCard from '../components/CreatorCard';
import ProjectCard from '../components/ProjectCard';

function HeroIllustration() {
  return (
    <div className="relative hidden md:block">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-gray-100" />
            <div className="space-y-1.5 flex-1">
              <div className="h-2 w-28 bg-gray-100 rounded-full" />
              <div className="h-2 w-16 bg-gray-100 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-orange-200 to-primary/50" />
            <div className="aspect-square rounded-xl bg-gradient-to-br from-sky-200 to-indigo-300" />
            <div className="aspect-square rounded-xl bg-gradient-to-br from-emerald-200 to-teal-300" />
          </div>
        </div>
      </div>

      <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Sprout className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute -right-5 -top-5 w-14 h-14 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center">
        <Coffee className="w-6 h-6 text-primary" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuthStore();
  const creators = getCreators();
  const latestProjects = getLatestProjects(6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Descubra portfólios criativos que inspiram.
            </h1>
            <p className="text-lg text-gray-600 mt-6 max-w-xl">
              Folio é o lar de artistas, designers e criadores. Explore trabalhos originais e apoie quem está por trás deles.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/criadores">
                  Explorar Criadores <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <HeroIllustration />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Criadores */}
        {creators.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Criadores</h2>
              <Link to="/criadores" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </section>
        )}

        {/* Últimos projetos */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Últimos projetos</h2>
            <Link to="/descobrir" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              Ver todos os projetos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {latestProjects.map((project: any) => (
              <div key={project.id} className="mb-6 break-inside-avoid">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recursos */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="text-center sm:text-left">
            <Heart className="w-6 h-6 text-primary mb-3 mx-auto sm:mx-0" />
            <h3 className="font-bold text-gray-900 mb-1">Apoie Criadores</h3>
            <p className="text-sm text-gray-500">Siga seus criadores favoritos e ajude-os a continuar criando.</p>
          </div>
          <div className="text-center sm:text-left">
            <Sparkles className="w-6 h-6 text-primary mb-3 mx-auto sm:mx-0" />
            <h3 className="font-bold text-gray-900 mb-1">Compartilhe e Conecte-se</h3>
            <p className="text-sm text-gray-500">Faça parte de uma comunidade que celebra trabalho original.</p>
          </div>
          <div className="text-center sm:text-left">
            <Briefcase className="w-6 h-6 text-primary mb-3 mx-auto sm:mx-0" />
            <h3 className="font-bold text-gray-900 mb-1">Encontre Oportunidades</h3>
            <p className="text-sm text-gray-500">Descubra vagas e projetos para profissionais criativos.</p>
          </div>
        </div>
      </section>

      {!user && (
        <section className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold">Pronto para publicar seu portfólio?</h2>
              <p className="text-gray-400 text-sm mt-1">Crie sua conta gratuita e comece agora.</p>
            </div>
            <Button asChild size="lg">
              <Link to="/register">Criar conta</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
