import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowRight, Check, Copy, Eye, Heart, Pencil } from 'lucide-react';
import { getProjectByUsernameAndSlug, incrementProjectViewCount } from '../mockData';
import { useAuthStore } from '../store/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ProjectPage() {
  const { handle, slug } = useParams();
  const username = handle?.startsWith('@') ? handle.slice(1) : handle;
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const viewCounted = useRef(false);

  useEffect(() => {
    const found = username && slug ? getProjectByUsernameAndSlug(username, slug) : null;
    setProject(found);
    setLoading(false);
  }, [username, slug]);

  useEffect(() => {
    if (project && !viewCounted.current) {
      viewCounted.current = true;
      incrementProjectViewCount(project.id);
    }
  }, [project]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  const isOwner = currentUser?.id === project?.ownerId;

  if (!project || (!project.isPublic && !isOwner)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Projeto não encontrado</h1>
        <p className="text-muted-foreground mb-6">Esse projeto não existe ou não está mais disponível.</p>
        <Button asChild variant="outline">
          <Link to="/descobrir">Explorar outros projetos</Link>
        </Button>
      </div>
    );
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard indisponível (ex: contexto não seguro) — ignora silenciosamente.
    }
  };

  const publishedDate = new Date(project.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

  return (
    <div className="bg-white min-h-screen">
      {/* Header simples */}
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-lg tracking-tight text-primary">
            Folio
          </Link>
          <div className="flex items-center gap-2">
            {isOwner && (
              <Button asChild variant="outline" size="sm">
                <Link to={`/@${username}/${slug}/editar`}>
                  <Pencil className="w-3.5 h-3.5" /> Editar
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Link copiado
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copiar link
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {!project.isPublic && (
        <div className="bg-tag text-tag-foreground text-sm font-medium text-center py-2">
          Este projeto é um rascunho — só você consegue vê-lo.
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Capa */}
        <img
          src={project.coverImageUrl}
          alt={project.title}
          className="w-full h-56 rounded-2xl object-cover mb-6"
        />

        {/* Título */}
        <h1 className="text-xl font-medium text-foreground mb-3">{project.title}</h1>

        {/* Atribuição */}
        <Link to={`/@${project.user.username}`} className="flex items-center gap-2 mb-4 w-fit">
          <Avatar className="w-6 h-6">
            <AvatarImage src={project.user.avatarUrl} alt={project.user.fullName} />
            <AvatarFallback className="text-[10px]">{project.user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-foreground font-medium hover:text-primary transition-colors">
            {project.user.fullName}
          </span>
          <span className="text-sm text-muted-foreground">· publicado em {publishedDate}</span>
        </Link>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Descrição */}
        {project.description && (
          <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-wrap">{project.description}</p>
        )}

        {/* Galeria */}
        {project.gallery?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {project.gallery.map((url: string, index: number) => (
              <img
                key={url + index}
                src={url}
                alt=""
                className={`w-full rounded-2xl object-cover ${index === 0 ? 'sm:col-span-2' : ''}`}
              />
            ))}
          </div>
        )}

        {/* Rodapé */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" /> {project.likeCount}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {project.viewCount.toLocaleString('pt-BR')} visualizações
            </span>
          </div>
          <Link
            to={`/@${project.user.username}`}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            Ver mais projetos de {project.user.fullName.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
