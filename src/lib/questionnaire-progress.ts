export const isLastQuestionIndex = (index: number, total: number): boolean => {
  if (!Number.isInteger(index) || index < 0) {
    throw new Error('index must be a non-negative integer');
  }
  if (!Number.isInteger(total) || total < 0) {
    throw new Error('total must be a non-negative integer');
  }
  if (total === 0) return false;
  return index >= total - 1;
};

