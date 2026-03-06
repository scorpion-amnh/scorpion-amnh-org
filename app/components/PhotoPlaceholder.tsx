type PhotoPlaceholderProps = {
  name: string;
  className?: string;
};

const getInitials = (name: string) => {
  const cleaned = name.replace(/["“”]/g, '').replace(/[’']/g, '');
  const parts = cleaned.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const PhotoPlaceholder = ({ name, className }: PhotoPlaceholderProps) => {
  const classes = [
    'w-full',
    'aspect-[3/4]',
    'bg-gray-100',
    'rounded-sm',
    'flex',
    'items-center',
    'justify-center',
    'text-gray-400',
    'text-4xl',
    'font-semibold',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{getInitials(name)}</div>;
};
