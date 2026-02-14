import { PostMeta } from "@/lib/types";
import TagBadge from "./TagBadge";

interface PostHeaderProps {
  meta: PostMeta;
}

export default function PostHeader({ meta }: PostHeaderProps) {
  return (
    <header className="mb-8 border-b border-gray-200 pb-8 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <time>
          {new Date(meta.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>&middot;</span>
        <span>{meta.readingTime}</span>
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {meta.title}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {meta.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {meta.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </header>
  );
}
