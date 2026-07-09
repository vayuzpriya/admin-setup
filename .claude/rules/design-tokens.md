# Reference: VAYUZ Design Tokens

> The canonical token catalogue. **Always reference the variable, never the literal value.**
> Two token layers coexist in VAYUZ products: the **Background Tokens v2** system (Social product)
> and the **event.css / create-forms** layer (task-manager + event listing). Both follow the same
> rule — use the variable. Where a project defines a token, that project's value wins.

---

## Naming convention

```
--bg-{component}[-{variant}][-{state}]

--bg-page                    surface, no variant/state
--bg-btn-primary             button · primary · default
--bg-btn-primary-hover       button · primary · hover
--bg-alert-success-filled    alert · success · filled
--bg-dropdown-item-selected  dropdown · item · selected
--bg-toggle-disabled-on      toggle · disabled state when on
```

| State suffix | Meaning | Component prefix | Maps to |
|---|---|---|---|
| *(none)* | default / resting | `--bg-page` | app canvas |
| `-hover` | cursor over | `--bg-card` / `--bg-surface` | card / panel / nav bar |
| `-active` | pressed | `--bg-nav` | nav item |
| `-focus` | keyboard focus | `--bg-btn` | button |
| `-disabled` | non-interactive | `--bg-input` | text input / textarea |
| `-checked` / `-indeterminate` | checkbox | `--bg-checkbox` / `--bg-radio` | checkbox / radio |
| `-selected` | dropdown / radio | `--bg-toggle` | toggle / switch |
| `-filled` | alert solid/toast | `--bg-select` / `--bg-dropdown` | select / menu |
| `-on` / `-off` / `-thumb` | toggle parts | `--bg-alert` / `--bg-tag` | alert / badge |

---

## Layer A — Background Tokens v2 (`:root`)

Copy-paste-ready. 58 background tokens + primitives. Source: Social Profile UI.

```css
:root {
  /* ── Brand primitives ── */
  --color-primary:            #EF8430;
  --color-primary-hover:      #DD6A0F;
  --color-primary-dark:       #C55A00;
  --color-primary-alt:        #FF6B00;
  --color-orange-shadow:      rgba(239,132,48,0.18);
  --color-orange-shadow-lg:   rgba(239,132,48,0.28);

  /* ── Text ── */
  --text-primary:             #12142E;
  --text-body:                #5A5A5A;
  --text-caption:             #A9A9A9;
  --text-heading:             #12142E;

  /* ── Borders ── */
  --border-color:             #E3E3E3;
  --border-medium:            #C0C0C0;

  /* ── Surfaces ── */
  --bg-page:                  #F0F2F9;
  --bg-card:                  #FFFFFF;
  --bg-surface:               #FFFFFF;
  --bg-column:                #F8F8FC;
  --bg-section:               #E8E6F9;
  --bg-subtle:                #F5F5FA;
  --bg-inverse:               #12141F;
  --bg-skeleton:              #EAEAEA;

  /* ── Surface states ── */
  --bg-surface-default:       #FFFFFF;
  --bg-surface-hover:         #F8F8FC;
  --bg-surface-active:        #F0F0F8;
  --bg-surface-focus:         #FFFFFF; /* + ring rgba(239,132,48,.20) */
  --bg-surface-disabled:      #F5F5F5;

  /* ── Blob (user-customisable) ── */
  --bg-blob-primary:          #E8E6F9;
  --bg-blob-secondary:        #D0CCF8;
  --bg-blob-opacity:          0.35;

  /* ── Navigation ── */
  --bg-nav-default:           #FFFFFF;
  --bg-nav-hover:             #FFF5EE;
  --bg-nav-active:            #EF8430;
  --bg-nav-selected:          #FFF0E6;
  --bg-nav-focus:             #F0F0F8;

  /* ── Buttons · primary ── */
  --bg-btn-primary:           #EF8430;
  --bg-btn-primary-hover:     #DD6A0F;
  --bg-btn-primary-active:    #C55A00;
  --bg-btn-primary-focus:     #EF8430; /* + orange ring */
  --bg-btn-primary-disabled:  #F5C89A;

  /* ── Buttons · secondary ── */
  --bg-btn-secondary:         #FFFFFF;
  --bg-btn-secondary-hover:   #F8F8FC;
  --bg-btn-secondary-active:  #F0F0F8;
  --bg-btn-secondary-disabled:#F5F5F5;

  /* ── Buttons · ghost ── */
  --bg-btn-ghost:             transparent;
  --bg-btn-ghost-hover:       #FFF5EE;
  --bg-btn-ghost-active:      #FFE8D6;
  --bg-btn-ghost-disabled:    #F5F5F5;

  /* ── Buttons · danger ── */
  --bg-btn-danger:            #EC221F;
  --bg-btn-danger-hover:      #C00F0C;
  --bg-btn-danger-active:     #9A0A08;
  --bg-btn-danger-disabled:   #F5A4A3;

  /* ── Inputs ── */
  --bg-input:                 #FFFFFF;
  --bg-input-hover:           #F8F8FC;
  --bg-input-focus:           #FFFFFF; /* + orange ring */
  --bg-input-error:           #FFF5F5;
  --bg-input-success:         #F5FFF8;
  --bg-input-disabled:        #F5F5F5;

  /* ── Checkbox ── */
  --bg-checkbox:              #FFFFFF;
  --bg-checkbox-hover:        #FFF5EE;
  --bg-checkbox-checked:      #EF8430;
  --bg-checkbox-indeterminate:#EF8430;
  --bg-checkbox-focus:        #FFFFFF; /* + ring */
  --bg-checkbox-disabled:     #F5F5F5;

  /* ── Radio ── */
  --bg-radio:                 #FFFFFF;
  --bg-radio-hover:           #FFF5EE;
  --bg-radio-selected:        #FFFFFF; /* + #EF8430 inner dot */
  --bg-radio-focus:           #FFFFFF; /* + ring */
  --bg-radio-disabled:        #F5F5F5;

  /* ── Toggle ── */
  --bg-toggle-off:            #E3E3E3;
  --bg-toggle-on:             #EF8430;
  --bg-toggle-hover:          #FFF5EE;
  --bg-toggle-focus:          #EF8430; /* + ring */
  --bg-toggle-disabled-off:   #F0F0F0;
  --bg-toggle-disabled-on:    #F5C89A;
  --bg-toggle-thumb:          #FFFFFF;

  /* ── Select / dropdown ── */
  --bg-select:                #FFFFFF;
  --bg-select-hover:          #F8F8FC;
  --bg-select-focus:          #FFFFFF; /* + orange ring */
  --bg-dropdown-menu:         #FFFFFF;
  --bg-dropdown-item-hover:   #FFF5EE;
  --bg-dropdown-item-selected:#FFF0E6;
  --bg-select-disabled:       #F5F5F5;

  /* ── Alerts ── */
  --bg-alert-info:            #EFF6FF;
  --bg-alert-info-hover:      #DBEAFE;
  --bg-alert-info-filled:     #1D4ED8;
  --bg-alert-success:         #F0FFF5;
  --bg-alert-success-hover:   #DCFCE7;
  --bg-alert-success-filled:  #14AE5C;
  --bg-alert-warning:         #FFFBEB;
  --bg-alert-warning-hover:   #FEF3C7;
  --bg-alert-warning-filled:  #E8B931;
  --bg-alert-error:           #FFF5F5;
  --bg-alert-error-hover:     #FEE2E2;
  --bg-alert-error-filled:    #EC221F;

  /* ── Skill tags / badges ── */
  --bg-tag-teal:              #E0F7F5; /* text #0E7E78 */
  --bg-tag-rose:              #FFE4EA; /* text #C0234A */
  --color-orange-50:            #FFF0E6; /* text #B85E00 */
  --bg-tag-purple:            #E8E6F9; /* text #5A3FCC */
  --bg-tag-blue:              #E8F5FF; /* text #1358B5 */
  --bg-tag-amber:             #FFFBEB; /* text #B45309 */

  /* ── Shadows ── */
  --shadow-sm:                0 1px 4px rgba(18,20,46,.06);
  --shadow:                   0 2px 12px rgba(18,20,46,.09);
  --shadow-md:                0 4px 24px rgba(18,20,46,.12);
  --shadow-lg:                0 8px 40px rgba(18,20,46,.16);
  --shadow-card-hover:        0 12px 40px rgba(239,132,48,.18), 0 2px 12px rgba(18,20,46,.10);

  /* ── Radius ── */
  --radius:                   12px;
  --radius-sm:                8px;
  --radius-xs:                6px;
  --radius-pill:              100px;

  /* ── Typography ── */
  --font-display:             'Syne', sans-serif;
  --font-body:                'Inter', sans-serif;

  /* ── Spacing ── */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px; --space-12: 48px;

  /* ── Motion ── */
  --transition:               cubic-bezier(0.32, 0.72, 0, 1);
  --spring:                    cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* ── Off-canvas ── */
  --canvas-w:                 360px;
}
```

### Blob presets (runtime-swappable)

| Preset | Primary | Secondary | | Preset | Primary | Secondary |
|---|---|---|---|---|---|---|
| Lavender* | `#E8E6F9` | `#D0CCF8` | | Rose | `#FFD6D6` | `#FFA4A4` |
| Peach | `#FFE8D6` | `#FFCBA4` | | Amber | `#FFF3D6` | `#FFE0A4` |
| Mint | `#D6F5E8` | `#A4EDD0` | | Teal | `#D6FFF5` | `#A4FFE6` |
| Sky | `#D6E8FF` | `#A4C8FF` | | Purple | `#EDD6FF` | `#D4A4FF` |

```js
function applyBlobPreset(primary, secondary) {
  document.documentElement.style.setProperty('--bg-blob-primary', primary);
  document.documentElement.style.setProperty('--bg-blob-secondary', secondary);
}
```

### Type scale

| Level | Size | Weight | Line height |
|---|---|---|---|
| Display | 30–34px | 800 | 1.1 |
| Heading 1 | 22px | 800 | 1.2 |
| Heading 2 | 18px | 700 | 1.3 |
| Heading 3 | 15–16px | 700 | 1.3 |
| Body large | 14px | 400–500 | 1.6 |
| Body | 13px | 400–500 | 1.5 |
| Caption | 11–12px | 500–600 | 1.4 |
| Micro | 10px | 700 | 1.3 |

### Elevation (z-index)

```
0   page content      90  sticky filter/header     300 off-canvas backdrop
10  sticky bars       100 navbar                   301 off-canvas panel
                      200 dropdowns/popovers        999 toasts
```

---

## Layer B — event.css / create-forms tokens (light / dark)

Used by task-manager + event listing create pages. These names override Layer A in those projects;
the **rule is unchanged: use the variable, not the value.**

| Token | Light | Dark |
|---|---|---|
| `--color-primary` | `#f97316` | `#f97316` |
| `--color-primary-dark` | `#ea6c0a` | `#ea6c0a` |
| `--color-primary-hover` | `#f68b2d` | `#f68b2d` |
| `--color-primary-alt` | `#ef8430` | `#ef8430` |
| `--color-primary-light` | `#fff0e6` | `rgba(249,115,22,0.08)` |
| `--text-primary` | `#0f172a` | `#ffffff` |
| `--text-secondary` | `#64748b` | `#94a3b8` |
| `--text-muted` | `#94a3b8` | `#64748b` |
| `--text-heading` | `#12142e` | `#ffffff` |
| `--text-label` | `#8b91a5` | `#64748b` |
| `--border-color` | `#e2e8f0` | `#182C44` |
| `--border-medium` | `#d9deea` | `#182C44` |
| `--bg-page` | `#f4f6fa` | `#07101E` |
| `--bg-surface` | `#ffffff` | `#0E1A2D` |
| `--bg-surface-2` | `#f8faff` | `#132036` |
| `--bg-input` | `#f8f9fc` | `#132036` |
| `--bg-hover` | `#f4f5fb` | `#132036` |
| `--bg-card` | `#F5F5FA` | `#0E1A2D` |
| `--color-success` | `#16a34a` | `#4ade80` |
| `--color-danger` | `#ef4444` | `#ef4444` |
| `--color-warning` | `#f5b301` | `#f5b301` |
| `--color-info` | `#3949ab` | `#6366f1` |
| `--color-danger-bg` | `#fde8e8` | `rgba(239,68,68,0.10)` |
| `--color-success-bg` | `#dcfce7` | `rgba(74,222,128,0.10)` |
| `--color-warning-bg` | `#fffbeb` | `rgba(245,179,1,0.10)` |

> **Note for agents:** `--color-primary` differs between layers (`#EF8430` vs `#f97316`). This is
> exactly why you must **never hardcode the hex** — bind to the variable so each product resolves
> its own brand value.
