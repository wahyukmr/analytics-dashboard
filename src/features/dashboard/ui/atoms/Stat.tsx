import React from "react";

export default function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <div>
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
