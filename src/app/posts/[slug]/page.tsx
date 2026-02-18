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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devlog.zip";

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.meta.published) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    url: `${SITE_URL}/posts/${slug}`,
    author: { "@type": "Person", name: "Andy Kim" },
    keywords: post.meta.tags.join(", "),
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 xl:grid xl:grid-cols-[1fr_200px] xl:gap-12 xl:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

        <nav className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="group flex flex-1 flex-col rounded-xl border border-border bg-card-bg p-4 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                Previous
              </span>
              <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="group flex flex-1 flex-col rounded-xl border border-border bg-card-bg p-4 text-right transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                Next
              </span>
              <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </div>
      <TableOfContents />
    </div>
  );
}
