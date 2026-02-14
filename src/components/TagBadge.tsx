interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20 transition-colors hover:bg-accent/20">
      {tag}
    </span>
  );
}
