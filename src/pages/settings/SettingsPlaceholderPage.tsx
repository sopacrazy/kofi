import { Construction } from 'lucide-react';
import EmptyState from '../../components/EmptyState';
import { Card } from '@/components/ui/card';

export default function SettingsPlaceholderPage({ title }: { title: string }) {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title={`${title} — em breve`}
        description="Essa seção ainda está em construção."
      />
    </Card>
  );
}
