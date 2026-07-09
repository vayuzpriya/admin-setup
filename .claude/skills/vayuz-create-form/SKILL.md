---
name: vayuz-create-form
description: Build or restyle a VAYUZ create/edit/form page (Create Project, Create Sprint, Create Task, Create Event, settings forms, modals with inputs) so it matches the event-creation page exactly. Use when the task is scaffolding a new form page or making form fields, labels, buttons, pills, chips, toggles, or the form footer match the VAYUZ create-page pattern.
---

# VAYUZ Create-Form Page

Every create/edit page must be visually identical to the event-creation page. The exact patterns,
class names, and behaviours are in `@.claude/rules/forms-styling.md`; tokens in
`@.claude/rules/design-tokens.md`; the hard rules in `@.claude/rules/design-system.md`. Read them.

## Workflow

1. **Import the shared CSS** once: `import "../../create-forms.css";` (adjust depth). This defines
   `.input-hover`, `.input-wrap`/`.input-icon`, `.btn-primary`/`.btn-secondary`, `.pill`,
   `.user-row`, `.user-chip`, `.tag-added`, `.add-dashed-btn`, `.toggle-row`, the `.mi-*`
   microinteractions, blobs, and the dark-mode input override.
2. **Use the page shell** from `forms-styling.md`: `fixed inset-0` overlay → blobs → scrollable
   `max-w-3xl` body → `shrink-0` footer. Footer is `shrink-0`, not `fixed bottom-0`.
3. **Reuse the building blocks** verbatim — header, inputs, labels, errors, buttons, pills,
   segmented toggle, cards, 2-col grid, user/member rows, chips, dashed-add, footer. Copy the
   snippets from `forms-styling.md`; do not re-derive them.
4. **Bind every value to a token** (`var(--token)` / `text-[var(--...)]`). No hex, no `bg-white`,
   no `border-gray-*`. Labels `font-medium`/`font-semibold`; inputs `rounded-md`, `outline-none`.
5. **Match motion**: bouncy `cubic-bezier(0.34,1.56,0.64,1)` for lifts/scales, `.mi-shake` on
   error, `-2px` hover lift, `scale(0.96)` press.
6. **Accessibility**: `for`/`id` pairing, required `*` in `var(--color-danger)`, focus rings via
   border + soft shadow (never `outline`).

## Class map (event page → task manager)

| Event | Task manager | | Event | Task manager |
|---|---|---|---|---|
| `.btn-pill` | `.btn-primary` | | `.ce-pill` | `.pill` |
| `.btn-footer-sec` | `.btn-secondary` | | `.ce-pill--active` | `.pill--active` |
| `.input-hover` | `.input-hover` (same) | | `.surface` | `bg-[var(--bg-surface)]` |
| `.input-wrap`/`.input-icon` | same | | `.surface-2` | `bg-[var(--bg-surface-2)]` |
| `.btn-outline-action` | same | | `.user-row` / `.user-chip` / `.tag-added` | same |

## Finish

Run `/ds-audit` (or the self-audit in the `vayuz-design-system` skill) and report the tokens,
components, and patterns used. Confirm the "Must NOT do" list in `forms-styling.md` is clean.
