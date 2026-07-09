---
description: Scaffold a new VAYUZ create/edit form page (page shell, header, fields, footer) matching the event-creation pattern.
argument-hint: "<EntityName> [target file path]"
allowed-tools: Read, Glob, Grep, Write, Edit
---

Scaffold a create/edit form page for **$ARGUMENTS** that matches the VAYUZ event-creation page exactly.

Follow the `vayuz-create-form` skill and these patterns:
- `@.claude/rules/forms-styling.md` (shell, header, inputs, buttons, footer, motion)
- `@.claude/rules/design-tokens.md` (token names)
- `@.claude/rules/design-system.md` (hard rules)

Steps:
1. Confirm the entity name (first arg) and target path (second arg). If no path is given, infer the
   conventional location from how sibling create pages are organized in this repo (Glob for
   `**/Create*.svelte` / `**/*Create*.svelte` and match the structure), and tell me the path you chose.
2. Check that `create-forms.css` exists and import it with the correct relative depth. If it does
   not exist in this project, say so and list the shared classes the page depends on.
3. Generate the page using the page-shell → blobs → scrollable `max-w-3xl` body → `shrink-0` footer
   structure. Include: header (back button + icon + title), a `.form-section` card with a couple of
   representative fields (text input with `.input-hover`, a labeled `<select>`, a `.input-wrap`
   date field, a textarea), inline error pattern, and the Cancel / Create footer buttons.
4. Bind **every** color/spacing/radius to a `var(--token)` — no hex, no `bg-white`, no
   `border-gray-*`. Labels `font-medium`. Inputs `rounded-md outline-none`.
5. Wire field state, basic required-field validation (with `.mi-shake` + `.form-error`), and a
   disabled-until-valid Create button. Leave clearly-marked `TODO` for the submit/API call.
6. After writing, run a quick self-audit (the `/ds-audit` checks) and report the tokens, components,
   and patterns used.

If editing an existing `.svelte` file with CRLF endings and a multi-line Edit fails, normalize to LF
via a small Node script before retrying.
