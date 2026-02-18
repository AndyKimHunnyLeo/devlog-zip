---
name: verify-seo
description: Verifies SEO optimization patterns across metadata, Open Graph, sitemap, robots.txt, frontmatter, and structured data. Use after modifying pages, layouts, or post content.
---

# SEO Optimization Verification

## Purpose

Validates that all SEO best practices are correctly implemented:

1. **Metadata completeness** — Every page exports proper `metadata` or `generateMetadata` with title and description
2. **Open Graph & Twitter Cards** — Social sharing meta tags are present on all public pages
3. **Sitemap & Robots** — `sitemap.ts` and `robots.ts` exist and generate valid output
4. **Frontmatter quality** — MDX posts have required SEO fields with valid values
5. **Structured data** — JSON-LD schema markup is present where applicable

## When to Run

- After creating or modifying a page component (`src/app/**/page.tsx`)
- After editing `layout.tsx` metadata
- After adding or modifying MDX post frontmatter
- After creating or modifying `sitemap.ts` or `robots.ts`
- Before a PR that touches any page or content

## Related Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with default metadata (title template, description) |
| `src/app/page.tsx` | Home page (should have metadata) |
| `src/app/posts/[slug]/page.tsx` | Dynamic post page with `generateMetadata` |
| `src/app/about/page.tsx` | About page with static metadata |
| `src/lib/types.ts` | `PostMeta` interface — SEO fields defined here |
| `src/lib/posts.ts` | Post parsing utilities — frontmatter extraction |
| `posts/*.mdx` | MDX post files with frontmatter |

## Workflow

### Step 1: Verify Page Metadata Exports

**Tool:** Grep

**Check:** Every `page.tsx` file must export either `metadata` or `generateMetadata`.

```
Pattern: export (const metadata|async function generateMetadata)
Glob: src/app/**/page.tsx
```

**PASS:** Every `page.tsx` matches.
**FAIL:** A `page.tsx` file has no metadata export.

**Fix:** Add `export const metadata: Metadata = { title: "...", description: "..." }` or implement `generateMetadata()`.

### Step 2: Verify Root Layout Default Metadata

**Tool:** Read

**File:** `src/app/layout.tsx`

**Check:** Root layout must define:
- `title` with `default` and `template` fields
- `description`

```
Pattern: title:.*default.*template
```

**PASS:** Both `default` and `template` exist in the metadata export.
**FAIL:** Missing `default`, `template`, or `description`.

**Fix:** Update metadata in `layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: { default: "DevLog.zip", template: "%s | DevLog.zip" },
  description: "...",
};
```

### Step 3: Verify Post generateMetadata Has Open Graph

**Tool:** Read

**File:** `src/app/posts/[slug]/page.tsx`

**Check:** `generateMetadata` must return `openGraph` object with at minimum `title`, `description`, and `type`.

```
Pattern: openGraph
```

**PASS:** `openGraph` property exists in the returned metadata object.
**FAIL:** `generateMetadata` returns only `title` and `description` without `openGraph`.

**Fix:** Add Open Graph fields to the return value:
```typescript
return {
  title: post.meta.title,
  description: post.meta.description,
  openGraph: {
    title: post.meta.title,
    description: post.meta.description,
    type: "article",
    publishedTime: post.meta.date,
  },
};
```

### Step 4: Verify Sitemap Exists

**Tool:** Glob

**Check:** `src/app/sitemap.ts` must exist.

```
Pattern: src/app/sitemap.ts
```

**PASS:** File exists.
**FAIL:** File does not exist.

**Fix:** Create `src/app/sitemap.ts` exporting a default function that returns all post URLs:
```typescript
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `https://yourdomain.com/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));
  return [{ url: "https://yourdomain.com", lastModified: new Date() }, ...posts];
}
```

### Step 5: Verify Robots.txt Exists

**Tool:** Glob

**Check:** `src/app/robots.ts` must exist.

```
Pattern: src/app/robots.ts
```

**PASS:** File exists.
**FAIL:** File does not exist.

**Fix:** Create `src/app/robots.ts`:
```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
```

### Step 6: Verify MDX Frontmatter Required Fields

**Tool:** Read (each `.mdx` file in `posts/`)

**Check:** Every published MDX post must have these frontmatter fields:
- `title` (non-empty string)
- `date` (valid date format `YYYY-MM-DD`)
- `description` (non-empty string, ideally 50-160 characters)
- `tags` (non-empty array)
- `published` (boolean)

**PASS:** All required fields are present and valid.
**FAIL:** Any field is missing, empty, or has invalid format.

**Fix:** Add missing frontmatter fields to the MDX file.

### Step 7: Verify Description Length

**Tool:** Read (each `.mdx` file in `posts/`)

**Check:** The `description` field in frontmatter should be between 50 and 160 characters for optimal SEO.

**PASS:** Description length is within 50-160 characters.
**WARN:** Description is shorter than 50 or longer than 160 characters.

**Fix:** Adjust the description to be within the recommended range.

### Step 8: Verify HTML Lang Attribute

**Tool:** Grep

**File:** `src/app/layout.tsx`

**Check:** The `<html>` tag must have a `lang` attribute.

```
Pattern: <html.*lang=
```

**PASS:** `lang` attribute is present.
**FAIL:** No `lang` attribute on `<html>`.

**Fix:** Add `lang="ko"` (or appropriate language) to the `<html>` tag.

### Step 9: Verify Semantic Heading Hierarchy

**Tool:** Grep

**File:** `src/app/posts/[slug]/page.tsx`

**Check:** Post pages should render a single `<h1>` for the post title. Verify that the post content area does not include additional `<h1>` elements.

```
Pattern: <h1
```

**PASS:** Exactly one `<h1>` rendered per page.
**WARN:** Multiple `<h1>` elements detected. MDX content should use `##` (h2) and below.

**Fix:** Ensure post titles use `<h1>` and MDX content starts from `##`.

## Output Format

```markdown
## SEO Verification Report

| # | Check | Result | Details |
|---|-------|--------|---------|
| 1 | Page metadata exports | PASS/FAIL | List of pages without metadata |
| 2 | Root layout defaults | PASS/FAIL | Missing fields |
| 3 | Open Graph on posts | PASS/FAIL | Missing OG fields |
| 4 | Sitemap exists | PASS/FAIL | File presence |
| 5 | Robots.txt exists | PASS/FAIL | File presence |
| 6 | Frontmatter fields | PASS/FAIL | Posts with missing fields |
| 7 | Description length | PASS/WARN | Posts outside 50-160 chars |
| 8 | HTML lang attribute | PASS/FAIL | lang attribute presence |
| 9 | Heading hierarchy | PASS/WARN | Multiple h1 elements |

### Overall Result: PASS / FAIL
```

## Exceptions

The following are **not violations**:

1. **Draft posts** — Posts with `published: false` are excluded from SEO checks (they are not indexed)
2. **Development-only pages** — Pages like `_error`, `not-found`, or test pages do not need full SEO metadata
3. **Missing OG image** — While recommended, `openGraph.images` is not strictly required if no post-specific images are available
4. **Sitemap/robots during initial development** — These files can be absent during early project setup, but should be added before production deployment
