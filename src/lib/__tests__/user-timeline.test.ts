import { createUserTimelinePositions } from '../user-timeline';

describe('createUserTimelinePositions', () => {
  it('creates even positions across the full width', () => {
    expect(createUserTimelinePositions(5)).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  it('throws when count is not an integer', () => {
    expect(() => createUserTimelinePositions(3.5)).toThrow(TypeError);
  });

  it('supports the boundary of exactly 2 points', () => {
    expect(createUserTimelinePositions(2)).toEqual([0, 1]);
  });
});
