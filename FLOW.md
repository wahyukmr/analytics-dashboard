## Master flow (end-to-end)

Problem -> Model -> Data -> Processing -> API -> UI -> Story -> Generalize

Phase 1 — define system

- Event model (final)
- Event list
- User journey
- Activation: user dianggaap activited jika melakukan `feature_used` minimal 1x
- Dashboard sections: growth, funnel, engagement, feature usage, and retention

Phase 2 — data (event) generator
Goal: have a realistic data based on real user behavior, reflects the funnel, aand have a time distribution

- Model: input (config-driven)
- Event generator

Phase 3 — processing engine (Data pipeline) ⭐
Mental model:

```text
Raw Events
  ↓
Filter (date range)
  ↓
Processing
  ↓
Derived Data
```

Metrics: Global aggregation without order and without dependencies between events. How much something happens?
Funnel: To identify at which step the user stops continuing the process (drop-off). How many users successfully passed this step?
Engagement: To see how active the user is.
Retention: To indetify whether the user returns.
Feature analytic: To identify which features are used.

Event-based aggregation: Counting how many events occurred. How many activities?
User-based aggregation: Counting how many unique users that did something. How many people?

Phase 4 — config system ⭐
Goal: user can be define analytics itself based on config, not hardcode

Mental model:

- Event = data mentah
- Config = aturan analisis (bisnis user)
- Engine (pure logic) = yang mengeksekusi aturan

**Hardcoded** logic menggabungkan definisi masalah dan cara penyelesaiannya dalam satu tempat, sehingga sulit diubah dan tidak fleksibel. Sedangkan **config-driven engine** memisahkan definisi analisis (seperti funnel steps) dari engine pemrosesan, sehingga sistem dapat digunakan ulang untuk berbagai kasus tanpa mengubah kode inti.

Config tidak cukup hanya berupa array string karena eventType saja tidak mampu merepresentasikan kondisi bisnis yang lebih kompleks. Dengan menambahkan condition, kita bisa mendefinisikan perilaku user secara lebih spesifik (misalnya berdasarkan feature atau property tertentu), sehingga sistem dapat menangani berbagai skenario analitik secara fleksibel dan akurat.

---

Arsitektur sistem (high level)
🔹 Layer 1 — Data ingestion

Event masuk dari aplikasi

Frontend / Backend → Event collector
🔹 Layer 2 — Storage

Simpan event (DB / warehouse)

🔹 Layer 3 — Processing
filter
aggregate
compute metric
🔹 Layer 4 — Query layer

Ambil data sesuai kebutuhan

🔹 Layer 5 — Visualization

Chart, table, dashboard

---

✅ Platform ini adalah:
event-based system
configurable analytics
decision-driven
✅ Core features:
metrics
funnel
engagement
retention
feature usage
✅ Fokus kamu:
data modeling
processing logic
architecture

---

Dokumentasi yang kamu butuhkan (WAJIB nanti)
bagaimana event masuk
bagaimana event diproses
bagaimana metric dihitung
bagaimana user bisa konfigurasi funnel
Event-driven architecture
Data pipeline
Config system
Trade-off design

---

Phase 5 — hooks architecture
Goal: menghubungkan engine ke UI tanpa merusak desain

```text
hooks/
  ├── useEvents.ts
  ├── useFilteredEvents.ts
  ├── useMetrics.ts
  ├── useFunnel.ts
  ├── useEngagement.ts
  ├── useFeatureUsage.ts
  ├── useRetention.ts
  └── useAnalytics.ts (optional orchestrator)
```

❗ Hook bukan tempat berpikir
Hook tempat “menghubungkan” (adapter) hasil berpikir (pure logic) ke UI

Phase 6 — UI
Goal: visualization, not logic. Every section take the data itself not depandent on each other

```text
Dashboard
 ├── GrowthSection
 ├── FunnelSection
 ├── EngagementSection
 ├── FeatureSection
 └── RetentionSection
```

cara berpikir PM:

- apakah produk tumbuh? -> growth overview
- kalau tidak, user drop di mana? -> funnel
- user aktif (pakai produk atau tidak)? -> engagement
- fitur mana yang penting? -> feature usage
- user balik atau tidak? -> retention

Phase 7 — interaction system
Goal: real dashboard

State:
date range (global)
funnel config (semi-global)
sorting (local)
chart mode (local)

Phase 8 — validation
Goal: Ensure that the result is make sanse, if any problems / not make sense -> problem in the generator data / processing

Phase 9 — docs
Goal: Can be exlaination of event-driven architecture, data pipeline, config system, and trade-off design

Phase 10 — generalization
Goal: make reusability

add:
dynamic event type
dynamic funnel config
plugin system (opsional)
