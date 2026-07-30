import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Heart, Share2 } from 'lucide-react';
import { getProjectById } from '../mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProject(id ? getProjectById(id) : null);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!project) return <div className="text-center py-20 text-gray-500">Projeto não encontrado.</div>;

  const tools = Array.isArray(project.tools) ? project.tools : (typeof project.tools === 'string' ? JSON.parse(project.tools) : []);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Gallery */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {project.coverUrl && (
              <img src={project.coverUrl} alt="Cover" className="w-full rounded-2xl object-cover" />
            )}

            {project.images?.map((img: any) => (
              <img key={img.id} src={img.imageUrl} alt="" className="w-full rounded-2xl object-cover" />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">

              {/* Creator Card */}
              <Card className="bg-gray-50 border-gray-100">
                <CardContent className="p-6">
                  <Link to={`/@${project.user?.username}`} className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={project.user?.avatarUrl} alt={project.user?.fullName} />
                      <AvatarFallback>{project.user?.fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-gray-900">{project.user?.fullName}</h3>
                      <p className="text-sm text-gray-500">{project.user?.category || 'Criador'}</p>
                    </div>
                  </Link>
                  <Button className="w-full">Seguir</Button>
                </CardContent>
              </Card>

              {/* Project Info */}
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{project.title}</h1>
                {project.category && (
                  <Badge variant="secondary" className="mb-4">{project.category}</Badge>
                )}

                {project.description && (
                  <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">{project.description}</p>
                )}

                {tools.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Ferramentas</h4>
                    <div className="flex flex-wrap gap-2">
                      {tools.map((tool: string) => (
                        <Badge key={tool} variant="outline">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 border-t border-gray-100 pt-6">
                <button className="flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">Apreciar</span>
                </button>
                <button className="flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">Compartilhar</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
