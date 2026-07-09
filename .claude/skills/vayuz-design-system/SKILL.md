---
name: vayuz-design-system
description: Enforce the VAYUZ design system when writing or editing any UI, CSS, Tailwind classes, Svelte/React component, or styling in this repo. Use whenever a change touches colors, typography, spacing, radius, shadows, borders, buttons, inputs, or layout — to guarantee design tokens are used (never raw hex/rgb/hsl) and existing components are reused.
---

# VAYUZ Design System

Act as a **Design System Guardian**. Any visual change must map to an approved token, component,
or pattern — consistency and accessibility beat novelty.

## When this applies

Editing `.svelte` / `.tsx` / `.jsx` / `.css` files, adding Tailwind classes, or building/restyling
any component, page, button, input, card, modal, nav, badge, alert, or toggle.

## Workflow

1. **Read the rules** (they are the contract):
   - `@.claude/rules/design-system.md` — the non-negotiable rules.
   - `@.claude/rules/design-tokens.md` — the token catalogue (the exact variable names + values).
   - `@.claude/rules/forms-styling.md` — when the change is a create/edit/form page (or use the
     `vayuz-create-form` skill).
2. **Reuse first.** Search the repo for an existing component / variant / pattern before adding one.
   Grep for class names like `btn-primary`, `input-hover`, `.pill`, `.form-section`, `.user-row`.
3. **Bind to tokens, never literals.** Use `text-[var(--text-primary)]`, `bg-[var(--bg-surface)]`,
   `border-[var(--border-color)]`, `var(--color-primary)` — never `#hex`, `rgb()`, `hsl()`, or
   `bg-white` / `border-gray-*` / `border-slate-*`.
4. **Stay on-scale** for type, spacing, radius, and shadow — only the token steps in
   `design-tokens.md`. Labels are `font-medium`/`font-semibold`, never `font-bold`.
5. **Accessibility:** WCAG contrast, keyboard focus, `for`/`id` on labels, never color-only state.
6. **If nothing fits:** use the closest approved token/component and flag it for design-system
   review — do **not** invent a new color/component.

## Before finishing — self-audit

Run the checklist in `design-system.md` ("Definition of done"). Quick scan: grep the diff for
`#[0-9a-fA-F]{3,6}`, `rgb(`, `rgba(`, `hsl(`, `bg-white`, `border-gray-`, `border-slate-`,
`font-bold` on labels. Any hit that isn't inside the central `:root` token block is a violation —
fix it before reporting done. The `/ds-audit` command automates this scan.

## Report

When done, list the tokens, type styles, spacing, components, and patterns you used.

## Editing `.svelte` files on Windows (CRLF)

Multi-line `Edit` calls can fail on CRLF-line-ending `.svelte` files. If an exact-match Edit fails,
normalize to LF first (e.g. a small Node script reading the file, `.replace(/\r\n/g,'\n')`,
splice by `indexOf`, write back) rather than retrying the same multi-line Edit.
