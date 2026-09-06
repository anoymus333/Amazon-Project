import {formatCurrency} from '../scripts/utils/money.js';

describe('formatCurrency',() => {
  it('should format currency correctly', () => {
    expect(formatCurrency(12345)).toBe('123.45');
  });
  it('works with 0', () => {
    expect(formatCurrency(0)).toBe('0.00');
  });
  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(12345.678)).toBe('123.46');
  });
});
