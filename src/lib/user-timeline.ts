export const createUserTimelinePositions = (pointCount: number): number[] => {
  if (!Number.isFinite(pointCount) || !Number.isInteger(pointCount)) {
    throw new TypeError('pointCount must be a finite integer');
  }
  if (pointCount < 2) {
    throw new RangeError('pointCount must be at least 2');
  }

  return Array.from({ length: pointCount }, (_, idx) => idx / (pointCount - 1));
};
