---
name: verify-implementation
description: Runs all registered verification skills sequentially to validate implementation integrity. Use after completing a feature or before a PR.
---

# Integrated Implementation Verification

## Purpose

Runs all registered verify skills sequentially to validate codebase integrity:

1. **Pattern consistency** — Confirm project rules are followed across all files
2. **Reference integrity** — Verify cross-file references are valid
3. **Config synchronization** — Ensure config values match the code

## When to Run

- After completing a feature implementation
- Before creating a PR
- After a large-scale refactoring
- When a new team member reviews the code

## Target Skills

| # | Skill | Description |
|---|-------|-------------|
| 1 | `verify-seo` | Verifies SEO optimization patterns across metadata, Open Graph, sitemap, robots, frontmatter, and structured data |
| 2 | `verify-facts` | Verifies technical facts in MDX posts — code blocks, URLs, package names, version numbers, internal links, term consistency, and API accuracy via Context7 docs |

## Workflow

### Step 1: Check Target Skills

Read the **Target Skills** table above to determine which skills to run.

If 0 skills are registered:
- Display "No verification skills registered. Run `/manage-skills` to create skills." and exit.

### Step 2: Sequential Execution

For each registered skill in order:

1. Read `.claude/skills/verify-<name>/SKILL.md`
2. Execute the checks defined in the skill's Workflow section
3. Collect results (PASS/FAIL/WARN)

### Step 3: Integrated Report

After all skills have run, display the integrated results:

```markdown
## Integrated Verification Report

| # | Skill | Result | Details |
|---|-------|--------|---------|
| 1 | verify-example | PASS | All checks passed |
| 2 | verify-other | FAIL | 2 violations found |

### Overall Result: PASS / FAIL

### Violation Details (if FAIL):
- `verify-other` Step 2: <violation details>
```

## Related Files

| File | Purpose |
|------|---------|
| `.claude/skills/manage-skills/SKILL.md` | Skill management (manages this file's target list) |
| `CLAUDE.md` | Project instructions |

## Exceptions

The following are **not problems**:

1. **No registered skills** — Normal for new projects. Create skills first with `/manage-skills`.
2. **WARN results** — Warnings are recommendations, not mandatory fixes.
3. **External tool errors during skill execution** — Transient errors from network, build tools, etc. are not problems with the skill itself.
