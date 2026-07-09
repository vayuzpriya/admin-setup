# Reference: Create-Forms Styling Patterns

> Every create / edit page (Project, Sprint, Task, Event…) must look identical to the event
> creation page. These are the exact, reusable patterns. Source of truth: `event.css` +
> `CreateEvent.svelte`; shared classes live in `create-forms.css`.
> Color values are in [`design-tokens.md`](./design-tokens.md); the hard rules in
> [`design-system.md`](./design-system.md).

---

## Import

```svelte
<script>
  import "../../create-forms.css"; // from pages/sprints/ or pages/projects/
  // import "../create-forms.css"; // from components/
</script>
```

## Page shell (full-page overlay)

```svelte
<div class="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[var(--bg-page)]">
  <!-- decorative blobs (light mode), aria-hidden -->
  <div class="page-blobs" aria-hidden="true">
    <div class="page-blob blob-indigo"></div>
    <div class="page-blob blob-pink-1"></div>
    <div class="page-blob blob-pink-2"></div>
    <div class="page-blob blob-green"></div>
  </div>

  <!-- scrollable content above blobs -->
  <div class="flex-1 overflow-y-auto" style="position:relative;z-index:1;">
    <div class="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32">
      <!-- fields -->
    </div>
  </div>

  <!-- sticky footer -->
  <div class="shrink-0 border-t border-[var(--border-color)] px-6 py-3"
       style="background: color-mix(in srgb, var(--bg-surface) 94%, transparent); backdrop-filter: blur(8px);">
    <!-- buttons -->
  </div>
</div>
```

## Header

```svelte
<div class="mb-5 flex items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
  <div class="flex items-center gap-3">
    <button type="button" on:click={onBack}
      class="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full
             border border-[var(--border-color)] text-[var(--text-secondary)]
             transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
      <i class="fa-solid fa-arrow-left text-xs transition-transform group-hover:scale-125"></i>
    </button>
    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style="background: var(--color-primary-light); color: var(--color-primary);">
      <i class="fa-solid fa-bolt text-sm"></i>
    </span>
    <div>
      <h1 class="text-[28px] lg:text-[36px] leading-tight font-[600]
                 text-[var(--text-primary)] tracking-[-0.02em] truncate">Create Sprint</h1>
    </div>
  </div>
</div>
```

## Inputs

```svelte
<label class="text-sm text-[var(--text-secondary)] font-medium">Event Name</label>

<input type="text" bind:value={title}
  class="input-hover w-full mt-2 p-2 surface-2 border rounded-md outline-none
         text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
         focus:border-[var(--color-primary)]
         {fieldErrors.title ? 'border-[var(--color-danger)] bg-[var(--color-danger-bg)] mi-shake'
                            : 'border-[var(--border-color)]'}"
  placeholder="Give your event a name..." />
```

- `.input-hover` → orange border + `0 0 0 3px rgba(246,139,45,.08)` shadow on hover (identical class in both repos).
- Icon field: wrap in `.input-wrap` with `.input-icon`; the icon does a bouncy `scale(1.28)` + turns orange on wrapper hover.
- `<select>`: `create-forms.css` adds a custom SVG arrow, `appearance:none`, `padding-right:28px`, orange hover/focus.
- `<textarea>`: same `.input-hover` classes, `resize-none`.
- Placeholders are global: `input::placeholder,textarea::placeholder{ color: var(--text-muted) }` — never per-field.
- Date inputs hide the native picker icon globally; always pair with a FA icon in `.input-wrap`.

## Labels (rules)

- Size `text-sm`; weight `font-medium`/`font-semibold` (**never** `font-bold`).
- Color always `var(--text-secondary)`.
- Required marker: `<span class="text-[var(--color-danger)]">*</span>`.
- `for` must match the input `id`.

## Errors

```svelte
<p class="mt-1 text-xs text-[var(--color-danger)] flex items-center gap-1">
  <i class="fa-solid fa-circle-exclamation"></i>{errorMessage}
</p>
```
Or the `.form-error` utility (auto-runs `mi-shake`).

## Buttons

| Role | Event page | Task manager | Look |
|---|---|---|---|
| Primary CTA | `.btn-pill` | `.btn-primary` | orange gradient, lift `-2px`, press `scale(.96)` |
| Secondary | `.btn-footer-sec` | `.btn-secondary` | ghost border, orange on hover |
| Cancel | `.btn-cancel` | `.btn-secondary` / `.btn-ghost` | no/ghost border |
| Outline action | `.btn-outline-action` | `.btn-outline-action` | identical; icon `pill-icon-pop` on hover |

```svelte
<button class="btn-primary group px-5 py-2.5 text-sm font-bold
               disabled:cursor-not-allowed disabled:opacity-50">
  <i class="fa-solid fa-plus text-xs transition-transform duration-200 group-hover:rotate-90"></i>
  Create Project
</button>
```
Primary CSS: `linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))`,
`box-shadow:0 6px 20px rgba(249,115,22,.38)`, white text, `border-radius:8px`.

## Pills / quick-select — `.ce-pill` (event) = `.pill` (task manager)

```svelte
<button class="pill text-xs font-semibold">1 week</button>
<button class="pill pill--active text-xs font-semibold">High</button>
```
- Inactive hover: `translateY(-2px) scale(1.05)`, orange border/text, `rgba(246,139,45,.07)` bg.
- Active: solid `var(--color-primary)`, white text, shine sweep + `pill-icon-pop` icon.

## Segmented toggle (Public / Private) — `.seg-btn` / `.seg-btn--active`

Active state set inline: `background: var(--color-primary); color:#fff; font-weight:600;`.
Inactive hover `rgba(246,139,45,.10)` + orange text; active hover `filter: brightness(1.10)`.

## Containers, grid, rows, chips

- **Card:** `.surface border border-[var(--border-color)] rounded-md p-4 space-y-6`
  (task-manager `.form-section`; hover → orange-tinted border + soft shadow).
- **2-col grid:** `grid grid-cols-1 md:grid-cols-2 gap-4` (task-manager `.form-grid--2col`,
  auto-collapses via `auto-fit, minmax(250px,1fr)`).
- **User row** `.user-row` + `.speaker-avatar`: hover slides `translateX(3px)`, orange tint, avatar `scale(1.12)`.
- **User chip** `.user-chip` + `.user-chip-x`: hover `translateY(-1px) scale(1.03)`; ✕ turns danger.
- **Tag chip** `.tag-added` + `.tag-x`: hover `scale(1.06)`, orange glow; ✕ rotates `90deg` to danger.
- **Dashed add** `.add-dashed-btn`: `2px dashed var(--border-color)` → orange on hover.
- **Toggle row** `.toggle-row`: checkbox uses `accent-[var(--color-primary)]`; hover orange tint.

## Footer

Page is already `fixed inset-0`, so footer uses `shrink-0`, not `fixed bottom-0`:

```svelte
<div class="shrink-0 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)] px-6 py-4">
  <div class="flex items-center justify-between gap-4 w-full max-w-3xl mx-auto">
    <p class="hidden md:block text-xs text-[var(--text-secondary)]">{hint}</p>
    <div class="flex gap-3 ml-auto">
      <button class="btn-secondary px-5 py-2.5 text-sm font-semibold">Cancel</button>
      <button class="btn-primary group px-5 py-2.5 text-sm font-bold
                     disabled:cursor-not-allowed disabled:opacity-50">Create Sprint</button>
    </div>
  </div>
</div>
```

## Motion timing

| Purpose | Duration | Easing |
|---|---|---|
| Color / opacity | 0.15–0.18s | `ease` |
| Scale / lift | 0.18–0.22s | `cubic-bezier(0.34,1.56,0.64,1)` (bouncy) |
| Page enter fly | 0.22–0.28s | `cubic-bezier(0.22,1,0.36,1)` |
| Hover lift / scale / press | — | `translateY(-2px)` / `scale(1.05)` / `scale(0.96)` |

Microinteraction classes: `.mi-shake` (error), `.mi-pop-in`/`.mi-pop-out`, `.mi-fade-slide-up`,
`.mi-stagger-in` (`--mi-delay`), `.mi-crossfade`, `.mi-spin-once`, `.mi-green-pulse`, `.mi-danger-hover`.

## Dark-mode inputs (global — never hardcode)

```css
[data-theme="dark"] input,
[data-theme="dark"] textarea,
[data-theme="dark"] select {
  background-color: var(--bg-surface-2) !important;
  color: var(--text-primary) !important;
}
```

## Scrollbar

```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-primary); }
```
Use `no-scrollbar` on horizontal strips.

---

## Must NOT do

- ❌ Hardcoded hex (`#f97316`, `#0f172a`, `#182C44`) in class/style attributes → use `var(--token)`.
- ❌ `style="color:#xxx"` for text → `text-[var(--token)]`.
- ❌ `border-gray-200` / `border-slate-300` → `border-[var(--border-color)]`.
- ❌ `bg-white` on inputs / form cards → `bg-[var(--bg-surface)]` or `bg-[var(--bg-surface-2)]`.
- ❌ `font-bold` on labels → `font-medium` / `font-semibold`.
- ❌ Padding directly on `<label>` → use `.form-field` wrapper.
- ❌ Radius larger than `rounded-lg` on inputs (event page uses `rounded-md`).
- ❌ `outline` on focused inputs → `outline-none` + `border-color` only.
