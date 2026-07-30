import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface ProjectCardProps {
  project: any;
  [key: string]: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-md transition-shadow duration-300 p-0">
      <Link to={`/project/${project.id}`} className="block aspect-[4/3] overflow-hidden">
        <img
          src={project.coverUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link to={`/@${project.user?.username}`}>
            <Avatar className="w-8 h-8">
              <AvatarImage src={project.user?.avatarUrl} alt="" />
              <AvatarFallback className="text-xs">{project.user?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <Link to={`/project/${project.id}`}>
              <h3 className="text-sm font-bold text-gray-900 truncate hover:text-primary transition-colors">
                {project.title}
              </h3>
            </Link>
            <Link to={`/@${project.user?.username}`}>
              <p className="text-xs text-gray-500 truncate hover:text-gray-700 transition-colors">
                {project.user?.fullName}
              </p>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          <button className="p-1.5 rounded-full hover:bg-gray-50 hover:text-primary transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium">{project.likeCount || 0}</span>
        </div>
      </div>
    </Card>
  );
}
