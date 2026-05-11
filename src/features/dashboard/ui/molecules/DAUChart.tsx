import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { useEngagement } from "../../hooks";

export default function DAUChart({
  data,
}: {
  data: ReturnType<typeof useEngagement>["dau"];
}): React.JSX.Element {
  console.log("DAU chart component rendered");

  return (
    <div className="p-4 bg-neutral-900 rounded-xl">
      <LineChart
        style={{
          width: "100%",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="dau"
          stroke="#C5E1A5"
          strokeWidth={2}
          name="Daily active user"
          isAnimationActive={false}
        />
        <XAxis dataKey="date" />
        <YAxis
          allowDecimals={false}
          width="auto"
          label={{ value: "DAU", position: "insideLeft", angle: -90 }}
        />
        <Legend align="right" />
        <Tooltip itemStyle={{ color: "#00695C" }} />
      </LineChart>
    </div>
  );
}
