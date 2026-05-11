interface MetricCardProps {
  label: string;
  value: string | number;
}

export default function MetricCard({
  label,
  value,
}: MetricCardProps): React.JSX.Element {
  console.log("metric card");

  return (
    <div className="p-4 rounded-xl bg-neutral-900">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
