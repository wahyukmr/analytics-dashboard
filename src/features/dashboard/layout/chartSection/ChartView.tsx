import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { NormalizedEvent } from "../../dashboardTypes";
import { useChartData } from "./useChartData";

export default function ChartView({
  filteredEvents,
}: {
  filteredEvents: NormalizedEvent[];
}): React.JSX.Element {
  const chartPoints = useChartData(filteredEvents);

  console.log("ChartSection");

  return (
    <section className="chart">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartPoints}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip itemStyle={{ color: "#00695C" }} />

            <Line
              type="monotone"
              dataKey="dau"
              stroke="#C5E1A5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
