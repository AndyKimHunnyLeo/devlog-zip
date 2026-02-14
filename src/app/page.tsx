import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <section className="mb-16">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          DevLog<span className="text-accent">.zip</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          개발하면서 배운 것들을 압축해서 기록하고 공유합니다.
        </p>
      </section>
      <section>
        {posts.length === 0 ? (
          <div className="rounded-xl border border-border bg-card-bg p-12 text-center">
            <p className="text-muted">아직 작성된 포스트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
