import Link from "next/link";
import { PostMeta } from "@/lib/types";
import TagBadge from "./TagBadge";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="rounded-xl border border-border bg-card-bg p-6 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
          <div className="mb-3 flex items-center gap-3 text-sm">
            <time className="text-muted" dateTime={post.date}>
              {formattedDate}
            </time>
            <span className="text-border">&middot;</span>
            <span className="text-muted">{post.readingTime}</span>
          </div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-[15px] leading-relaxed text-muted">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
