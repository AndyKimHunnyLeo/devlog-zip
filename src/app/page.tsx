import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          DevLog<span className="text-blue-500">.zip</span>
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          개발 로그를 압축해서 전달합니다.
        </p>
      </section>
      <section className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            아직 작성된 포스트가 없습니다.
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </section>
    </div>
  );
}
