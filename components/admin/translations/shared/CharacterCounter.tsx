interface Props {
  current: number;
  max?: number;
}

export default function CharacterCounter({ current, max }: Props) {
  if (!max) {
    return <span className="text-xs text-riiba-green-dark/50">{current} caracteres</span>;
  }
  const ratio = current / max;
  const color =
    ratio > 1 ? "text-red-600" : ratio > 0.8 ? "text-amber-600" : "text-riiba-green-dark/60";
  return <span className={`text-xs font-medium ${color}`}>{current}/{max}</span>;
}