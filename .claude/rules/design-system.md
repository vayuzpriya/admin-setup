# Rule: VAYUZ Design System Compliance

> **Status:** Non-negotiable. Applies to every UI, CSS, component, and styling change.
> **Mindset:** You are a Design System Guardian. Consistency, reusability, and accessibility
> outrank visual experimentation — always.

These rules govern *how* you style. The concrete values live in
[`design-tokens.md`](./design-tokens.md); the form/page patterns live in
[`forms-styling.md`](./forms-styling.md).

---

## 1. Colors — tokens only

- Use **only** predefined CSS color variables / design tokens.
- **Never** write a hardcoded `#hex`, `rgb()`, `rgba()`, `hsl()`, or named color in markup or
  component styles. (The only place raw values may live is the central `:root` token definition.)
- Never invent a new color or modify an existing one.
- Every color must resolve to an approved token.

| ✅ Correct | ❌ Incorrect |
|---|---|
| `text-[var(--text-primary)]` | `style="color:#12142E"` |
| `bg-[var(--bg-surface)]` | `bg-white` on a form card |
| `border-[var(--border-color)]` | `border-slate-300` / `border-gray-200` |
| `var(--color-primary)` | `#EF8430` / `#f97316` |

## 2. Typography — approved scale only

- Use only approved font families (`--font-display`, `--font-body`), weights, sizes, and line
  heights from the type scale.
- No arbitrary sizes (`17px`, `27px`) and no custom font families.
- Labels are `font-medium` / `font-semibold` — **never** `font-bold` (bold is for headings and CTAs).

## 3. Spacing — token steps only

- Use only the approved spacing steps (`--space-1` … `--space-12`, i.e. 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48).
- No arbitrary one-off margins or paddings (`13px`, `22px`, `37px`).

## 4. Border radius — token only

- Use `--radius`, `--radius-sm`, `--radius-xs`, `--radius-pill`. No `7px` / `15px` one-offs.

## 5. Shadows & elevation — predefined only

- Use `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-card-hover`.
- Never hand-roll a custom shadow or tweak blur/opacity inline.

## 6. Components & patterns — reuse before you build

Before creating anything new, search in this order and reuse the first match:

1. An existing component.
2. An existing variant of that component.
3. An existing pattern.

Avoid duplicate components, near-identical variants, and one-off UI. If nothing fits, use the
closest approved alternative and **flag it for design-system review** rather than inventing a style.

## 7. Icons

- Use only the approved icon library (Font Awesome in these projects).
- Keep existing icon sizes and stroke widths. Don't introduce new icon styles.

## 8. Layout

- Follow the approved grid, breakpoints, and responsive patterns. Keep alignment and component
  spacing consistent.

## 9. Accessibility (mandatory)

- Meet WCAG contrast standards.
- Maintain a readable type hierarchy.
- Support keyboard navigation and screen readers (`for`/`id` pairing on labels, `aria-*` where needed).
- Never communicate state by color alone — pair with icon/text.

---

## Design decision framework

For every styling decision, reuse in this priority: **token → component → pattern → layout.**
If none exists, do **not** invent — use the closest approved option and flag for review.

## Definition of done — verify before finalizing

- [ ] No custom colors (no raw hex / rgb / hsl in markup)
- [ ] No custom typography (family / size / weight off-scale)
- [ ] No custom spacing, radius, or shadows
- [ ] No duplicate or one-off components
- [ ] Accessibility checks pass
- [ ] Every value maps to an approved token, component, or pattern — zero design drift

If any element does not map to an existing token/component/pattern: **stop and request
design-system approval** instead of shipping a new style.

## Report what you used

When you generate or restyle a screen/component, list the tokens, type styles, spacing,
components, and patterns you used so the change is auditable.
