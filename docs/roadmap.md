# Project Roadmap

## PHASE 1 — DIRECTION LOCK

### Positioning locked

- Role: Frontend Engineer (React-centric)
- Differentiator: Architecture thinking + interactive experience
- GSAP & light 3D = opsional
- AI = helper tool

### Stack locked

- Vite
- TypeScript
- Tailwind CSS v4

### Rendering locked

🔒 CSR (_client-side rendering_)

### Scope MVP locked

- Metric card (config-driven)
- Line chart
- Date range filter
- Sortable data table
- Responsive layout
- Minimal micro interaction

### Documentations

- `README.md`
- `CONSTRAINTS.md`
- `roadmap.md`

## PHASE 2 — DATA ARCHITECTURE DESIGN

- Raw data shape
- Normalized structure
- Derived metrics strategy
- Filter flow

## PHASE 3 — COMPONENT BOUNDARY PLANNING

- Folder structure
- Hook responsibility
- Separation UI vs logic

## PHASE 4 — CORE IMPLEMENTATION

### Mock dataset

- SaaS event dataset simulation
- ±200–500 events
- Various event types

### Data normalization

- Parse timestamp → Date
- Create a `date` field (YYYY-MM-DD)
- Return `normalizedEvent`

### Filtering

Choose events according to the period. Example: `2026-03-01 → 2026-03-07`

### Metrics computation

- Calculate **DAU** (daily unique user per date range)
- Calculate **total signups** (total registered users)
- Calculate **total upgrades** (total user who switched to the pro plan)
- Calculate **conversion** (upgrade / signup)

### Dashboard hook

- What the hook will do:

  ```text
  normalize
  ↓
  filter
  ↓
  compute metrics
  ↓
  build chart
  ↓
  sort table
  ```

### Minimal UI rendering

Displays the pipeline structure up to the `compute metrics` stage

### Chart data builder

Converting events into data that can be plotted on a chart

### Data table + sorting

Displays aggregated data in a sortable table

## PHASE 5 — PERFORMANCE PASS

- Memoization audit
- Avoid unnecessary re-render
- Dataset scalling
- Lazy loading chart
- Lighthouse check
