import React, { useMemo } from "react";
import type { useRetention } from "../../hooks";

type RetentionRow = ReturnType<typeof useRetention>[number];

export function RetentionSection({
  data,
}: {
  data: ReturnType<typeof useRetention>;
}): React.JSX.Element {
  console.log("retention component rendered");

  const { rowsSorted, bestCohortIndex } = useMemo(() => {
    const rows = [...data];

    // Sort newest-first by date
    rows.sort(
      (a, b) =>
        new Date(b.cohortDate).getTime() - new Date(a.cohortDate).getTime(),
    );

    // Compute best cohort by average retention across windows
    let bestIndex = -1;
    let bestScore = -Infinity;
    rows.forEach((r, i) => {
      const score =
        (r.retention.day1 + r.retention.day7 + r.retention.day30) / 3;
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    });

    return { rowsSorted: rows, bestCohortIndex: bestIndex };
  }, [data]);

  return (
    <section className="p-6 bg-neutral-900 rounded-xl mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Retention</h2>
        <RetentionLegend />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead className="text-left text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="py-3 pl-2 w-48">Cohort</th>
              <th className="w-24">Users</th>
              <th className="w-36">Day 1</th>
              <th className="w-36">Day 7</th>
              <th className="w-36">Day 30</th>
            </tr>
          </thead>
          <tbody>
            {rowsSorted.map((row, idx) => (
              <CohortRow
                key={row.cohortDate}
                row={row}
                highlight={idx === bestCohortIndex}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CohortRow({
  row,
  highlight,
}: {
  row: RetentionRow;
  highlight: boolean;
}) {
  return (
    <tr
      className={`border-b border-neutral-800 ${highlight ? "bg-linear-to-r from-blue-950/20 to-transparent" : ""}`}
    >
      <td className="py-3 pl-2">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium">{row.cohortDate}</div>
            <div className="text-xs text-neutral-500">
              {formatCohortSubtitle(row.cohortDate)}
            </div>
          </div>
          {highlight && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-500 text-black font-semibold">
              Best cohort
            </span>
          )}
        </div>
      </td>

      <td className="text-neutral-300">{row.cohortSize}</td>

      <HeatmapCell value={row.retention.day1} />
      <HeatmapCell value={row.retention.day7} />
      <HeatmapCell value={row.retention.day30} />
    </tr>
  );
}

function HeatmapCell({ value }: { value: number }) {
  // `value` is already a percentage (0 - 100)
  const percent = Math.max(0, Math.min(100, Number(value)));

  const bg = heatmapColor(percent);

  return (
    <td className="py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-neutral-800 h-3 rounded" aria-hidden>
          <div
            className="h-3 rounded"
            style={{ width: `${percent}%`, backgroundColor: bg }}
          />
        </div>
        <div className="w-16 text-right text-sm font-medium">
          {percent.toFixed(1)}%
        </div>
      </div>
    </td>
  );
}

function RetentionLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-neutral-400">
      <div className="flex items-center gap-2">
        <span
          className="w-6 h-3 rounded"
          style={{ backgroundColor: heatmapColor(10) }}
        />
        <span>Low</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-6 h-3 rounded"
          style={{ backgroundColor: heatmapColor(50) }}
        />
        <span>Medium</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-6 h-3 rounded"
          style={{ backgroundColor: heatmapColor(90) }}
        />
        <span>High</span>
      </div>
    </div>
  );
}

function heatmapColor(percent: number) {
  // Map percent (0-100) to a saturated blue with varying lightness
  const lightness = 92 - (percent / 100) * 52; // 92% -> 40%
  return `hsl(213 85% ${lightness}%)`;
}

function formatCohortSubtitle(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  } catch {
    return dateStr;
  }
}
