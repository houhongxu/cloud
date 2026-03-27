/**
 * Stroke dash offset for an SVG circular progress ring (0–100%).
 */
export const recoveryRingStrokeDashoffset = (percent: number, circumference: number): number => {
  if (!Number.isFinite(circumference)) {
    return circumference;
  }
  if (!Number.isFinite(percent)) {
    return circumference;
  }
  const clamped = Math.max(0, Math.min(100, percent));
  return circumference * (1 - clamped / 100);
};
