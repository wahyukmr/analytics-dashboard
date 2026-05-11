import React from "react";
import type { useFeatureUsage } from "../../hooks";

type Row =
  NonNullable<ReturnType<typeof useFeatureUsage>> extends (infer R)[] ? R : any;
type SortKey =
  | "feature"
  | "usage"
  | "uniqueUsers"
  | "usagePerUser"
  | "adoptionRate";

export default function FeatureTable({
  data,
}: {
  data: ReturnType<typeof useFeatureUsage>;
}): React.JSX.Element {
  const [sortKey, setSortKey] = React.useState<SortKey>("usage");
  const [direction, setDirection] = React.useState<"asc" | "desc">("desc");

  console.log("feaature table component rendered");

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setDirection((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDirection("desc");
    }
  };

  const nf = React.useMemo(() => new Intl.NumberFormat(undefined), []);
  const pct = React.useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [],
  );

  const sorted = React.useMemo(() => {
    const arr = [...data];
    arr.sort((a: Row, b: Row) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];

      // string compare
      if (typeof aVal === "string") {
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // numeric compare (fallback)
      const av = Number(aVal ?? 0);
      const bv = Number(bVal ?? 0);
      return direction === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [data, sortKey, direction]);

  const headerClass = "py-2 text-neutral-400 text-left select-none";

  const SortIcon = ({ active, asc }: { active: boolean; asc: boolean }) => (
    <svg
      className={`w-3 h-3 transition-opacity ${active ? "opacity-100" : "opacity-30"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        d="M6 9l6-6 6 6"
        transform={asc ? undefined : "scale(1,-1) translate(0,-18)"}
      />
    </svg>
  );

  return (
    <div className="p-6 bg-neutral-900 rounded-xl mt-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Feature Usage</h2>

      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="text-neutral-400">
            <th className={headerClass} style={{ width: "36%" }}>
              <button
                className="flex items-center gap-2 w-full text-left"
                onClick={() => toggleSort("feature")}
                aria-sort={
                  sortKey === "feature"
                    ? direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                Feature
                <SortIcon
                  active={sortKey === "feature"}
                  asc={direction === "asc"}
                />
              </button>
            </th>

            <th className={headerClass} style={{ width: "14%" }}>
              <button
                className="flex items-center gap-2 w-full justify-center"
                onClick={() => toggleSort("usage")}
                aria-sort={
                  sortKey === "usage"
                    ? direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                Usage
                <SortIcon
                  active={sortKey === "usage"}
                  asc={direction === "asc"}
                />
              </button>
            </th>

            <th className={headerClass} style={{ width: "14%" }}>
              <button
                className="flex items-center gap-2 w-full justify-center"
                onClick={() => toggleSort("uniqueUsers")}
                aria-sort={
                  sortKey === "uniqueUsers"
                    ? direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                Users
                <SortIcon
                  active={sortKey === "uniqueUsers"}
                  asc={direction === "asc"}
                />
              </button>
            </th>

            <th className={headerClass} style={{ width: "18%" }}>
              <button
                className="flex items-center gap-2 w-full justify-center"
                onClick={() => toggleSort("usagePerUser")}
                aria-sort={
                  sortKey === "usagePerUser"
                    ? direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                Usage/User
                <SortIcon
                  active={sortKey === "usagePerUser"}
                  asc={direction === "asc"}
                />
              </button>
            </th>

            <th className={headerClass} style={{ width: "18%" }}>
              <button
                className="flex items-center gap-2 w-full justify-center"
                onClick={() => toggleSort("adoptionRate")}
                aria-sort={
                  sortKey === "adoptionRate"
                    ? direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                Adoption Rate
                <SortIcon
                  active={sortKey === "adoptionRate"}
                  asc={direction === "asc"}
                />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((row: Row, index: number) => (
            <tr
              key={row.feature}
              className={`border-t border-neutral-800 hover:bg-neutral-850 transition-colors ${index === 0 ? "bg-linear-to-r from-neutral-900/30 to-transparent" : ""}`}
            >
              <td className="py-3 text-neutral-100">{row.feature}</td>
              <td className="text-center text-neutral-200">
                {nf.format(row.usage)}
              </td>
              <td className="text-center text-neutral-200">
                {nf.format(row.uniqueUsers)}
              </td>
              <td className="text-center text-neutral-200">
                {Number(row.usagePerUser).toFixed(2)}
              </td>
              <td className="py-3">
                <div className="w-full bg-neutral-800 h-3 rounded overflow-hidden">
                  <div
                    className="h-3 rounded bg-linear-to-r from-blue-500 to-cyan-400 transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(0, row.adoptionRate * 100))}%`,
                    }}
                    title={pct.format(row.adoptionRate)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
