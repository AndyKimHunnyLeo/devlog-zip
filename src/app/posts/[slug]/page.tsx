import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { getMDXComponents } from "@/components/mdx";
import PostHeader from "@/components/PostHeader";
import TableOfContents from "@/components/TableOfContents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.meta.published) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 xl:grid xl:max-w-5xl xl:grid-cols-[1fr_200px] xl:gap-10">
      <div className="min-w-0">
        <PostHeader meta={post.meta} />
        <article className="prose">
          <MDXRemote
            source={post.content}
            components={getMDXComponents()}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: "catppuccin-mocha",
                      keepBackground: true,
                    },
                  ],
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "wrap",
                      properties: {
                        className: ["anchor"],
                      },
                    },
                  ],
                ],
              },
            }}
          />
        </article>

        <nav className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="group flex flex-col"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Previous
              </span>
              <span className="mt-1 text-sm font-medium text-gray-700 group-hover:text-blue-500 dark:text-gray-300">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="group flex flex-col text-right"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Next
              </span>
              <span className="mt-1 text-sm font-medium text-gray-700 group-hover:text-blue-500 dark:text-gray-300">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
      <TableOfContents />
    </div>
  );
}
