---
description: Look up VAYUZ design tokens, or find the right token for a color/role. With no argument, prints the token catalogue.
argument-hint: "[token name, hex value, or role e.g. 'primary button hover']"
allowed-tools: Read, Grep
---

Help me use the right VAYUZ design token.

Source of truth: `@.claude/rules/design-tokens.md` (and `@.claude/rules/forms-styling.md` for
form-specific usage).

- **No argument** → print a concise grouped list of the available tokens (primitives, surfaces,
  buttons, inputs, alerts, tags, shadows, radius, spacing) with their values.
- **A token name** (e.g. `--bg-btn-primary-hover`) → give its value, the layer (v2 vs event.css),
  and a usage snippet.
- **A hex value** (e.g. `#f97316`) → tell me which token(s) it maps to so I can replace the literal.
- **A role/description** (e.g. `card hover shadow`, `danger background`, `secondary text`) → name
  the correct token and show how to apply it (Tailwind `var(--…)` arbitrary value + plain CSS).

Always answer with the **token**, never a raw value to paste. If the request maps to no existing
token, say so and suggest the closest approved one — do not invent a new token.

Query: $ARGUMENTS
