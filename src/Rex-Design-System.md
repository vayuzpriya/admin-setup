# VAYUZ Design System — Background Tokens v2

> **Product:** VAYUZ Social · **Phase:** 2 Build · **Tokens:** 58 · **Theme:** Light (Dark planned)  
> **Last updated:** May 2026 · **Source:** Social Profile UI

---

## Table of Contents

1. [Overview](#1-overview)
2. [Brand Primitives](#2-brand-primitives)
3. [Surface Backgrounds](#3-surface-backgrounds)
4. [Surface Interaction States](#4-surface-interaction-states)
5. [Blob / Profile Background](#5-blob--profile-background)
6. [Navigation States](#6-navigation-states)
7. [Button Backgrounds](#7-button-backgrounds)
8. [Input Field Backgrounds](#8-input-field-backgrounds)
9. [Checkbox Backgrounds](#9-checkbox-backgrounds)
10. [Radio Button Backgrounds](#10-radio-button-backgrounds)
11. [Toggle / Switch Backgrounds](#11-toggle--switch-backgrounds)
12. [Select / Dropdown Backgrounds](#12-select--dropdown-backgrounds)
13. [Alert Backgrounds](#13-alert-backgrounds)
14. [Skill Tag & Badge Backgrounds](#14-skill-tag--badge-backgrounds)
15. [Typography & Spacing](#15-typography--spacing)
16. [Shadows & Elevation](#16-shadows--elevation)
17. [Border Radius](#17-border-radius)
18. [Complete CSS Token Reference](#18-complete-css-token-reference)
19. [Usage in the Events Page](#19-usage-in-the-events-page)
20. [Token Naming Convention](#20-token-naming-convention)

---

## 1. Overview

The VAYUZ Background Design System defines every background color token used across the VAYUZ Social product. All tokens follow the `--bg-*` naming convention and are declared as CSS custom properties on `:root`. They cover every surface, every component, and every interaction state.

### Scope

| Category | Tokens | Components |
|---|---|---|
| Surfaces | 8 | Page, Card, Header, Sidebar, Section, Subtle, Inverse, Skeleton |
| Surface States | 5 | Default, Hover, Active, Focus, Disabled |
| Blob | 3 | Primary, Secondary, Opacity (user-customisable) |
| Navigation | 5 | Default, Hover, Active, Selected, Focus |
| Buttons | 20 | Primary × 5, Secondary × 4, Ghost × 4, Danger × 4, Link |
| Inputs | 6 | Default, Hover, Focus, Error, Success, Disabled |
| Checkbox | 6 | Default, Hover, Checked, Indeterminate, Focus, Disabled |
| Radio | 5 | Default, Hover, Selected, Focus, Disabled |
| Toggle | 7 | Off, On, Hover, Focus, Disabled-Off, Disabled-On, Thumb |
| Select | 7 | Default, Hover, Focus, Menu, Item Hover, Item Selected, Disabled |
| Alerts | 12 | Info × 3, Success × 3, Warning × 3, Error × 3 |
| Skill Tags | 6 | Teal, Rose, Orange, Purple, Blue, Amber |

---

## 2. Brand Primitives

These are the root brand values. All component tokens reference these primitives.

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#EF8430` | Primary brand orange — CTAs, active states, highlights |
| `--color-primary-hover` | `#DD6A0F` | Hover state for brand orange |
| `--color-primary-dark` | `#C55A00` | Press / active state for brand orange |
| `--color-primary-alt` | `#FF6B00` | Lighter orange for accents |
| `--color-orange-shadow` | `rgba(239,132,48,0.18)` | Subtle focus ring / shadow |
| `--color-orange-shadow-lg` | `rgba(239,132,48,0.28)` | Stronger glow for elevated elements |
| `--text-heading` | `#12142E` | Primary dark — text, nav base |
| `--bg-page` | `#F0F2F9` | App canvas background |
| `--white` | `#FFFFFF` | Cards, surfaces |
| `--border-color` | `#E3E3E3` | Default border on all components |
| `--border-medium` | `#C0C0C0` | Stronger border on hover |
| `--color-primary` | `#EF8430` | Active / focused border |
| `--text-primary` | `#12142E` | Primary body text |
| `--text-body` | `#5A5A5A` | Secondary / muted text |
| `--text-caption` | `#A9A9A9` | Placeholder / label text |

### CSS Declaration

```css
:root {
  --color-primary:          #EF8430;
  --color-primary-hover:     #DD6A0F;
  --color-primary-dark:   #C55A00;
  --color-primary-alt:    #FF6B00;
  --color-orange-shadow:     rgba(239,132,48,0.18);
  --color-orange-shadow-lg:  rgba(239,132,48,0.28);
  --text-heading:           #12142E;
  --bg-page:           #F0F2F9;
  --white:          #FFFFFF;
  --border-color:   #E3E3E3;
  --border-medium:      #C0C0C0;
  --color-primary:   #EF8430;
  --text-primary:         #12142E;
  --text-body:         #5A5A5A;
  --text-caption:         #A9A9A9;
}
```

---

## 3. Surface Backgrounds

Foundation surface colors extracted from the Social Profile UI. These define the layered elevation system — from the root page background through to elevated cards and navigation.

| Token | Value | Name | Usage |
|---|---|---|---|
| `--bg-page` | `#F0F2F9` | Page / App Background | Root background of the entire application. The light lavender-gray canvas behind all content. |
| `--bg-card` | `#FFFFFF` | Card / Panel Surface | Profile card, content panels, section containers, all elevated surfaces. |
| `--bg-surface` | `#FFFFFF` | Navigation Bar | Top navigation bar with VAYUZ logo, nav items, search. |
| `--bg-column` | `#F8F8FC` | Sidebar / Profile Column | Left profile column — slightly elevated from the body. |
| `--bg-section` | `#E8E6F9` | Section Highlight | Connection topology card, tinted section backgrounds — lavender highlight. |
| `--bg-subtle` | `#F5F5FA` | Subtle Fill | Very light fill for nested containers, stat cells, secondary info areas. |
| `--bg-inverse` | `#12141F` | Inverse / Dark Surface | Dark tooltips, bottom sheets, contextual menus on the light theme. |
| `--bg-skeleton` | `#EAEAEA` | Skeleton / Loading | Placeholder shimmer background for loading states. |

### Visual Hierarchy

```
┌─────────────────────────────────────────┐
│  --bg-page  #F0F2F9  (App canvas)       │
│  ┌───────────────────────────────────┐  │
│  │  --bg-card  #FFFFFF  (Card)       │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  --bg-subtle  #F5F5FA       │  │  │
│  │  │  (Nested / stat cells)      │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│  --bg-column  #F8F8FC  (Column bg)     │
│  --bg-section  #E8E6F9  (Tinted block)  │
└─────────────────────────────────────────┘
```

### CSS Declaration

```css
:root {
  --bg-page:      #F0F2F9;
  --bg-card:      #FFFFFF;
  --bg-surface:    #FFFFFF;
  --bg-column:   #F8F8FC;
  --bg-section:   #E8E6F9;
  --bg-subtle:    #F5F5FA;
  --bg-inverse:   #12141F;
  --bg-skeleton:  #EAEAEA;
}
```

---

## 4. Surface Interaction States

Background colors for any interactive surface (card, panel) across all interaction states.

| Token | Value | State | Description |
|---|---|---|---|
| `--bg-surface-default` | `#FFFFFF` | Default | Resting surface — card, panel at rest |
| `--bg-surface-hover` | `#F8F8FC` | Hover | Surface on mouse hover — subtle lift |
| `--bg-surface-active` | `#F0F0F8` | Active | Surface pressed / actively clicked |
| `--bg-surface-focus` | `#FFFFFF` + ring | Focus | Keyboard-focused surface with orange ring `rgba(239,132,48,.20)` |
| `--bg-surface-disabled` | `#F5F5F5` | Disabled | Non-interactive disabled surface |

### Usage Example

```css
.card {
  background: var(--bg-surface-default);
  transition: background 0.15s ease, box-shadow 0.15s ease;
}
.card:hover  { background: var(--bg-surface-hover); }
.card:active { background: var(--bg-surface-active); }
.card:focus  {
  background: var(--bg-surface-focus);
  box-shadow: 0 0 0 3px rgba(239,132,48,.20);
}
.card[disabled] { background: var(--bg-surface-disabled); }
```

---

## 5. Blob / Profile Background

User-customisable background blobs for the profile card. Three tokens expose the colors and opacity — all can be overridden at runtime via JavaScript when the user picks a color.

| Token | Default Value | Description |
|---|---|---|
| `--bg-blob-primary` | `#E8E6F9` | Main background shape behind the profile avatar |
| `--bg-blob-secondary` | `#D0CCF8` | Accent shape — blends with the primary |
| `--bg-blob-opacity` | `0.35` | Controls how prominent the blob appears (0.10 – 0.60) |

### Available Presets

| Name | Primary | Secondary |
|---|---|---|
| Lavender *(default)* | `#E8E6F9` | `#D0CCF8` |
| Peach | `#FFE8D6` | `#FFCBA4` |
| Mint | `#D6F5E8` | `#A4EDD0` |
| Sky Blue | `#D6E8FF` | `#A4C8FF` |
| Rose | `#FFD6D6` | `#FFA4A4` |
| Amber | `#FFF3D6` | `#FFE0A4` |
| Teal | `#D6FFF5` | `#A4FFE6` |
| Purple | `#EDD6FF` | `#D4A4FF` |
| Neutral Gray | `#F0F0F0` | `#E0E0E0` |
| Pink Gradient | `#FF6B9D` | `#C44DEE` |
| Ocean | `#4ECDC4` | `#44A8FF` |
| Gold | `#FFD700` | `#FF8C00` |

### Usage Example

```css
:root {
  --bg-blob-primary:   #E8E6F9;
  --bg-blob-secondary: #D0CCF8;
  --bg-blob-opacity:   0.35;
}

.blob-shape-1 {
  background: var(--bg-blob-primary);
  opacity: var(--bg-blob-opacity);
  border-radius: 50%;
  position: absolute;
}
.blob-shape-2 {
  background: var(--bg-blob-secondary);
  opacity: var(--bg-blob-opacity);
  border-radius: 50%;
  position: absolute;
}
```

```js
// Runtime color picker update
function applyBlobPreset(primary, secondary) {
  document.documentElement.style.setProperty('--bg-blob-primary', primary);
  document.documentElement.style.setProperty('--bg-blob-secondary', secondary);
}
```

---

## 6. Navigation States

Background colors for navigation bar items — Byte, Insight, Groups, Events, Connection, Notifications, Search.

| Token | Value | State | Description |
|---|---|---|---|
| `--bg-nav-default` | `#FFFFFF` | Default | Nav bar base — resting state |
| `--bg-nav-hover` | `#FFF5EE` | Hover | Nav item on hover — warm orange tint |
| `--bg-nav-active` | `#EF8430` | Active | Active nav tab — filled orange indicator |
| `--bg-nav-selected` | `#FFF0E6` | Selected | Selected tab background with orange underline |
| `--bg-nav-focus` | `#F0F0F8` | Focus | Keyboard-focused nav item |

### Usage Example

```css
.nav-item {
  background: var(--bg-nav-default);
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.18s ease;
}
.nav-item:hover    { background: var(--bg-nav-hover); color: var(--color-primary); }
.nav-item.active   { background: var(--bg-nav-active); color: #fff; }
.nav-item.selected {
  background: var(--bg-nav-selected);
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
.nav-item:focus    { background: var(--bg-nav-focus); }
```

---

## 7. Button Backgrounds

Five button variants across five interaction states each (25 tokens total).

### Primary Button — Brand Orange CTA

| Token | Value | State |
|---|---|---|
| `--bg-btn-primary` | `#EF8430` | Default |
| `--bg-btn-primary-hover` | `#DD6A0F` | Hover |
| `--bg-btn-primary-active` | `#C55A00` | Active / Press |
| `--bg-btn-primary-focus` | `#EF8430` + orange ring | Focus |
| `--bg-btn-primary-disabled` | `#F5C89A` | Disabled |

### Secondary Button — White + Border

| Token | Value | State |
|---|---|---|
| `--bg-btn-secondary` | `#FFFFFF` | Default |
| `--bg-btn-secondary-hover` | `#F8F8FC` | Hover |
| `--bg-btn-secondary-active` | `#F0F0F8` | Active / Press |
| `--bg-btn-secondary-disabled` | `#F5F5F5` | Disabled |

### Ghost Button — Transparent + Brand Border

| Token | Value | State |
|---|---|---|
| `--bg-btn-ghost` | `transparent` | Default |
| `--bg-btn-ghost-hover` | `#FFF5EE` | Hover |
| `--bg-btn-ghost-active` | `#FFE8D6` | Active / Press |
| `--bg-btn-ghost-disabled` | `#F5F5F5` | Disabled |

### Danger Button — Destructive Actions

| Token | Value | State |
|---|---|---|
| `--bg-btn-danger` | `#EC221F` | Default |
| `--bg-btn-danger-hover` | `#C00F0C` | Hover |
| `--bg-btn-danger-active` | `#9A0A08` | Active / Press |
| `--bg-btn-danger-disabled` | `#F5A4A3` | Disabled |

### Usage Example

```css
/* Primary */
.btn-primary {
  background: var(--bg-btn-primary);
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 100px;
  font-weight: 600;
  transition: background 0.18s ease, transform 0.18s ease;
}
.btn-primary:hover    { background: var(--bg-btn-primary-hover); transform: translateY(-1px); }
.btn-primary:active   { background: var(--bg-btn-primary-active); transform: translateY(0); }
.btn-primary:focus    { background: var(--bg-btn-primary-focus); box-shadow: 0 0 0 3px rgba(239,132,48,.28); }
.btn-primary:disabled { background: var(--bg-btn-primary-disabled); cursor: not-allowed; }

/* Ghost */
.btn-ghost {
  background: var(--bg-btn-ghost);
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  padding: 10px 22px;
  border-radius: 100px;
  font-weight: 600;
  transition: background 0.18s ease;
}
.btn-ghost:hover  { background: var(--bg-btn-ghost-hover); }
.btn-ghost:active { background: var(--bg-btn-ghost-active); }
```

---

## 8. Input Field Backgrounds

Background tokens for text inputs, textareas, and all their validation states.

| Token | Value | State | Description |
|---|---|---|---|
| `--bg-input` | `#FFFFFF` | Default | Text input at rest |
| `--bg-input-hover` | `#F8F8FC` | Hover | Cursor hovers — slight fill |
| `--bg-input-focus` | `#FFFFFF` + orange ring | Focus | Active typing — orange focus ring |
| `--bg-input-error` | `#FFF5F5` | Error | Validation error — red tint |
| `--bg-input-success` | `#F5FFF8` | Success | Validated success — green tint |
| `--bg-input-disabled` | `#F5F5F5` | Disabled | Read-only / disabled field |

### Usage Example

```css
.input {
  background: var(--bg-input);
  border: 1.5px solid var(--border-color);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.18s ease;
  outline: none;
}
.input:hover   { background: var(--bg-input-hover); border-color: var(--border-medium); }
.input:focus   {
  background: var(--bg-input-focus);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(239,132,48,.18);
}
.input.error   { background: var(--bg-input-error);   border-color: #EC221F; }
.input.success { background: var(--bg-input-success); border-color: #14AE5C; }
.input:disabled { background: var(--bg-input-disabled); cursor: not-allowed; }
```

---

## 9. Checkbox Backgrounds

Background tokens for checkboxes across all interaction states.

| Token | Value | State | Description |
|---|---|---|---|
| `--bg-checkbox` | `#FFFFFF` | Default | Unchecked resting |
| `--bg-checkbox-hover` | `#FFF5EE` | Hover | Warm tint |
| `--bg-checkbox-checked` | `#EF8430` | Checked | Filled orange |
| `--bg-checkbox-indeterminate` | `#EF8430` | Indeterminate | Partial selection |
| `--bg-checkbox-focus` | `#FFFFFF` + ring | Focus | Keyboard focus |
| `--bg-checkbox-disabled` | `#F5F5F5` | Disabled | Non-interactive |

### Usage Example

```css
.checkbox-box {
  width: 18px; height: 18px;
  border-radius: 4px;
  border: 2px solid var(--border-color);
  background: var(--bg-checkbox);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
  cursor: pointer;
}
.checkbox-box:hover               { background: var(--bg-checkbox-hover); border-color: var(--color-primary); }
.checkbox-box.checked             { background: var(--bg-checkbox-checked); border-color: var(--color-primary); }
.checkbox-box.indeterminate       { background: var(--bg-checkbox-indeterminate); border-color: var(--color-primary); }
.checkbox-box:focus               { background: var(--bg-checkbox-focus); box-shadow: 0 0 0 3px rgba(239,132,48,.25); }
.checkbox-box.disabled            { background: var(--bg-checkbox-disabled); border-color: #E0E0E0; cursor: not-allowed; }
```

---

## 10. Radio Button Backgrounds

| Token | Value | State | Description |
|---|---|---|---|
| `--bg-radio` | `#FFFFFF` | Default | Unselected resting |
| `--bg-radio-hover` | `#FFF5EE` | Hover | Orange border + warm tint |
| `--bg-radio-selected` | `#FFFFFF` + orange dot | Selected | White bg, `#EF8430` inner dot |
| `--bg-radio-focus` | `#FFFFFF` + ring | Focus | Keyboard focus |
| `--bg-radio-disabled` | `#F5F5F5` | Disabled | Non-interactive |

### Usage Example

```css
.radio-dot {
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--bg-radio);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
  cursor: pointer;
}
.radio-dot:hover    { background: var(--bg-radio-hover); border-color: var(--color-primary); }
.radio-dot.selected {
  background: var(--bg-radio-selected);
  border-color: var(--color-primary);
}
.radio-dot.selected::after {
  content: '';
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  display: block;
}
.radio-dot:focus    { box-shadow: 0 0 0 3px rgba(239,132,48,.25); }
.radio-dot.disabled { background: var(--bg-radio-disabled); border-color: #E0E0E0; cursor: not-allowed; }
```

---

## 11. Toggle / Switch Backgrounds

| Token | Value | State | Description |
|---|---|---|---|
| `--bg-toggle-off` | `#E3E3E3` | Off | Toggle track — off state |
| `--bg-toggle-on` | `#EF8430` | On | Toggle track — on/active state |
| `--bg-toggle-hover` | `#FFF5EE` | Hover | Track hover (off state) |
| `--bg-toggle-focus` | `#EF8430` + ring | Focus | Keyboard focus on on-state |
| `--bg-toggle-disabled-off` | `#F0F0F0` | Disabled Off | Non-interactive off |
| `--bg-toggle-disabled-on` | `#F5C89A` | Disabled On | Washed-out orange |
| `--bg-toggle-thumb` | `#FFFFFF` | Thumb | Always white, all states |

### Usage Example

```css
.toggle-track {
  width: 42px; height: 24px;
  border-radius: 24px;
  background: var(--bg-toggle-off);
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
}
.toggle-track.on { background: var(--bg-toggle-on); }
.toggle-track.disabled-off { background: var(--bg-toggle-disabled-off); cursor: not-allowed; }
.toggle-track.disabled-on  { background: var(--bg-toggle-disabled-on); cursor: not-allowed; }

.toggle-thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--bg-toggle-thumb);
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toggle-track.on .toggle-thumb { transform: translateX(18px); }
```

---

## 12. Select / Dropdown Backgrounds

| Token | Value | State | Description |
|---|---|---|---|
| `--bg-select` | `#FFFFFF` | Default | Select trigger at rest |
| `--bg-select-hover` | `#F8F8FC` | Hover | Hover on select trigger |
| `--bg-select-focus` | `#FFFFFF` + orange ring | Focus / Open | Dropdown open / focused |
| `--bg-dropdown-menu` | `#FFFFFF` | Menu | Dropdown panel background |
| `--bg-dropdown-item-hover` | `#FFF5EE` | Item Hover | Menu item on hover |
| `--bg-dropdown-item-selected` | `#FFF0E6` | Item Selected | Currently selected option |
| `--bg-select-disabled` | `#F5F5F5` | Disabled | Disabled select |

### Usage Example

```css
.select {
  background: var(--bg-select);
  border: 1.5px solid var(--border-color);
  padding: 10px 32px 10px 14px;
  border-radius: 8px;
  appearance: none;
  transition: all 0.18s ease;
  outline: none;
}
.select:hover { background: var(--bg-select-hover); border-color: var(--border-medium); }
.select:focus { background: var(--bg-select-focus); border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(239,132,48,.18); }
.select:disabled { background: var(--bg-select-disabled); cursor: not-allowed; }

.dropdown-menu  { background: var(--bg-dropdown-menu); border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
.dropdown-item:hover    { background: var(--bg-dropdown-item-hover); }
.dropdown-item.selected { background: var(--bg-dropdown-item-selected); }
```

---

## 13. Alert Backgrounds

Background tokens for inline alerts, toast notifications, and banners across all 4 semantic types × 3 visual weights.

### Info Alert

| Token | Value | State |
|---|---|---|
| `--bg-alert-info` | `#EFF6FF` | Default (light blue) |
| `--bg-alert-info-hover` | `#DBEAFE` | Hover |
| `--bg-alert-info-filled` | `#1D4ED8` | Filled toast variant |

### Success Alert

| Token | Value | State |
|---|---|---|
| `--bg-alert-success` | `#F0FFF5` | Default (light green) |
| `--bg-alert-success-hover` | `#DCFCE7` | Hover |
| `--bg-alert-success-filled` | `#14AE5C` | Filled toast variant |

### Warning Alert

| Token | Value | State |
|---|---|---|
| `--bg-alert-warning` | `#FFFBEB` | Default (amber tint) |
| `--bg-alert-warning-hover` | `#FEF3C7` | Hover |
| `--bg-alert-warning-filled` | `#E8B931` | Filled toast variant |

### Error / Danger Alert

| Token | Value | State |
|---|---|---|
| `--bg-alert-error` | `#FFF5F5` | Default (red tint) |
| `--bg-alert-error-hover` | `#FEE2E2` | Hover |
| `--bg-alert-error-filled` | `#EC221F` | Filled toast variant |

### Usage Example

```css
.alert {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 18px;
  border-radius: 10px;
  border-width: 1px; border-style: solid;
}
.alert-info    { background: var(--bg-alert-info);    border-color: #BFDBFE; color: #1E40AF; }
.alert-success { background: var(--bg-alert-success); border-color: #BBF7D0; color: #065F46; }
.alert-warning { background: var(--bg-alert-warning); border-color: #FDE68A; color: #92400E; }
.alert-error   { background: var(--bg-alert-error);   border-color: #FECACA; color: #991B1B; }

/* Filled / Toast variant */
.alert-info.filled    { background: var(--bg-alert-info-filled);    color: #fff; border: none; }
.alert-success.filled { background: var(--bg-alert-success-filled); color: #fff; border: none; }
.alert-warning.filled { background: var(--bg-alert-warning-filled); color: #fff; border: none; }
.alert-error.filled   { background: var(--bg-alert-error-filled);   color: #fff; border: none; }
```

---

## 14. Skill Tag & Badge Backgrounds

Background tokens for skill/hobby tags visible in the profile UI (App Design, Wireframing, Prototyping, User Research, Design Systems, etc).

| Token | Value | Text Color | Use Case |
|---|---|---|---|
| `--bg-tag-teal` | `#E0F7F5` | `#0E7E78` | App Design, User Research |
| `--bg-tag-rose` | `#FFE4EA` | `#C0234A` | Wireframing, Prototyping |
| `--color-orange-50` | `#FFF0E6` | `#B85E00` | Design Systems |
| `--bg-tag-purple` | `#E8E6F9` | `#5A3FCC` | Research, Strategy |
| `--bg-tag-blue` | `#E8F5FF` | `#1358B5` | Development |
| `--bg-tag-amber` | `#FFFBEB` | `#B45309` | Marketing |

### Usage Example

```css
.tag {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.3px;
}
.tag-teal   { background: var(--bg-tag-teal);   color: #0E7E78; }
.tag-rose   { background: var(--bg-tag-rose);   color: #C0234A; }
.tag-orange { background: var(--color-orange-50); color: #B85E00; }
.tag-purple { background: var(--bg-tag-purple); color: #5A3FCC; }
.tag-blue   { background: var(--bg-tag-blue);   color: #1358B5; }
.tag-amber  { background: var(--bg-tag-amber);  color: #B45309; }
```

---

## 15. Typography & Spacing

While the design system focuses on background tokens, these typography and spacing values are used consistently across the VAYUZ Social product.

### Font Stack

| Role | Font | Weights |
|---|---|---|
| Display / Headings | `'Syne', sans-serif` | 500, 600, 700, 800 |
| Body / UI | `'Inter', sans-serif` | 300, 400, 500, 600, 700 |
| Fallback | `system-ui, -apple-system, sans-serif` | — |

```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| Display | `30–34px` | 800 | 1.1 | Page titles |
| Heading 1 | `22px` | 800 | 1.2 | Section titles |
| Heading 2 | `18px` | 700 | 1.3 | Card headings |
| Heading 3 | `15–16px` | 700 | 1.3 | Sub-headings |
| Body Large | `14px` | 400–500 | 1.6 | Main body copy |
| Body | `13px` | 400–500 | 1.5 | Secondary copy, labels |
| Caption | `11–12px` | 500–600 | 1.4 | Meta, timestamps |
| Micro | `10px` | 700 | 1.3 | Tags, badges, chips |

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Tight gap (icon + label) |
| `--space-2` | `8px` | Small internal padding |
| `--space-3` | `12px` | Component internal padding |
| `--space-4` | `16px` | Card padding, row gap |
| `--space-5` | `20px` | Section gap |
| `--space-6` | `24px` | Panel padding |
| `--space-8` | `32px` | Section spacing |
| `--space-10` | `40px` | Page section gap |
| `--space-12` | `48px` | Page-level padding |

---

## 16. Shadows & Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 4px rgba(18,20,46,.06)` | Navbar, subtle elevation |
| `--shadow` | `0 2px 12px rgba(18,20,46,.09)` | Cards, panels at rest |
| `--shadow-md` | `0 4px 24px rgba(18,20,46,.12)` | Modals, dropdowns, off-canvas |
| `--shadow-lg` | `0 8px 40px rgba(18,20,46,.16)` | Modals, full-screen overlays |
| `--shadow-card-hover` | `0 12px 40px rgba(239,132,48,.18), 0 2px 12px rgba(18,20,46,.10)` | Card hover — brand tinted |

### Elevation Layers

```
z-index: 0    → Page content
z-index: 10   → Sticky control bars
z-index: 90   → Sticky filter / header bars
z-index: 100  → Navbar
z-index: 200  → Dropdowns / popovers
z-index: 300  → Off-canvas backdrop
z-index: 301  → Off-canvas panel
z-index: 999  → Toast notifications
```

---

## 17. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `12px` | Cards, panels, modals |
| `--radius-sm` | `8px` | Buttons, inputs, tags, nav items |
| `--radius-xs` | `6px` | Small chips, thumbnails |
| `--radius-pill` | `100px` | Pills, tabs, CTAs, filter chips |

```css
:root {
  --radius:     12px;
  --radius-sm:  8px;
  --radius-xs:  6px;
  --radius-pill: 100px;
}
```

---

## 18. Complete CSS Token Reference

Copy-paste ready `:root` block with all 58 background tokens + brand primitives.

```css
/* ═══════════════════════════════════════════════════
   VAYUZ Design System — Background Tokens v2
   Source: Social Profile UI · Phase 2 Build · May 2026
   58 Background Tokens
═══════════════════════════════════════════════════ */

:root {

  /* ── Brand Primitives ─────────────────────────── */
  --color-primary:                     #EF8430;
  --color-primary-hover:                #DD6A0F;
  --color-primary-dark:              #C55A00;
  --color-primary-alt:               #FF6B00;
  --color-orange-shadow:                rgba(239,132,48,0.18);
  --color-orange-shadow-lg:             rgba(239,132,48,0.28);

  /* ── Text ─────────────────────────────────────── */
  --text-primary:                    #12142E;
  --text-body:                    #5A5A5A;
  --text-caption:                    #A9A9A9;

  /* ── Borders ──────────────────────────────────── */
  --border-color:              #E3E3E3;
  --border-medium:                 #C0C0C0;
  --color-primary:              #EF8430;

  /* ── Surfaces ─────────────────────────────────── */
  --bg-page:                   #F0F2F9;
  --bg-card:                   #FFFFFF;
  --bg-surface:                 #FFFFFF;
  --bg-column:                #F8F8FC;
  --bg-section:                #E8E6F9;
  --bg-subtle:                 #F5F5FA;
  --bg-inverse:                #12141F;
  --bg-skeleton:               #EAEAEA;

  /* ── Surface States ───────────────────────────── */
  --bg-surface-default:        #FFFFFF;
  --bg-surface-hover:          #F8F8FC;
  --bg-surface-active:         #F0F0F8;
  --bg-surface-focus:          #FFFFFF; /* + ring rgba(239,132,48,.20) */
  --bg-surface-disabled:       #F5F5F5;

  /* ── Blob ─────────────────────────────────────── */
  --bg-blob-primary:           #E8E6F9; /* user-customisable */
  --bg-blob-secondary:         #D0CCF8; /* user-customisable */
  --bg-blob-opacity:           0.35;    /* user-customisable */

  /* ── Navigation ───────────────────────────────── */
  --bg-nav-default:            #FFFFFF;
  --bg-nav-hover:              #FFF5EE;
  --bg-nav-active:             #EF8430;
  --bg-nav-selected:           #FFF0E6;
  --bg-nav-focus:              #F0F0F8;

  /* ── Buttons — Primary ────────────────────────── */
  --bg-btn-primary:            #EF8430;
  --bg-btn-primary-hover:      #DD6A0F;
  --bg-btn-primary-active:     #C55A00;
  --bg-btn-primary-focus:      #EF8430; /* + orange ring */
  --bg-btn-primary-disabled:   #F5C89A;

  /* ── Buttons — Secondary ──────────────────────── */
  --bg-btn-secondary:          #FFFFFF;
  --bg-btn-secondary-hover:    #F8F8FC;
  --bg-btn-secondary-active:   #F0F0F8;
  --bg-btn-secondary-disabled: #F5F5F5;

  /* ── Buttons — Ghost ──────────────────────────── */
  --bg-btn-ghost:              transparent;
  --bg-btn-ghost-hover:        #FFF5EE;
  --bg-btn-ghost-active:       #FFE8D6;
  --bg-btn-ghost-disabled:     #F5F5F5;

  /* ── Buttons — Danger ─────────────────────────── */
  --bg-btn-danger:             #EC221F;
  --bg-btn-danger-hover:       #C00F0C;
  --bg-btn-danger-active:      #9A0A08;
  --bg-btn-danger-disabled:    #F5A4A3;

  /* ── Input Fields ─────────────────────────────── */
  --bg-input:                  #FFFFFF;
  --bg-input-hover:            #F8F8FC;
  --bg-input-focus:            #FFFFFF; /* + orange ring */
  --bg-input-error:            #FFF5F5;
  --bg-input-success:          #F5FFF8;
  --bg-input-disabled:         #F5F5F5;

  /* ── Checkbox ─────────────────────────────────── */
  --bg-checkbox:               #FFFFFF;
  --bg-checkbox-hover:         #FFF5EE;
  --bg-checkbox-checked:       #EF8430;
  --bg-checkbox-indeterminate: #EF8430;
  --bg-checkbox-focus:         #FFFFFF; /* + ring */
  --bg-checkbox-disabled:      #F5F5F5;

  /* ── Radio ────────────────────────────────────── */
  --bg-radio:                  #FFFFFF;
  --bg-radio-hover:            #FFF5EE;
  --bg-radio-selected:         #FFFFFF; /* + #EF8430 inner dot */
  --bg-radio-focus:            #FFFFFF; /* + ring */
  --bg-radio-disabled:         #F5F5F5;

  /* ── Toggle ───────────────────────────────────── */
  --bg-toggle-off:             #E3E3E3;
  --bg-toggle-on:              #EF8430;
  --bg-toggle-hover:           #FFF5EE;
  --bg-toggle-focus:           #EF8430; /* + ring */
  --bg-toggle-disabled-off:    #F0F0F0;
  --bg-toggle-disabled-on:     #F5C89A;
  --bg-toggle-thumb:           #FFFFFF;

  /* ── Select / Dropdown ────────────────────────── */
  --bg-select:                 #FFFFFF;
  --bg-select-hover:           #F8F8FC;
  --bg-select-focus:           #FFFFFF; /* + orange ring */
  --bg-dropdown-menu:          #FFFFFF;
  --bg-dropdown-item-hover:    #FFF5EE;
  --bg-dropdown-item-selected: #FFF0E6;
  --bg-select-disabled:        #F5F5F5;

  /* ── Alerts ───────────────────────────────────── */
  --bg-alert-info:             #EFF6FF;
  --bg-alert-info-hover:       #DBEAFE;
  --bg-alert-info-filled:      #1D4ED8;
  --bg-alert-success:          #F0FFF5;
  --bg-alert-success-hover:    #DCFCE7;
  --bg-alert-success-filled:   #14AE5C;
  --bg-alert-warning:          #FFFBEB;
  --bg-alert-warning-hover:    #FEF3C7;
  --bg-alert-warning-filled:   #E8B931;
  --bg-alert-error:            #FFF5F5;
  --bg-alert-error-hover:      #FEE2E2;
  --bg-alert-error-filled:     #EC221F;

  /* ── Skill Tags ───────────────────────────────── */
  --bg-tag-teal:               #E0F7F5;
  --bg-tag-rose:               #FFE4EA;
  --color-orange-50:             #FFF0E6;
  --bg-tag-purple:             #E8E6F9;
  --bg-tag-blue:               #E8F5FF;
  --bg-tag-amber:              #FFFBEB;

  /* ── Shadows ──────────────────────────────────── */
  --shadow-sm:                 0 1px 4px rgba(18,20,46,.06);
  --shadow:                    0 2px 12px rgba(18,20,46,.09);
  --shadow-md:                 0 4px 24px rgba(18,20,46,.12);
  --shadow-lg:                 0 8px 40px rgba(18,20,46,.16);
  --shadow-card-hover:         0 12px 40px rgba(239,132,48,.18), 0 2px 12px rgba(18,20,46,.10);

  /* ── Border Radius ────────────────────────────── */
  --radius:                    12px;
  --radius-sm:                 8px;
  --radius-xs:                 6px;
  --radius-pill:               100px;

  /* ── Typography ───────────────────────────────── */
  --font-display:              'Syne', sans-serif;
  --font-body:                 'Inter', sans-serif;

  /* ── Transitions ──────────────────────────────── */
  --transition:                cubic-bezier(0.32, 0.72, 0, 1);
  --spring:                    cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* ── Off-canvas ───────────────────────────────── */
  --canvas-w:                  360px;
}
```

---

## 19. Usage in the Events Page

This section documents how each token category was applied in the **VAYUZ Social Events listing page**.

### Component → Token Mapping

| Component | Token Used | Purpose |
|---|---|---|
| Page background | `--bg-page` `#F0F2F9` | App canvas |
| Navbar | `--bg-surface` + `--shadow-sm` | Sticky top bar |
| Event cards | `--bg-card` + `--shadow` | Card surface at rest |
| Card hover | `--shadow-card-hover` + `--color-primary` | Elevated card state |
| Card image on hover | `opacity: 0.5` | Full image dims to 50% |
| Card overlay on hover | `rgba(255,255,255,0.82)` | Frosted content reveal |
| Tabs (active) | `--bg-btn-primary` | Active segment pill |
| Tabs (hover) | `--bg-nav-hover` | Warm orange tint |
| Create button | `--bg-btn-primary` → `--bg-btn-primary-hover` | CTA |
| Search input | `--bg-input` → `--bg-input-focus` + ring | Search bar |
| Search type pills | `--color-orange-50` (active) | Title / Date / Category |
| Sort dropdown | `--bg-select` → `--bg-select-focus` | Sort select |
| Filter button | `--bg-card` → `--color-orange-50` (active) | Off-canvas trigger |
| Filter badge | `--color-primary` | Count indicator |
| Active filter chips | `--color-orange-50` + `--color-primary` | Applied filter labels |
| Off-canvas backdrop | `rgba(18,20,46,0.45)` + blur | Overlay behind panel |
| Off-canvas panel | `--bg-card` (header/footer) + `--bg-page` (scroll body) | Filter panel |
| Canvas chips (active) | `--color-orange-50` | Selected filter chip |
| Range slider | `--color-primary` fill + `--border-color` track | Attendee range |
| Toggle (on) | `--bg-toggle-on` `#EF8430` | Free events toggle |
| Toggle (off) | `--bg-toggle-off` `#E3E3E3` | Free events toggle |
| Apply button | `--bg-btn-primary` | Apply filters CTA |
| Skeleton loader | `--bg-skeleton` `#EAEAEA` | Loading state |
| Category tags (Tech) | `--bg-tag-purple` | Card hover reveal |
| Category tags (Music) | `--bg-tag-rose` | Card hover reveal |
| Category tags (Social) | `--bg-tag-teal` | Card hover reveal |
| Category tags (Art) | `--bg-tag-amber` | Card hover reveal |
| Category tags (Food) | `--color-orange-50` | Card hover reveal |
| Toast | `--bg-card` + `--shadow-md` | Notification |
| Pagination (active) | `--color-primary` | Current page |
| Pagination (default) | `--bg-card` | Page buttons |

### Event Card — State Behavior

```
Default state:
  bg → --bg-card (#FFFFFF)
  border → --border-color (#E3E3E3)
  shadow → --shadow
  image → opacity: 1 (full)

Hover state:
  transform → translateY(-6px) scale(1.015)
  border → --color-primary (#EF8430)
  shadow → --shadow-card-hover
  image → opacity: 0.5 (dimmed)
  overlay → rgba(255,255,255,0.82) fades in over image
  details panel → visible (category tag, title, meta, CTA)
```

---

## 20. Token Naming Convention

All background tokens follow a strict `--bg-[component]-[variant]-[state]` pattern.

```
--bg-{component}[-{variant}][-{state}]

Examples:
  --bg-page                      ← surface, no variant, no state
  --bg-btn-primary               ← button + primary variant, default state
  --bg-btn-primary-hover         ← button + primary variant, hover state
  --bg-alert-success-filled      ← alert + success variant, filled state
  --bg-dropdown-item-selected    ← dropdown + item sub-component, selected state
  --bg-toggle-disabled-on        ← toggle, disabled state when on
```

### State Suffix Reference

| Suffix | Meaning |
|---|---|
| *(none)* | Default / resting state |
| `-hover` | Mouse cursor over element |
| `-active` | Element being pressed / clicked |
| `-focus` | Keyboard focused element |
| `-disabled` | Non-interactive element |
| `-checked` | Checkbox: checked state |
| `-indeterminate` | Checkbox: partial selection |
| `-selected` | Dropdown / radio: selected item |
| `-filled` | Alert: solid / toast variant |
| `-on` / `-off` | Toggle: on/off track state |
| `-thumb` | Toggle: the sliding thumb |

### Component Prefix Reference

| Prefix | Component |
|---|---|
| `--bg-page` | Page / app canvas |
| `--bg-card` | Card / panel |
| `--bg-surface` | Top navigation bar |
| `--bg-column` | Side column |
| `--bg-section` | Tinted section block |
| `--bg-surface` | Generic interactive surface |
| `--bg-nav` | Nav bar item |
| `--bg-blob` | Profile blob background |
| `--bg-btn` | Button |
| `--bg-input` | Text input / textarea |
| `--bg-checkbox` | Checkbox control |
| `--bg-radio` | Radio button |
| `--bg-toggle` | Toggle / switch |
| `--bg-select` | Select trigger |
| `--bg-dropdown` | Dropdown menu / items |
| `--bg-alert` | Alert / notification banner |
| `--bg-tag` | Skill tag / badge pill |
| `--bg-skeleton` | Loading placeholder |
| `--bg-inverse` | Dark surface |

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| v2.0 | May 2026 | Added blob customizer (3 tokens), select/dropdown (7 tokens), all alert types (12 tokens), skill tags (6 tokens). Total: 58 tokens. |
| v1.0 | — | Initial surfaces, navigation, buttons, inputs, checkbox, radio, toggle. |

---

*VAYUZ Design System · Background Tokens v2 · Social Product · Phase 2 Build*
# Design System Compliance Rules

## Role

You are a Senior Product Designer working within an established Design System.

Your primary objective is to create designs that strictly adhere to existing design tokens, components, patterns, and guidelines.

Consistency and scalability take priority over creativity.

---

# Non-Negotiable Rules

## Colors

- Use ONLY predefined color variables/tokens.
- Never create new colors.
- Never modify existing colors.
- Never use hardcoded HEX values.
- Never use RGB, RGBA, HSL, or custom color values.
- Every color must reference an approved design token.

### Correct
- Color: `Primary/500`
- Color: `Surface/Background`
- Color: `Text/Primary`

### Incorrect
- #4F46E5
- rgb(79,70,229)
- Custom Purple

---

## Typography

- Use ONLY approved typography styles.
- Use ONLY approved font families.
- Use ONLY approved font weights.
- Use ONLY approved font sizes.
- Use ONLY approved line heights.

### Correct
- Heading/Large
- Heading/Medium
- Body/Regular
- Label/Small

### Incorrect
- 17px custom font size
- 27px custom heading
- Custom font family

---

## Spacing

- Use ONLY approved spacing tokens.
- Never use arbitrary spacing values.
- Never create custom margins or padding.

### Correct
- Space/4
- Space/8
- Space/12
- Space/16
- Space/24

### Incorrect
- 13px
- 22px
- 37px

---

## Border Radius

- Use ONLY approved radius tokens.

### Correct
- Radius/Small
- Radius/Medium
- Radius/Large

### Incorrect
- 7px radius
- 15px radius

---

## Shadows & Effects

- Use ONLY predefined elevation and shadow styles.
- Never create custom shadows.
- Never modify opacity values.

### Correct
- Elevation/1
- Elevation/2
- Elevation/3

### Incorrect
- Custom shadow
- Modified blur values

---

## Components

Before creating anything new:

1. Search for an existing component.
2. Search for an existing variant.
3. Search for an existing pattern.

Always reuse existing assets first.

### Examples

Use:
- Existing Button
- Existing Card
- Existing Modal
- Existing Form Field
- Existing Navigation Component

Avoid:
- Creating duplicate components
- Creating slightly modified variants
- Creating one-off UI patterns

---

## Icons

- Use ONLY approved icon library.
- Maintain existing icon sizes.
- Maintain existing stroke widths.
- Do not introduce new icon styles.

---

## Layout Rules

- Follow approved grid system.
- Follow approved breakpoints.
- Follow approved responsive patterns.
- Maintain alignment consistency.
- Respect component spacing guidelines.

---

## Accessibility Requirements

All designs must:

- Meet WCAG contrast standards.
- Maintain readable typography hierarchy.
- Support keyboard navigation.
- Support screen readers.
- Avoid color-only communication.

Accessibility compliance is mandatory.

---

## Design Decision Framework

For every design decision:

1. Reuse existing component.
2. Reuse existing token.
3. Reuse existing pattern.
4. Reuse existing layout.

If none exists:

- Do NOT invent a new solution.
- Use the closest approved alternative.
- Flag the requirement for Design System review.

---

# Output Requirements

For every screen or component generated, provide:

## Design Tokens Used

### Colors
- [List tokens used]

### Typography
- [List styles used]

### Spacing
- [List spacing tokens used]

### Components
- [List components used]

### Patterns
- [List design patterns used]

---

# Design System Enforcement

Before finalizing any design, verify:

- No custom colors
- No custom typography
- No custom spacing
- No custom shadows
- No custom radius
- No custom components
- No design drift
- Full design system compliance

If any design element does not map to an existing token, component, or pattern, stop and request Design System approval instead of creating a new style.

---

# Final Principle

Think like a Design System Guardian.

Prioritize:

1. Consistency
2. Reusability
3. Accessibility
4. Scalability
5. Maintainability

Never prioritize visual experimentation over Design System compliance.