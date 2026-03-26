export type SignaturePoint = Readonly<{ x: number; y: number }>;

const format = (n: number): string => {
  if (!Number.isFinite(n)) return '0';
  return String(Math.round(n * 10) / 10);
};

export const pointsToSvgPath = (points: readonly SignaturePoint[]): string => {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  if (!first) return '';
  const start = `M ${format(first.x)} ${format(first.y)}`;
  if (rest.length === 0) return start;
  const lines = rest.map((p) => `L ${format(p.x)} ${format(p.y)}`).join(' ');
  return `${start} ${lines}`;
};

export const isValidSignaturePath = (d: string | undefined | null): boolean => {
  if (!d) return false;
  return d.trim().length > 0;
};

