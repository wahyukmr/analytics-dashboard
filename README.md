# Interactive Analytics Dashboard

## 1. Problem Statement

A SaaS product team needs a reliable way to monitor user engagement, feature adoption, and conversion trends in order to make fast and informed product decisions. While raw data may exist in spreadsheets or analytics exports, these formats do not provide normalized metrics, derived insights, or interactive filtering capabilities. As product complexity grows, manually aggregating and interpreting data becomes inefficient and increases decision latency.

This dashboard aims to provide a structured, performance-aware frontend architecture that transforms raw metrics into actionable insights through data normalization, derived computation, and visual aggregation.

---

## 3. Goals

What this project must demonstrate:

- Intentional data modeling and normalization strategy
- Clear separation between domain logic ang presentation layer
- Reduction-first transformation pipeline (filter -> aggregate -> sort)
- Independent UI states (date range vs sorting)
- Performance-aware rendering decisions
- Progressive enhancement for interaction without corrupting core data flow

---

## 4. Architecture Direction

### Data Transformation Pipeline

Raw Events:
-> Normalized Model
-> Filtered Dataset (by date range)
-> Derived Metrics & Chart Dataset
-> Table Dataset
-> Sorted Table View

### layer Separation

**Domain Layer**

- Raw event modeling
- Normalization
- Filtering
- Aggregation
- Derived metric computation

**Presentation Layer**

- Table rendering
- Sorting
- UI interaction states
- Animation layer (non-blocking)

### State Independence

- `dateRange` controls dataset scope.
- `sortConfig` controls visual ordering.
- Both states are isolated to prevent cascading UI resets.

---

## 5. Rendering Strategy

- Fully client-side rendering
- No SSR
- No backend integration
- Mocked dataset for controlled experimentation

---

## 6. Performance Philosophy

- Filtering occurs before sorting to minimize computational cost.
- Expensive operations are isolated and memoized.
- Decorative layers (animation / 3D) must not trigger domain recomputation.
- Designed to remain responsive on low-end hardware.
