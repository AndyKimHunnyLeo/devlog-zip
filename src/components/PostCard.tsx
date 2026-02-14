import Link from "next/link";
import { PostMeta } from "@/lib/types";
import TagBadge from "./TagBadge";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h2 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-500 dark:text-gray-100">
            {post.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {post.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
