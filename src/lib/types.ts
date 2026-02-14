export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  readingTime: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}
