import { useEffect, useRef, useState } from 'react';
import { Award, Check, Trophy, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
  check: Check,
  trophy: Trophy,
  users: Users,
};

const COLORS: Record<string, { bg: string; fg: string }> = {
  blue: { bg: 'bg-blue-100', fg: 'text-blue-600' },
  amber: { bg: 'bg-amber-100', fg: 'text-amber-600' },
  green: { bg: 'bg-emerald-100', fg: 'text-emerald-600' },
};

interface BadgeIconProps {
  iconName: string;
  color: string;
  label: string;
}

export default function BadgeIcon({ iconName, color, label }: BadgeIconProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const Icon = ICONS[iconName] ?? Award;
  const palette = COLORS[color] ?? { bg: 'bg-muted', fg: 'text-muted-foreground' };

  // Fecha ao tocar/clicar fora — necessário no mobile, que não tem mouseleave.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  return (
    <span
      ref={rootRef}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label}
        className={cn(
          'w-5 h-5 rounded-full flex items-center justify-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring',
          palette.bg
        )}
      >
        <Icon className={cn('w-3 h-3', palette.fg)} strokeWidth={2.5} />
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs font-medium px-2 py-1 shadow-lg z-50 pointer-events-none"
        >
          {label}
          <span className="absolute left-1/2 -translate-x-1/2 top-full -mt-0.5 w-1.5 h-1.5 bg-gray-900 rotate-45" />
        </span>
      )}
    </span>
  );
}
