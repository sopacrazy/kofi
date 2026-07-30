import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import ProjectCard from '../components/ProjectCard';
import { Link as LinkIcon, Mail, MoreHorizontal, UserPlus } from 'lucide-react';
import { getUserByUsername } from '../mockData';
import { useAuthStore } from '../store/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const { handle } = useParams();
  const username = handle?.startsWith('@') ? handle.slice(1) : handle;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    setUser(username ? getUserByUsername(username) : null);
    setLoading(false);
  }, [username]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-gray-500">Carregando...</div>;
  }

  if (!user) {
    return <div className="text-center py-20 text-gray-500">Usuário não encontrado.</div>;
  }

  const isOwnProfile = currentUser?.username === user.username;

  return (
    <div>
      {/* Cover */}
      <div className="h-48 md:h-64 bg-gray-200 w-full relative overflow-hidden">
        {user.coverUrl && (
          <img src={user.coverUrl} alt="Cover" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Profile Info */}
        <div className="relative -mt-14 sm:-mt-16 mb-8 flex flex-col md:flex-row gap-6 md:items-end justify-between">
          <div className="flex flex-col md:flex-row gap-5 md:items-end">
            <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-sm">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              <AvatarFallback className="text-3xl">{user.fullName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="pb-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{user.fullName}</h1>
              <p className="text-gray-500 font-medium">
                @{user.username} • {user.category || 'Criador'} • {(user.followers ?? 0).toLocaleString('pt-BR')} seguidores
              </p>
            </div>
          </div>

          <div className="flex gap-2 pb-2">
            {isOwnProfile ? (
              <Button asChild variant="outline">
                <Link to="/create">Novo projeto</Link>
              </Button>
            ) : (
              <>
                <Button>
                  <UserPlus className="w-4 h-4" /> Seguir
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="projetos">
          <TabsList className="mb-8">
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="sobre">Sobre</TabsTrigger>
          </TabsList>

          <TabsContent value="projetos">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                {user.bio && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Sobre</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{user.bio}</p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Links</h3>
                    <ul className="space-y-3 text-sm">
                      <li>
                        <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                          <LinkIcon className="w-4 h-4" /> meuportfolio.com
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                          <Mail className="w-4 h-4" /> Contato
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Projects */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                {user.projects && user.projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {user.projects.map((project: any) => (
                      <ProjectCard key={project.id} project={{ ...project, user }} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-gray-500">
                      Este criador ainda não publicou projetos.
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sobre">
            <Card className="max-w-2xl">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Sobre {user.fullName}</h3>
                <p className="text-gray-600 leading-relaxed">{user.bio || 'Este criador ainda não escreveu uma bio.'}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
