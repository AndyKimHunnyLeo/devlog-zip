---
name: write-post
description: MDX 블로그 포스트를 일관된 말투와 포맷으로 작성한다. 포스트 주제를 받으면 사용.
---

# Blog Post Writing Guide

## Author Profile

- 해외 스타트업에서 tech lead로 일하는 한국인 개발자
- 외국인 신분으로 겪는 문화 차이, 커뮤니케이션 해프닝도 다룸
- 분야 제한 없음 — 실제로 부딪힌 문제라면 뭐든 씀

## Writing Tone & Style

### 문체: 해체 (반말, ~다/~한다 체)

```
GOOD: "프로덕션에서 터졌다."
GOOD: "이유는 단순했다."
GOOD: "그래서 바꿨다."

BAD: "프로덕션에서 터졌습니다."  (존댓말 금지)
BAD: "이유는 단순했어요."        (존댓말 금지)
BAD: "그래서 바꿨습니다~"        (존댓말 금지)
```

### 문장: 짧고 직설적

- 한 문장에 하나의 생각만
- 군더더기 수식어 제거
- 돌려 말하지 않음

```
GOOD: "설계를 잘못해서 처음부터 다시 짰다."
BAD:  "설계가 아무래도 처음 의도와는 좀 다르게 흘러가게 되어서 결국에는 처음부터 다시 작성하게 되었다."
```

### 체언 종결 활용

문장을 명사/명사구로 끝내는 것을 적극 활용:

```
GOOD: "삽질 과정 그 자체."
GOOD: "장황한 설명 대신 핵심만."
GOOD: "문화 차이에서 오는 커뮤니케이션 미스."
```

### 강조: Bold로 핵심 키워드

```markdown
GOOD: **"왜 그렇게 했는지"** 는 잘 안 나온다.
GOOD: 튜토리얼이 아니라 **필드 노트**에 가깝다.
```

### 리스트: em dash (—) 구분

```markdown
GOOD: - **디버깅 스토리** — 원인을 찾기까지의 삽질 과정 그 자체
BAD:  - **디버깅 스토리**: 원인을 찾기까지의 삽질 과정 그 자체
```

### 피해야 할 것

- "~입니다", "~합니다", "~해요" 등 존댓말
- "사실은", "아무래도", "어쩌면" 등 불필요한 완충어
- "이번 포스트에서는 ~에 대해 알아보겠습니다" 같은 블로그 클리셰
- "도움이 되셨으면 좋겠습니다", "감사합니다" 같은 마무리 인사
- 이모지
- AI가 쓴 듯한 과도하게 정리된 톤

## Post Structure

### Frontmatter

```yaml
---
title: "English Title Here"
date: "YYYY-MM-DD"
description: "한국어 한 줄 요약. 짧고 직설적으로."
tags: ["tag1", "tag2"]
published: true
---
```

- `title` — 영어, 짧고 임팩트 있게
- `date` — 작성일 (YYYY-MM-DD)
- `description` — 한국어, 1-2문장
- `tags` — 소문자 영어, 2-5개
- `published` — 초안이면 `false`

### Section Headings (h2)

짧고 선언적인 문장 또는 질문형:

```markdown
GOOD: ## 정보는 넘치고, 경험은 부족하다
GOOD: ## 왜 이렇게 설계했나
GOOD: ## 결국 답은 단순했다

BAD:  ## Next.js에서 데이터 패칭하는 방법에 대하여
```

### Content Flow

1. **상황 제시** — 어떤 문제를 만났는지 (구체적 상황)
2. **삽질 과정** — 처음에 뭘 시도했고, 왜 안 됐는지
3. **해결** — 최종적으로 어떻게 풀었는지
4. **배운 것** — 한두 줄로 압축

튜토리얼 구조(개념 설명 → 예제)가 아니라 **스토리 구조**(문제 → 삽질 → 해결 → 교훈).

### Code Blocks

- 코드는 반드시 필요한 부분만 (전체 파일 복붙 금지)
- 언어 명시: ```typescript, ```bash 등
- 코드 전후에 맥락 한 줄씩

### Length

- 읽는 데 5분 이내 (약 800-1500 단어)
- 길어지면 시리즈로 분할

## File Location

- Path: `posts/<slug>.mdx`
- Slug: 영어 kebab-case (e.g., `debugging-memory-leak-in-production`)

## Workflow

1. 사용자에게 주제/경험 확인
2. 위 스타일 가이드에 맞춰 초안 작성
3. `posts/<slug>.mdx`에 저장
4. `npx next build`로 빌드 검증

## Related Files

| File | Purpose |
|------|---------|
| `posts/*.mdx` | Blog post files |
| `src/lib/posts.ts` | Post parsing utilities |
| `src/lib/types.ts` | PostMeta type definition |
