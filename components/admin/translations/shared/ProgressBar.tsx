interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-riiba-orange transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 text-xs font-medium tabular-nums text-riiba-green-dark/60">
        {current}/{total} · {pct}%
      </span>
    </div>
  );
}