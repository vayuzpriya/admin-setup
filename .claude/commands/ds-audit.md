---
description: Audit changed files (or a given path) for VAYUZ design-system violations — hardcoded colors, off-scale values, design drift, a11y gaps.
argument-hint: "[path or glob — defaults to the current git diff]"
allowed-tools: Read, Grep, Glob, Bash, Agent
---

Audit for VAYUZ design-system compliance.

**Scope:** `$ARGUMENTS` if provided; otherwise the files changed in the working tree
(`git status --porcelain` / `git diff --name-only`), filtered to `*.svelte *.tsx *.jsx *.css *.scss`.

Delegate the review to the **design-system-guardian** subagent (read-only) so the main thread stays
clean. Pass it the scope above and ask for its standard report.

The guardian checks against:
- `@.claude/rules/design-system.md`
- `@.claude/rules/design-tokens.md`
- `@.claude/rules/forms-styling.md`

It flags: hardcoded `#hex` / `rgb()` / `hsl()` outside the `:root` token block, `bg-white` on
surfaces, `border-gray-*`/`border-slate-*`, off-scale spacing/radius, `font-bold` on labels,
`outline` on focused inputs, duplicated components, and accessibility gaps — each with `file:line`
and the exact token to use.

Return the guardian's report verbatim, then a one-line verdict (PASS/FAIL with counts). Do not fix
anything unless I follow up and ask.
