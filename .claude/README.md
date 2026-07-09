# `.claude/` — VAYUZ Design System Kit

A portable Claude Code configuration that makes any VAYUZ project follow the design system
automatically: design tokens only (no raw hex), reuse-first components, and the shared
create-form patterns. **Copy this `.claude/` folder into another repo and add three lines to that
repo's `CLAUDE.md`** (see *Reuse* below) — that's the whole setup.

## What's inside

```
.claude/
├── README.md                       ← this file
├── rules/                          ← source of truth (loaded via CLAUDE.md @-imports)
│   ├── design-system.md            ← non-negotiable rules + definition of done
│   ├── design-tokens.md            ← full token catalogue (v2 + event.css layers)
│   └── forms-styling.md            ← exact create/edit-page patterns & class map
├── skills/                         ← model-invoked, on-demand expertise
│   ├── vayuz-design-system/SKILL.md   ← any UI / CSS / component change
│   └── vayuz-create-form/SKILL.md     ← build a create/edit form page
├── agents/
│   └── design-system-guardian.md   ← read-only compliance reviewer (Read/Grep/Glob)
├── commands/                       ← slash commands
│   ├── ds-audit.md                 ← /ds-audit  — scan changes for violations
│   ├── ds-scaffold-form.md         ← /ds-scaffold-form <Entity> — new form page
│   └── ds-tokens.md                ← /ds-tokens [query] — token lookup
└── settings.json / settings.local.json   ← permissions (project-specific, not part of the kit)
```

## How the pieces fit

| Piece | Trigger | Role |
|---|---|---|
| **rules/** | always (imported by `CLAUDE.md`) | the contract — what's allowed, the token values, the patterns |
| **skills/** | model decides from the description | deep how-to for a UI change or a form page |
| **agents/design-system-guardian** | after edits, or `/ds-audit` | independent read-only audit |
| **commands/** | you type `/ds-…` | one-shot actions: audit, scaffold, look up tokens |

Rules are the single source of truth; skills, the agent, and commands all `@`-reference them, so
there's no duplicated content to keep in sync.

## Core principles (enforced everywhere)

1. **Tokens, never literals** — `var(--token)` / `text-[var(--…)]`, never `#hex`, `rgb()`, `hsl()`,
   `bg-white`, `border-gray-*`.
2. **Reuse before you build** — existing component → variant → pattern; only then propose new.
3. **Stay on-scale** — type, spacing, radius, shadow come from the token steps only.
4. **Accessibility is mandatory** — WCAG contrast, keyboard focus, `for`/`id`, no color-only state.
5. **No design drift** — if nothing fits, use the closest token and flag for review; don't invent.

## Reuse in another project

1. Copy the `.claude/` folder (you can drop `settings.local.json`, which is machine-specific).
2. Add these imports to the target repo's `CLAUDE.md` (create it if missing):
   ```md
   @.claude/rules/design-system.md
   @.claude/rules/design-tokens.md
   @.claude/rules/forms-styling.md
   ```
3. If the project's brand values differ, edit **`rules/design-tokens.md`** only — every other file
   references tokens by name, so nothing else changes.
4. Skills and commands are picked up automatically; verify with `/help` (commands) and by checking
   the skills list. Run `/ds-audit` on a sample file to confirm it's wired up.

## Source documents

Distilled from `src/VAYUZ-Design-System-bitovn.md` (Background Tokens v2) and
`src/CREATE_FORMS_STYLING_GUIDE.md` (create-forms patterns). Those originals stay the long-form
spec; the files here are the operational, Claude-facing version.
