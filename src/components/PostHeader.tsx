import Link from "next/link";
import { PostMeta } from "@/lib/types";
import TagBadge from "./TagBadge";

interface PostHeaderProps {
  meta: PostMeta;
}

export default function PostHeader({ meta }: PostHeaderProps) {
  const formattedDate = new Date(meta.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-12 border-b border-border pb-10">
      <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-medium">
        <Link
          href="/"
          className="group inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-inset ring-accent/20 transition-all hover:bg-accent/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3 w-3 transition-transform group-hover:-translate-x-0.5"
          >
            <path
              fillRule="evenodd"
              d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          Posts
        </Link>
        <time className="text-muted" dateTime={meta.date}>
          {formattedDate}
        </time>
        <span className="text-border">&middot;</span>
        <span className="text-muted">{meta.readingTime}</span>
      </div>
      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
        {meta.title}
      </h1>
      <p className="mb-6 text-lg leading-relaxed text-muted">
        {meta.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {meta.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </header>
  );
}
