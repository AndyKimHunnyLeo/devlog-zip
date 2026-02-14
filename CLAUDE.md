# devlog-zip

MDX-based technical blog — "DevLog.zip"

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript 5
- **Content:** MDX (next-mdx-remote, gray-matter, reading-time)
- **Code Highlighting:** rehype-pretty-code + shiki
- **Linting:** ESLint 9
- **Hosting:** Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header, Footer, dark mode)
│   ├── page.tsx                # Home — latest post list
│   ├── posts/[slug]/page.tsx   # Individual post page (MDX rendering)
│   └── about/page.tsx          # About page
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer
│   ├── PostCard.tsx            # Post card for listing
│   ├── PostHeader.tsx          # Post header (title, date, tags, reading time)
│   ├── TableOfContents.tsx     # TOC sidebar (h2/h3 based)
│   ├── TagBadge.tsx            # Tag badge component
│   ├── ThemeToggle.tsx         # Dark mode toggle
│   └── mdx/
│       ├── CodeBlock.tsx       # Code block with copy button
│       ├── Callout.tsx         # Info/tip/warning/danger callout
│       └── index.tsx           # MDX component mapping
├── lib/
│   ├── posts.ts                # Post read/parse/sort utilities
│   └── types.ts                # Type definitions (PostMeta, Post)
└── styles/
    └── globals.css             # Tailwind + custom prose styles
posts/                          # MDX post files (outside src/)
public/images/                  # Post images
```

## Content

- MDX files live in `posts/` directory at project root
- Frontmatter: title, date, description, tags, published
- `published: false` posts are excluded from listings
- Posts are sorted by date (newest first)

## Dark Mode

- Class-based (`dark` class on `<html>`)
- Inline script in layout prevents FOUC
- Toggle persists to localStorage

## Skills

| Skill | Description |
|-------|-------------|
| `manage-skills` | Analyzes session changes to detect verification skill gaps and create/update skills |
| `verify-implementation` | Runs all registered verification skills sequentially for integrated validation |
