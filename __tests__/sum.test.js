const { sum, average } = require('../src/jest/sum.js');

describe('sum', () => {
  test('計算一個空陣列的總和應該為0', () => {
    expect(sum([])).toBe(0);
  });

  test('計算數字陣列的總和', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });
});

describe('average', () => {
  it('計算空陣列的平均值應該為0', () => {
    expect(average([])).toBe(0);
  });

  it('計算數字陣列的平均值', () => {
    expect(average([1, 2, 3])).toBe(2);
  });
});