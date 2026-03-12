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
import type { ChartPoint } from "../types";

export default function ChartSection({
  data,
}: {
  data: ChartPoint[];
}): React.JSX.Element {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
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
  );
}
