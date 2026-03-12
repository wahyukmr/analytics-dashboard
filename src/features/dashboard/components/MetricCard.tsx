interface MetricCardProps {
  label: string;
  value: string | number;
}

export default function MetricCard({
  label,
  value,
}: MetricCardProps): React.JSX.Element {
  return (
    <div className="metric-card">
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  );
}
