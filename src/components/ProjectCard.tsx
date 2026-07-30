import { Link } from 'react-router';
import { Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface ProjectCardProps {
  project: any;
  [key: string]: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-md transition-shadow duration-300 p-0">
      <Link to={`/project/${project.id}`} className="block overflow-hidden">
        <img
          src={project.coverUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'}
          alt={project.title}
          loading="lazy"
          className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-4">
        <Link to={`/project/${project.id}`}>
          <h3 className="font-bold text-sm text-gray-900 hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
        </Link>
        {project.category && (
          <p className="text-xs text-gray-500 mt-0.5">{project.category}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <Link to={`/@${project.user?.username}`} className="flex items-center gap-2 min-w-0">
            <Avatar className="w-6 h-6 shrink-0">
              <AvatarImage src={project.user?.avatarUrl} alt="" />
              <AvatarFallback className="text-[10px]">{project.user?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 truncate hover:text-gray-900 transition-colors">{project.user?.fullName}</span>
          </Link>

          <div className="flex items-center gap-3 text-gray-400 shrink-0">
            <span className="flex items-center gap-1 text-xs">
              <Heart className="w-3.5 h-3.5" /> {project.likeCount || 0}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <MessageCircle className="w-3.5 h-3.5" /> {project.commentCount || 0}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
