---
name: verify-facts
description: Verifies technical facts in MDX blog posts — code block validity, URL links, package names, version numbers, internal links, date consistency, and API accuracy via Context7 docs. Use after writing or editing a post.
---

# Technical Fact Verification

## Purpose

Validates factual accuracy of technical blog content to maintain credibility:

1. **Code block integrity** — Every code block has a language tag and valid syntax
2. **Link validity** — External URLs are reachable, internal links reference existing posts
3. **Package/library accuracy** — Referenced npm packages and libraries exist
4. **Version number consistency** — Version numbers match the project's tech stack or are verifiable
5. **Date and temporal accuracy** — Frontmatter dates are valid and not in the future
6. **API accuracy via Context7** — API names, function signatures, and usage patterns are verified against the latest official documentation

## When to Run

- After writing or editing an MDX blog post
- Before publishing a post (`published: true`)
- After `/write-post` skill generates a new post
- When updating technical details in an existing post
- Before a PR that includes post changes

## Related Files

| File | Purpose |
|------|---------|
| `posts/*.mdx` | MDX blog post files containing technical content |
| `src/lib/posts.ts` | Post parsing utilities — provides slug list for internal link validation |
| `src/lib/types.ts` | `PostMeta` interface — defines required frontmatter fields |
| `CLAUDE.md` | Tech stack reference — source of truth for version numbers |
| `package.json` | Dependency versions — source of truth for library versions |

## Workflow

### Step 1: Identify Target Posts

**Tool:** Glob, Bash

**Check:** Determine which posts to verify. If a specific post is given as argument, check only that file. Otherwise, check all `.mdx` files in `posts/`.

```
Glob pattern: posts/*.mdx
```

For each post file, read the full content and parse frontmatter.

### Step 2: Verify Code Blocks Have Language Tags

**Tool:** Grep

**Check:** Every fenced code block (` ``` `) must specify a language identifier (e.g., ` ```typescript `, ` ```bash `).

```
Pattern: ^```\s*$
Path: posts/<target>.mdx
```

**PASS:** No matches — all code blocks have language tags.
**FAIL:** Matches found — code blocks without language identifiers.

**Fix:** Add the appropriate language tag after the opening triple backticks:
- `typescript` / `ts` for TypeScript
- `javascript` / `js` for JavaScript
- `bash` / `shell` for shell commands
- `json`, `yaml`, `css`, `html`, `sql`, `python` as appropriate
- `text` or `plaintext` for non-code output

### Step 3: Verify External URLs Are Reachable

**Tool:** Grep, Bash

**Check:** Extract all external URLs from the post and verify they return HTTP 2xx.

```
Pattern: https?://[^\s\)\]\>\"\']+
Path: posts/<target>.mdx
```

For each URL found, check reachability:

```bash
curl -sL -o /dev/null -w "%{http_code}" --max-time 10 "<URL>"
```

**PASS:** All URLs return 2xx status codes.
**FAIL:** A URL returns 4xx, 5xx, or times out.

**Fix:** Update or remove broken URLs. If the resource has moved, use the new URL. If the resource is gone, remove the link or replace with an archived version.

### Step 4: Verify Internal Post Links

**Tool:** Grep, Glob

**Check:** Links referencing other blog posts (e.g., `/posts/<slug>`) must point to existing post slugs.

```
Pattern: \(/posts/([a-z0-9-]+)\)
Path: posts/<target>.mdx
```

For each referenced slug, verify a matching `.mdx` file exists:

```
Glob pattern: posts/<referenced-slug>.mdx
```

**PASS:** All referenced slugs have corresponding `.mdx` files.
**FAIL:** A slug is referenced but no matching `.mdx` file exists.

**Fix:** Correct the slug to match an existing post, or remove the link if the target post doesn't exist yet.

### Step 5: Verify npm Package Names

**Tool:** Grep, Bash

**Check:** When a post mentions `npm install <package>`, `yarn add <package>`, `pnpm add <package>`, or `bun add <package>`, verify the package exists on the npm registry.

```
Pattern: (npm install|yarn add|pnpm add|bun add)\s+([a-z0-9@/_-]+)
Path: posts/<target>.mdx
```

For each package name found:

```bash
npm view <package-name> name --json 2>/dev/null
```

**PASS:** Command returns the package name (package exists on npm).
**FAIL:** Command returns error (package does not exist).

**Fix:** Correct the package name. Common issues:
- Typos in package names
- Packages that have been renamed or deprecated
- Scoped packages missing the `@scope/` prefix

### Step 6: Verify Version Numbers Against Project

**Tool:** Read, Grep

**Check:** When a post mentions specific version numbers for libraries in the project's tech stack, cross-reference against `package.json` and `CLAUDE.md`.

Known tech stack versions from `CLAUDE.md`:
- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript 5
- ESLint 9

```
Pattern: (Next\.js|React|Tailwind\s*CSS|TypeScript|ESLint)\s+(\d+[\d.]*)
Path: posts/<target>.mdx
```

Cross-reference each matched version against `CLAUDE.md` tech stack section and `package.json` dependencies.

**PASS:** Mentioned versions match the project's actual versions.
**WARN:** Version mismatch detected — the post may be intentionally referencing a different version for comparison, but this should be flagged for manual review.

**Fix:** Update the version number to match the project's actual version, or add context clarifying why a different version is mentioned (e.g., "in the previous version, React 18...").

### Step 7: Verify Frontmatter Date Validity

**Tool:** Read

**Check:** The `date` field in frontmatter must be:
- Valid ISO date format (`YYYY-MM-DD`)
- Not in the future (relative to current date)

Read the frontmatter and parse the date field.

**PASS:** Date is valid and not in the future.
**FAIL:** Date is malformed or set in the future.

**Fix:** Correct the date format to `YYYY-MM-DD` and ensure it represents the actual publish date.

### Step 8: Verify Technical Term Consistency

**Tool:** Grep

**Check:** Common technical terms should be spelled consistently throughout a post. Check for mixed usage of:

| Correct | Incorrect variants |
|---------|-------------------|
| `TypeScript` | `Typescript`, `typescript` (in prose, not code) |
| `JavaScript` | `Javascript`, `javascript` (in prose, not code) |
| `Next.js` | `NextJS`, `Nextjs`, `next.js` (in prose) |
| `Node.js` | `NodeJS`, `Nodejs`, `node.js` (in prose) |
| `GitHub` | `Github`, `github` (in prose) |
| `npm` | `NPM`, `Npm` (in prose) |
| `VS Code` | `VSCode`, `vscode` (in prose) |

```
Pattern: \b(Typescript|Javascript|NextJS|Nextjs|NodeJS|Nodejs|Github|NPM|Npm|VSCode)\b
Path: posts/<target>.mdx
```

Note: Only check prose text outside of code blocks and frontmatter.

**PASS:** No inconsistent term spellings found.
**WARN:** Inconsistent spellings detected.

**Fix:** Use the canonical capitalization/spelling for each term.

### Step 9: Verify Code Block Content Plausibility

**Tool:** Read

**Check:** For TypeScript/JavaScript code blocks, perform basic plausibility checks:
- Import statements reference real modules (e.g., `import ... from "react"` not `import ... from "recat"`)
- Common API names are spelled correctly (e.g., `useState` not `usestate`)
- Function/method names match known APIs

Read each code block and check for obvious typos in:
- Import paths for well-known packages
- React hook names (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`)
- Next.js API names (`useRouter`, `useSearchParams`, `NextResponse`, `Metadata`)
- Node.js built-in modules (`fs`, `path`, `http`, `crypto`, `child_process`)

**PASS:** No obvious API name typos found.
**FAIL:** Misspelled API names detected.

**Fix:** Correct the API/function/module name to the canonical spelling.

### Step 10: Verify API Usage Against Official Docs via Context7

**Tool:** MCP Context7 (`mcp__context7__resolve-library-id`, `mcp__context7__query-docs`)

**Check:** For each library/framework referenced in the post's code blocks, use Context7 to look up the official documentation and verify that API names, function signatures, and usage patterns are accurate.

**Procedure:**

1. **Extract libraries from code blocks.** Scan all code blocks for import statements and API usage. Identify the libraries being referenced:
   ```
   Pattern: import\s+.*\s+from\s+["']([^"']+)["']
   ```
   Also detect framework-specific APIs used without imports (e.g., `NextResponse`, `generateStaticParams`, `middleware`).

2. **Resolve library IDs.** For each unique library found, call `mcp__context7__resolve-library-id` to get the Context7-compatible library ID:
   - `next` / `next/server` → resolve "Next.js"
   - `react` → resolve "React"
   - `tailwindcss` → resolve "Tailwind CSS"
   - Other libraries as encountered

3. **Query docs for each API claim.** For each API name, function, or pattern used in the post, call `mcp__context7__query-docs` with a specific query:
   - If the post uses `NextResponse.rewrite()` → query: "NextResponse rewrite middleware"
   - If the post uses `generateStaticParams` → query: "generateStaticParams dynamic routes"
   - If the post mentions `x-locale` header pattern → query: "middleware headers request rewrite"
   - Focus queries on the specific API patterns the post claims to use

4. **Cross-reference.** Compare the post's code and claims against the documentation:
   - Does the API exist in the documented version?
   - Is the function signature correct (parameters, return type)?
   - Is the usage pattern consistent with the documented behavior?
   - Are there deprecated APIs being used without mention?

**Important:** Context7 has a limit of 3 calls per question. Prioritize the most critical/complex API claims. Group related queries where possible.

**Examples of what to verify:**

| Post Claim | Context7 Query | What to Check |
|-----------|----------------|---------------|
| `NextResponse.rewrite(url)` | "NextResponse rewrite middleware" | Does `rewrite()` accept a URL object? |
| `NextResponse.redirect(url)` | "NextResponse redirect middleware" | Correct signature and behavior? |
| `generateStaticParams` | "generateStaticParams dynamic routes" | Is this the correct API name? Usage pattern? |
| `request.nextUrl.clone()` | "middleware request nextUrl" | Does `nextUrl` have a `clone()` method? |
| `rewriteResponse.headers.set()` | "NextResponse headers set" | Can headers be set on a rewrite response? |

**PASS:** All API claims match the official documentation.
**FAIL:** API name, signature, or behavior contradicts the documentation.
**WARN:** API exists but usage pattern differs from documented examples (may be valid but worth manual review).

**Fix:** Correct the API usage to match the official documentation. If the post intentionally shows a non-standard pattern, add a note explaining the deviation.

### Step 11: Verify Technical Claims and Behavioral Assertions

**Tool:** MCP Context7

**Check:** When a post makes specific behavioral claims about a framework or library (not just API usage but how the system behaves), verify against official docs.

Examples of behavioral claims to verify:
- "미들웨어가 이 prefix를 벗겨내고 rewrite한다" → Does Next.js middleware support URL rewriting with prefix stripping?
- "`[region]`이 최상위에 있으면 모든 페이지가 dynamic route가 된다" → Is this true about dynamic segments in App Router?
- "`generateStaticParams`에서 리전별로 전부 정적 경로를 생성해야 한다" → How does `generateStaticParams` work with nested dynamic segments?

Query Context7 with the specific claim and check if the documentation supports it.

**PASS:** Behavioral claims are consistent with official documentation.
**WARN:** Claims are plausible but not explicitly documented — flag for manual review.
**FAIL:** Claims directly contradict official documentation.

**Fix:** Correct the claim or add nuance. If the behavior is based on empirical observation rather than documentation, note this explicitly (e.g., "실제 테스트 결과..." or "문서에 명시되지 않았지만...").

## Output Format

```markdown
## Fact Verification Report: <post-title>

| # | Check | Result | Details |
|---|-------|--------|---------|
| 1 | Code block language tags | PASS/FAIL | N blocks without tags |
| 2 | External URLs | PASS/FAIL | N broken links |
| 3 | Internal post links | PASS/FAIL | N broken references |
| 4 | npm package names | PASS/FAIL | N invalid packages |
| 5 | Version numbers | PASS/WARN | N mismatches |
| 6 | Frontmatter date | PASS/FAIL | Date validity |
| 7 | Term consistency | PASS/WARN | N inconsistencies |
| 8 | Code plausibility | PASS/FAIL | N suspicious patterns |
| 9 | API docs (Context7) | PASS/FAIL/WARN | N API mismatches vs official docs |
| 10 | Behavioral claims (Context7) | PASS/FAIL/WARN | N claims contradicting docs |

### Overall Result: PASS / FAIL

### Issues Found:
- [List of specific issues with file:line references]

### Manual Review Recommended:
- [Claims that cannot be automatically verified]
```

## Exceptions

The following are **not violations**:

1. **Intentional version comparisons** — A post may reference older versions when comparing (e.g., "React 18 introduced... but React 19 improved..."). Flag as WARN for manual review, not FAIL.
2. **Code blocks inside Callout components** — Inline code snippets within `<Callout>` may use simplified examples without full import statements. These do not need full plausibility checks.
3. **Pseudocode blocks** — Code blocks tagged with `text`, `plaintext`, or `pseudo` are not real code and should not be syntax-checked.
4. **Draft posts** — Posts with `published: false` may contain placeholder content and incomplete code examples. Run checks but report as WARN instead of FAIL.
5. **Terminal output blocks** — Code blocks tagged with `output`, `log`, or `text` represent command output, not executable code. Import/API name checks do not apply.
