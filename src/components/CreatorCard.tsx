import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

type CreatorCardProps = {
  creator: any;
};

export default function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Card className="overflow-hidden p-0 rounded-3xl">
      <Link to={`/@${creator.username}`} className="block relative h-64 bg-gray-100">
        {creator.coverUrl && (
          <img src={creator.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
      </Link>

      <div className="px-5 pb-5">
        <Link to={`/@${creator.username}`} className="block -mt-8 mb-3 w-fit">
          <Avatar className="w-16 h-16 border-4 border-white shadow-sm">
            <AvatarImage src={creator.avatarUrl} alt={creator.fullName} />
            <AvatarFallback className="text-xl">{creator.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>

        <Link to={`/@${creator.username}`} className="block">
          <h3 className="font-bold text-gray-900 text-base truncate">{creator.fullName}</h3>
          <p className="text-gray-500 text-xs truncate mt-0.5">
            @{creator.username} · {(creator.followers ?? 0).toLocaleString('pt-BR')} seguidores
          </p>
        </Link>

        {creator.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {creator.skills.map((skill: string) => (
              <span
                key={skill}
                className="bg-gray-100 text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {creator.bio && (
          <p className="text-gray-600 text-sm leading-relaxed mt-3 line-clamp-2">{creator.bio}</p>
        )}
      </div>
    </Card>
  );
}
