# Graph Report - .  (2026-07-07)

## Corpus Check
- Corpus is ~13,403 words - fits in a single context window. You may not need a graph.

## Summary
- 120 nodes · 210 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.79)
- Token cost: 178,826 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Layout & Dashboard Views|App Layout & Dashboard Views]]
- [[_COMMUNITY_React Package Dependencies|React Package Dependencies]]
- [[_COMMUNITY_ViteReact Scaffolding Docs|Vite/React Scaffolding Docs]]
- [[_COMMUNITY_Data Display Components|Data Display Components]]
- [[_COMMUNITY_Dashboard Widgets & Cards|Dashboard Widgets & Cards]]
- [[_COMMUNITY_Build Tooling Dependencies|Build Tooling Dependencies]]
- [[_COMMUNITY_Dialogs & Error States|Dialogs & Error States]]
- [[_COMMUNITY_SocialBrand Icon Sprite|Social/Brand Icon Sprite]]
- [[_COMMUNITY_Oxlint Configuration|Oxlint Configuration]]
- [[_COMMUNITY_Hero Image Branding|Hero Image Branding]]
- [[_COMMUNITY_Favicon Icon|Favicon Icon]]

## God Nodes (most connected - your core abstractions)
1. `Button()` - 13 edges
2. `Card()` - 8 edges
3. `CardBody()` - 7 edges
4. `Badge()` - 6 edges
5. `public/icons.svg Icon Sprite` - 6 edges
6. `scripts` - 5 edges
7. `CardHeader()` - 5 edges
8. `React + Vite Template` - 5 edges
9. `Avatar()` - 4 edges
10. `CardFooter()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `RexAdmin — Modern SaaS Admin Dashboard` --conceptually_related_to--> `React + Vite Template`  [INFERRED]
  index.html → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Vite React Build Tooling Stack (plugin-react/plugin-react-swc/Oxc/SWC)** — readme_vitejs_plugin_react, readme_vitejs_plugin_react_swc, readme_oxc, readme_swc [EXTRACTED 0.90]
- **Social Platform Brand Icon Group** — public_icons_bluesky_icon, public_icons_discord_icon, public_icons_github_icon [INFERRED 0.80]
- **Stroke-Style UI Icon Group (aa3bff accent)** — public_icons_documentation_icon, public_icons_social_icon [INFERRED 0.85]

## Communities (13 total, 2 thin omitted)

### Community 0 - "App Layout & Dashboard Views"
Cohesion: 0.13
Nodes (14): App(), CardSkeleton(), Skeleton(), TableSkeleton(), ToastContainer(), FormElementsShowcase(), LoginView(), RoleManagement() (+6 more)

### Community 1 - "React Package Dependencies"
Cohesion: 0.12
Nodes (15): React (JavaScript Library), dependencies, lucide-react, react, react-dom, name, private, scripts (+7 more)

### Community 2 - "Vite/React Scaffolding Docs"
Cohesion: 0.15
Nodes (13): Google Fonts Inter, /src/main.jsx entry script, RexAdmin — Modern SaaS Admin Dashboard, #root mount div, vite.svg favicon, Oxc, Oxlint Configuration, React Compiler (+5 more)

### Community 3 - "Data Display Components"
Cohesion: 0.28
Nodes (8): Avatar(), Dropdown(), DropdownDivider(), DropdownHeader(), DropdownItem(), DataTable(), EmptyState(), Navbar()

### Community 4 - "Dashboard Widgets & Cards"
Cohesion: 0.41
Nodes (6): Badge(), Card(), CardBody(), CardFooter(), CardHeader(), ChartsPlaceholder()

### Community 5 - "Build Tooling Dependencies"
Cohesion: 0.17
Nodes (12): Vite Build Tool, devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @tailwindcss/postcss, @types/react (+4 more)

### Community 6 - "Dialogs & Error States"
Cohesion: 0.27
Nodes (6): Button(), ConfirmationDialog(), Drawer(), Modal(), ErrorPages(), NoPermission()

### Community 7 - "Social/Brand Icon Sprite"
Cohesion: 0.32
Nodes (8): bluesky-clip clipPath Definition, Bluesky Icon Symbol, Discord Icon Symbol, Documentation Icon Symbol, GitHub Icon Symbol, Social (People) Icon Symbol, public/icons.svg Icon Sprite, X (Twitter) Icon Symbol

### Community 8 - "Oxlint Configuration"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

## Knowledge Gaps
- **35 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `name` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Build Tooling Dependencies` to `React Package Dependencies`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Layout & Dashboard Views` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._
- **Should `React Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._