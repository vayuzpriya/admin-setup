# Create Forms Styling Guide
> Source of truth: `event.css` + `CreateEvent.svelte` in the event listing repo.  
> Goal: every create page in task manager (Project, Sprint, Task) must look identical to the event creation page.

---

## 1. Import

```svelte
<script>
  import "../../create-forms.css"; // from pages/sprints/ or pages/projects/
  // OR
  import "../create-forms.css";    // from components/
</script>
```

---

## 2. Page Wrapper

The event page wraps everything in `data-theme` + `page-bg` so CSS variables resolve correctly.

```svelte
<!-- Full-page overlay — same as event create page -->
<div class="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[var(--bg-page)]">

  <!-- Blob background (light mode only) — copy from event page -->
  <div class="page-blobs" aria-hidden="true">
    <div class="page-blob blob-indigo"></div>
    <div class="page-blob blob-pink-1"></div>
    <div class="page-blob blob-pink-2"></div>
    <div class="page-blob blob-green"></div>
  </div>

  <!-- Scrollable content — sits above blobs -->
  <div class="flex-1 overflow-y-auto" style="position:relative;z-index:1;">
    <div class="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32">
      <!-- form fields here -->
    </div>
  </div>

  <!-- Sticky footer -->
  <div class="shrink-0 border-t border-[var(--border-color)] px-6 py-3"
       style="background: color-mix(in srgb, var(--bg-surface) 94%, transparent); backdrop-filter: blur(8px);">
    <!-- buttons here -->
  </div>
</div>
```

**Key variables:**
| Variable | Light | Dark |
|---|---|---|
| `--bg-page` | `#f4f6fa` | `#07101E` |
| `--bg-surface` | `#ffffff` | `#0E1A2D` |
| `--bg-surface-2` | `#f8faff` | `#132036` |

---

## 3. Color Tokens (from event.css)

### Primary (Brand Orange)
```
--color-primary:        #f97316
--color-primary-dark:   #ea6c0a
--color-primary-hover:  #f68b2d
--color-primary-alt:    #ef8430
--color-primary-light:  rgba(249,115,22,0.08)   dark mode
--color-primary-light:  #fff0e6                 light mode
--color-orange-50:      rgba(249,115,22,0.08)   dark mode
--color-orange-50:      #fff5ef                 light mode
--color-orange-100:     rgba(249,115,22,0.12)   dark mode
--color-orange-100:     #FEF3E8                 light mode
--color-orange-200:     rgba(249,115,22,0.18)   dark mode
--color-orange-200:     #fde8d0                 light mode
```

### Text
```
--text-primary:    #0f172a  /  #ffffff
--text-secondary:  #64748b  /  #94a3b8
--text-muted:      #94a3b8  /  #64748b
--text-heading:    #12142e  /  #ffffff
--text-body:       #5a5a5a  /  #94a3b8
--text-label:      #8b91a5  /  #64748b
```

### Borders
```
--border-color:   #e2e8f0   /  #182C44
--border-light:   #E3E3E3   /  #182C44
--border-medium:  #d9deea   /  #182C44
```

### Backgrounds
```
--bg-page:      #f4f6fa  /  #07101E
--bg-surface:   #ffffff  /  #0E1A2D
--bg-surface-2: #f8faff  /  #132036
--bg-input:     #f8f9fc  /  #132036
--bg-hover:     #f4f5fb  /  #132036
--bg-card:      #F5F5FA  /  #0E1A2D
```

### Status
```
--color-success:    #16a34a  /  #4ade80
--color-danger:     #ef4444  (both)
--color-warning:    #f5b301  (both)
--color-info:       #3949ab  /  #6366f1
--color-danger-bg:  #fde8e8  /  rgba(239,68,68,0.10)
--color-success-bg: #dcfce7  /  rgba(74,222,128,0.10)
--color-warning-bg: #fffbeb  /  rgba(245,179,1,0.10)
```

---

## 4. Page Header

```svelte
<!-- Exact event page header pattern -->
<div class="mb-5 flex items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
  <div class="flex items-center gap-3">

    <!-- Back button — round border, orange on hover -->
    <button type="button" on:click={onBack}
      class="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full
             border border-[var(--border-color)] text-[var(--text-secondary)]
             transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
      <i class="fa-solid fa-arrow-left text-xs transition-transform group-hover:scale-125"></i>
    </button>

    <!-- Page icon (orange tint bg) -->
    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style="background: rgba(249,115,22,0.1); color: var(--color-primary);">
      <i class="fa-solid fa-bolt text-sm"></i>
    </span>

    <!-- Title + subtitle -->
    <div>
      <h1 class="text-[28px] lg:text-[36px] leading-tight font-[600]
                 text-[var(--text-primary)] tracking-[-0.02em] truncate">
        Create Sprint
      </h1>
      <!-- Or compact header: -->
      <!-- <h1 class="text-lg font-bold text-[var(--text-primary)]">Create Sprint</h1>
           <p class="text-xs text-[var(--text-secondary)]">Subtitle here</p> -->
    </div>
  </div>

  <!-- Optional secondary action -->
  <button class="btn-outline-action inline-flex items-center gap-2 self-start
                 rounded-md border border-[var(--border-color)]
                 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]
                 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
    <i class="fa-regular fa-circle-question"></i>
    Walkthrough
  </button>
</div>
```

---

## 5. Input Fields

### Exact event page pattern

```svelte
<!-- Label -->
<label class="text-sm text-[var(--text-secondary)] font-medium">Event Name</label>

<!-- Input — event page exact classes -->
<input type="text" bind:value={title}
  class="input-hover w-full mt-2 p-2
         surface-2 border rounded-md outline-none
         text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
         focus:border-[var(--color-primary)]
         {fieldErrors.title
           ? 'border-red-400 bg-red-50 mi-shake'
           : 'border-[var(--border-color)]'}"
  placeholder="Give your event a name..." />
```

**Or with `.form-field` wrapper (task manager utility):**
```svelte
<div class="form-field">
  <label for="fieldId">Field Name *</label>
  <input id="fieldId" type="text" bind:value={val}
    class="input-hover w-full rounded-lg border px-4 py-2.5 text-sm" />
</div>
```

### `.input-hover` behaviour (verbatim from event.css)
```css
.input-hover:hover {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px rgba(246, 139, 45, 0.08);
  /* transition: border-color 0.18s ease, box-shadow 0.18s ease */
}
```

### Input with icon — `.input-wrap` + `.input-icon`

Event page uses this for all date/time/search fields:

```svelte
<div class="input-wrap relative mt-2">
  <input type="datetime-local" bind:value={start}
    class="input-hover w-full p-3 pr-10 surface-2 border rounded-md
           text-[var(--text-primary)] border-[var(--border-color)]" />
  <i class="input-icon fa-regular fa-calendar-day
            absolute right-3 top-1/2 -translate-y-1/2
            text-[var(--text-muted)] pointer-events-none"></i>
</div>
```

**Icon animation on `.input-wrap` hover:**
```css
.input-wrap:hover .input-icon {
  transform: scale(1.28);
  color: var(--color-primary);
  /* easing: cubic-bezier(0.34, 1.56, 0.64, 1) — bouncy */
}
```
The inner input also gets orange border + shadow when the wrapper is hovered.

### Select / Dropdown

```svelte
<select bind:value={val}
  class="input-hover w-full rounded-lg border px-4 py-2.5 text-sm
         bg-[var(--bg-surface-2)] text-[var(--text-primary)]
         border-[var(--border-color)]">
  <option value="">Select…</option>
</select>
```

`create-forms.css` applies:
- Custom SVG arrow `data:image/svg+xml` in `#94a3b8` (muted)
- `appearance: none` (removes native arrow)
- `padding-right: 28px` for arrow clearance
- Hover/focus: orange border + soft shadow

### Textarea

```svelte
<textarea bind:value={description} rows="4"
  class="input-hover w-full resize-none rounded-lg border px-4 py-3 text-sm
         bg-[var(--bg-surface-2)] text-[var(--text-primary)]
         placeholder:text-[var(--text-muted)] border-[var(--border-color)]"
  placeholder="Describe..."></textarea>
```

### Placeholder color

Set globally — never hardcode it per field:
```css
input::placeholder, textarea::placeholder { color: var(--text-muted); }
```

### Error state

```svelte
<input class="input-hover ...
              {hasError
                ? 'border-[var(--color-danger)] bg-[var(--color-danger-bg)] mi-shake'
                : 'border-[var(--border-color)]'}" />
{#if hasError}
  <p class="mt-1 text-xs text-[var(--color-danger)] flex items-center gap-1">
    <i class="fa-solid fa-circle-exclamation"></i>{errorMessage}
  </p>
{/if}
```

Or use `.form-error` utility class:
```svelte
<p class="form-error"><i class="fa-solid fa-circle-exclamation"></i>{error}</p>
```

`.form-error` applies `mi-shake` animation on render automatically.

### Date input — hide native picker icon

Already global in `create-forms.css`:
```css
input[type="date"]::-webkit-calendar-picker-indicator { display: none; }
```
Always pair date inputs with a Font Awesome icon inside `.input-wrap`.

---

## 6. Labels

```svelte
<!-- Event page exact label -->
<label class="text-sm text-[var(--text-secondary)] font-medium">Field Name</label>

<!-- With asterisk for required -->
<label class="text-sm text-[var(--text-secondary)] font-medium">
  Field Name <span class="text-[var(--color-danger)]">*</span>
</label>
```

**Rules:**
- Font size: `text-sm` (14px)
- Font weight: `font-medium` or `font-semibold` — never `font-bold`
- Color: always `var(--text-secondary)` — never primary or muted
- `for` attribute must match `id` on the input (accessibility)

---

## 7. Buttons

### Primary CTA — `.btn-pill` (event page) = `.btn-primary` (task manager)

Event page class:
```svelte
<button class="btn-pill disabled:opacity-50 disabled:cursor-not-allowed">
  <i class="fa-regular fa-plus"></i> Create Event
</button>
```

Task manager class:
```svelte
<button class="btn-primary group px-5 py-2.5 text-sm font-bold
               disabled:cursor-not-allowed disabled:opacity-50">
  <i class="fa-solid fa-plus text-xs transition-transform duration-200 group-hover:rotate-90"></i>
  Create Project
</button>
```

**Exact CSS (`btn-pill` / `btn-primary`):**
```css
background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
box-shadow: 0 6px 20px rgba(249, 115, 22, 0.38);
color: #fff;
border: none;
border-radius: 8px;  /* btn-pill uses 18px 18px 18px 0 — task manager uses 8px */
padding: 11px 26px;
font-weight: 600;
/* hover: */
transform: translateY(-2px);
box-shadow: 0 10px 28px rgba(249, 115, 22, 0.52);
filter: brightness(1.06);
/* active: */
transform: scale(0.96);
filter: brightness(0.96);
```

### Secondary — `.btn-footer-sec` (event) = `.btn-secondary` (task manager)

Event page:
```svelte
<button class="btn-footer-sec flex items-center gap-2 px-4 py-2 rounded-md
               border border-[var(--border-color)] text-[13px] text-[var(--text-primary)]">
  <i class="fa-regular fa-save"></i> Save Draft
</button>
```

Task manager:
```svelte
<button class="btn-secondary px-5 py-2.5 text-sm font-semibold">
  Cancel
</button>
```

**Hover:** orange border + text + `translateY(-2px)` + soft shadow.

### Outline action — `.btn-outline-action`

For "Walkthrough", "Generate Link", voice buttons — same class in both repos:

```svelte
<button class="btn-outline-action inline-flex items-center gap-2
               rounded-md border border-[var(--border-color)]
               px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]
               transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
  <i class="fa-regular fa-sparkles text-[var(--color-primary)]"></i>
  Walkthrough
</button>
```

**Hover:** `translateY(-2px) scale(1.03)` + orange border/text + soft shadow.  
**Icon:** animates with `pill-icon-pop` on hover.

---

## 8. Pill / Quick-select Buttons

### `.ce-pill` (event page) = `.pill` (task manager)

Event page exact:
```svelte
<button class="ce-pill px-4 py-1.5 rounded-full text-sm
               border border-[var(--border-color)] text-[var(--text-secondary)]"
        on:click={() => setQuickDate(item)}>
  Today
</button>
```

Task manager:
```svelte
<!-- Inactive -->
<button class="pill text-xs font-semibold">1 week</button>

<!-- Active -->
<button class="pill pill--active text-xs font-semibold">High</button>
```

**Inactive hover (verbatim from event.css):**
```css
transform: translateY(-2px) scale(1.05);
border-color: var(--color-primary) !important;
color: var(--color-primary) !important;
background: rgba(246, 139, 45, 0.07) !important;
box-shadow: 0 4px 12px rgba(246, 139, 45, 0.18);
```

**Active state:**
```css
background: var(--color-primary);
color: #fff;
border-color: var(--color-primary);
box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
```

**Icon inside pill** animates with `pill-icon-pop` keyframe on hover:
```css
@keyframes pill-icon-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.35); }
  100% { transform: scale(1); }
}
```

**Active state shine sweep (`.ce-pill--active::after`):**
```css
background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.40) 50%, transparent 65%);
animation: pill-shine 0.42s ease-out;
```

---

## 9. Segmented Toggle (Public / Private)

Exact event page pattern with `.seg-btn` + `.seg-btn--active`:

```svelte
<div class="flex rounded-md h-[42px] border border-[var(--border-color)]
            overflow-hidden bg-[var(--bg-surface-2)]">
  <button on:click={() => (visibility = 'public')}
    class="seg-btn {visibility === 'public' ? 'seg-btn--active' : ''}
           flex-1 h-full text-sm flex items-center justify-center"
    style={visibility === 'public'
      ? 'background: var(--color-primary); color: #fff; font-weight: 600; border: 1px solid var(--color-primary);'
      : 'color: var(--text-secondary);'}>
    <i class="fa-regular fa-globe mr-2"></i> Public
  </button>
  <button on:click={() => (visibility = 'private')}
    class="seg-btn {visibility === 'private' ? 'seg-btn--active' : ''}
           flex-1 h-full text-sm flex items-center justify-center"
    style={visibility === 'private'
      ? 'background: var(--color-primary); color: #fff; font-weight: 600; border: 1px solid var(--color-primary);'
      : 'color: var(--text-secondary);'}>
    <i class="fa-regular fa-lock mr-2"></i> Private
  </button>
</div>
```

**Inactive hover:** `background: rgba(246, 139, 45, 0.10)` + orange text.  
**Active hover:** `filter: brightness(1.10)`.

---

## 10. Form Card / Surface Container

Event page wraps all fields in a `surface border rounded-md` card:

```svelte
<div class="surface border border-[var(--border-color)] rounded-md p-4 space-y-6">
  <!-- where .surface = background-color: var(--bg-surface) -->
</div>
```

Task manager `form-section` utility:
```svelte
<div class="form-section">
  <!-- grouped fields -->
</div>
```

`.form-section` hover: `border-color: rgba(249,115,22,0.3)` + `box-shadow: 0 4px 12px rgba(249,115,22,0.08)`.

---

## 11. Form Grid / 2-Column Layout

```svelte
<!-- Event page pattern -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>...</div>
  <div>...</div>
</div>

<!-- Task manager utility -->
<div class="form-grid form-grid--2col">
  <div class="form-field">...</div>
  <div class="form-field">...</div>
</div>
```

`form-grid--2col` collapses to 1 column on mobile automatically via `auto-fit, minmax(250px, 1fr)`.

---

## 12. User / Member Search Row — `.user-row` + `.speaker-avatar`

```svelte
<button type="button"
  class="user-row flex w-full items-center gap-3 px-3.5 py-2.5 text-sm text-left"
  style="background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">

  <!-- Avatar -->
  {#if person.image}
    <img src={person.image} alt="" class="speaker-avatar h-8 w-8 rounded-full object-cover shrink-0" />
  {:else}
    <span class="speaker-avatar h-8 w-8 rounded-full bg-[var(--color-primary)]
                 text-white text-xs font-bold flex items-center justify-center shrink-0">
      {initials}
    </span>
  {/if}

  <!-- Name + email -->
  <span class="min-w-0 flex-1">
    <span class="block text-[var(--text-primary)] font-medium truncate">{person.name}</span>
    <span class="block text-xs text-[var(--text-muted)] truncate">{person.email}</span>
  </span>

  <!-- Selected indicator -->
  <span class="h-5 w-5 rounded-md flex items-center justify-center shrink-0"
        style={selected
          ? 'background: var(--color-primary); border: 1.5px solid var(--color-primary); color: #fff;'
          : 'border: 1.5px solid var(--border-color);'}>
    {#if selected}<i class="fa-solid fa-check text-[10px]"></i>{/if}
  </span>
</button>
```

**`.user-row` hover (verbatim from event.css):**
```css
background: rgba(249, 115, 22, 0.08) !important;
border-color: rgba(249, 115, 22, 0.25) !important;
transform: translateX(3px);  /* slides right */
```
`.speaker-avatar` also scales to `1.12` + shadow on row hover.

---

## 13. Selected User Chip — `.user-chip` + `.user-chip-x`

```svelte
<span class="user-chip inline-flex items-center gap-2 rounded-full
             border border-[var(--border-color)] bg-[var(--bg-surface-2)]
             px-2 py-1 text-sm text-[var(--text-primary)]">
  <img src={person.image} alt="" class="h-6 w-6 rounded-full object-cover" />
  {person.name}
  <button class="user-chip-x ml-0.5" on:click={() => remove(person.id)}>
    <i class="fa-solid fa-xmark text-xs"></i>
  </button>
</span>
```

**`.user-chip` hover:** `translateY(-1px) scale(1.03)` + orange border + soft shadow.  
**`.user-chip-x` hover:** `color: var(--color-danger)`.

---

## 14. Tags / Tech Stack Chips — `.tag-added` + `.tag-x`

```svelte
<span class="tag-added inline-flex items-center gap-1 rounded-full
             border border-[var(--border-color)] bg-[var(--bg-surface-2)]
             px-2.5 py-0.5 text-xs font-medium text-[var(--text-primary)]">
  {tech}
  <button class="tag-x" on:click={() => remove(tech)}>
    <i class="fa-solid fa-xmark text-[9px]"></i>
  </button>
</span>
```

**`.tag-added` hover:** `scale(1.06) translateY(-1px)` + orange glow shadow.  
**`.tag-x` hover:** `rotate(90deg)` + `color: var(--color-danger)`.

---

## 15. Dashed "Add" Button — `.add-dashed-btn`

Used for "Add FAQ", "Add Agenda Item", etc.:

```svelte
<button class="add-dashed-btn w-full flex items-center justify-center gap-2
               rounded-md px-4 py-3 text-sm text-[var(--text-secondary)]">
  <i class="fa-solid fa-plus"></i> Add Item
</button>
```

**CSS:**
```css
border: 2px dashed var(--border-color);
/* hover: */ border-color: var(--color-primary);
             color: var(--color-primary);
             background: rgba(246,139,45,0.06);
             transform: scale(1.01);
             box-shadow: 0 4px 14px rgba(246,139,45,0.15);
```

---

## 16. Form Footer

### Event page pattern (full-width fixed)
```svelte
<div id="create-event-form-footer"
     class="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border-color)]
            bg-white/90 backdrop-blur-lg">
  <div class="w-full px-6 py-3 flex items-center justify-between gap-4">
    <!-- Status hint -->
    <div class="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)]">
      {#if createEventDisabledReason}
        Complete required field: {createEventDisabledReason}
      {:else}
        Ready to create
      {/if}
    </div>
    <!-- Buttons -->
    <div class="flex gap-4 ml-auto">
      <button class="btn-footer-sec flex items-center gap-2 px-4 py-2 rounded-md
                     border border-[var(--border-color)] text-[13px] text-[var(--text-primary)]">
        <i class="fa-regular fa-save"></i> Save Draft
      </button>
      <button class="btn-pill disabled:opacity-50 disabled:cursor-not-allowed">
        <i class="fa-regular fa-plus"></i> Create Event
      </button>
    </div>
  </div>
</div>
```

### Task manager pattern (shrink-0 inside flex column)
Since the page is already `fixed inset-0`, use `shrink-0` not `fixed bottom-0`:
```svelte
<div class="shrink-0 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)] px-6 py-4">
  <div class="flex items-center justify-between gap-4 w-full max-w-3xl mx-auto">
    <p class="hidden md:block text-xs text-[var(--text-secondary)]">
      {hint}
    </p>
    <div class="flex gap-3 ml-auto">
      <button class="btn-secondary px-5 py-2.5 text-sm font-semibold">Cancel</button>
      <button class="btn-primary group px-5 py-2.5 text-sm font-bold
                     disabled:cursor-not-allowed disabled:opacity-50">
        Create Sprint
      </button>
    </div>
  </div>
</div>
```

---

## 17. Transition / Animation Timing

All interactions match the event page:

| Purpose | Duration | Easing |
|---|---|---|
| Color / opacity change | `0.15s–0.18s` | `ease` |
| Scale / transform / lift | `0.18s–0.22s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy) |
| Page enter fly | `0.22s–0.28s` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Hover lift amount | `translateY(-2px)` | — |
| Hover scale | `scale(1.05)` | — |
| Active press | `scale(0.96)` | — |

---

## 18. Dark Mode Input Override

The event.css applies this globally — mirrored in `create-forms.css`:

```css
[data-theme="dark"] input,
[data-theme="dark"] textarea,
[data-theme="dark"] select {
  background-color: var(--bg-surface-2) !important;  /* #132036 */
  color: var(--text-primary) !important;              /* #ffffff */
}
```

Never hardcode dark backgrounds on inputs. Let `--bg-surface-2` handle it.

---

## 19. Checkbox / Radio

```svelte
<input type="checkbox" class="h-4 w-4 shrink-0 rounded accent-[var(--color-primary)]" />
```

Toggle row (checkbox + label card):
```svelte
<label class="toggle-row flex cursor-pointer items-center gap-3
              rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-2)]
              px-4 py-3">
  <input type="checkbox" bind:checked={value}
    class="h-4 w-4 shrink-0 rounded accent-[var(--color-primary)]" />
  <span class="text-sm text-[var(--text-primary)]">Label text</span>
  <!-- Optional AI badge -->
  <span class="ml-auto inline-flex items-center gap-1 rounded-full bg-violet-100
               px-2.5 py-0.5 text-[10px] font-bold text-violet-600">
    <i class="fa-solid fa-wand-magic-sparkles text-[9px]"></i> AI
  </span>
</label>
```

**`.toggle-row` hover:** `background: rgba(246,139,45,0.06)` + orange label.

---

## 20. Scrollbar

```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-primary); }
```

Hide scrollbar on horizontal strips:
```svelte
<div class="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
```

---

## 21. Microinteraction Keyframes

| Class | Effect |
|---|---|
| `.mi-shake` | Horizontal shake — use on error state |
| `.mi-pop-in` | Scale in 72%→114%→100% — use on appear |
| `.mi-pop-out` | Scale out — use on remove |
| `.mi-fade-slide-up` | Fade + translateY(12px)→0 |
| `.mi-stagger-in` | Same as fade-slide-up with `--mi-delay` support |
| `.mi-crossfade` | Opacity 0→1 |
| `.mi-spin-once` | 360° spin once |
| `.mi-green-pulse` | Green glow ring pulse |
| `.mi-danger-hover` | Shake on hover (for delete buttons) |

---

## 22. Class Mapping: Event Page → Task Manager

| Event page | Task manager | Notes |
|---|---|---|
| `.btn-pill` | `.btn-primary` | Same gradient + lift effect |
| `.btn-footer-sec` | `.btn-secondary` | Border ghost hover |
| `.btn-cancel` | `.btn-secondary` or `.btn-ghost` | Ghost / no border |
| `.btn-outline-action` | `.btn-outline-action` | Same class, copied to `create-forms.css` |
| `.ce-pill` | `.pill` | Same hover behavior |
| `.ce-pill--active` | `.pill--active` | Same solid orange |
| `.seg-btn` / `.seg-btn--active` | Inline `.pill` variant | Use `style` for active state |
| `.input-hover` | `.input-hover` | **Identical** |
| `.input-wrap` + `.input-icon` | `.input-wrap` + `.input-icon` | **Identical** |
| `.surface` | `bg-[var(--bg-surface)]` | Tailwind arbitrary value |
| `.surface-2` | `bg-[var(--bg-surface-2)]` | Tailwind arbitrary value |
| `.text-primary` | `text-[var(--text-primary)]` | Tailwind arbitrary value |
| `.text-secondary` | `text-[var(--text-secondary)]` | Tailwind arbitrary value |
| `.text-muted` | `text-[var(--text-muted)]` | Tailwind arbitrary value |
| `.user-row` | `.user-row` | Same, defined in `create-forms.css` |
| `.user-chip` / `.user-chip-x` | `.user-chip` / `.user-chip-x` | Same, defined in `create-forms.css` |
| `.tag-added` / `.tag-x` | `.tag-added` / `.tag-x` | Same, defined in `create-forms.css` |
| `.add-dashed-btn` | `.add-dashed-btn` | Same, defined in `create-forms.css` |
| `.toggle-row` | `.toggle-row` | Same, defined in `create-forms.css` |
| `.action-row` | `.action-row` | Same, defined in `create-forms.css` |
| `rounded-md` | `rounded-lg` | Event uses `rounded-md`, task manager uses `rounded-lg` — pick one per page and be consistent |

---

## 23. What Must NOT Be Done

- No hardcoded hex colors (`#f97316`, `#0f172a`, `#182C44`) in class attributes — use CSS variables
- No `style="color: #xxx"` inline for text — use `text-[var(--token)]`
- No `border-gray-200` or `border-slate-300` — use `border-[var(--border-color)]`
- No `bg-white` on inputs or form cards — use `bg-[var(--bg-surface)]` or `bg-[var(--bg-surface-2)]`
- No `font-bold` on labels — labels are `font-medium` or `font-semibold`, bold is for headings and CTAs
- No padding on `<label>` elements directly — use `.form-field` wrapper
- No custom `border-radius` larger than `rounded-lg` on regular inputs — event page uses `rounded-md`
- No `outline` on focused inputs — event page removes it with `outline-none` and uses `border-color` only
