---
---

# 測試覆蓋率與報告

斷言基本上是對程式行為的預期聲明，如果實際行為符合預期則測試通過，否則為測試失敗，然而即使所有的斷言都通過，如果測試遺漏了某些條件分支，仍然不能完全確認整個程式的邏輯正確性，這正是覆蓋率的重要性所在。

覆蓋率用來統計被測試的函式或程式碼的執行比例，如果一個函式內的所有代碼都被測試過，則這個函式的覆蓋率為 100% 。

## 創建測試檔案

`Jest` 是按每個 `JavaScript` 文件來計算覆蓋率，分析每個文件中被測試執行的代碼比例，因此將函式與測試代碼分開到不同的文件，可以更清晰地管理和追蹤覆蓋率。

通常函式代碼存放在項目的主目錄下，而測試代碼則放在專門的測試目錄中，如 `__tests__`。

### 建立函式代碼

```js title="檔案名稱為 sum.js"
function sum(numbers) {
  return numbers.reduce((acc, current) => acc + current, 0);
}

function average(numbers) {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

module.exports = { sum, average };
```

`sum` 函式計算數字陣列的總和，而 `average` 函式用來計算平均值。

### 建立測試代碼

```js title="檔案名稱為 sum.test.js，僅對 sum 函式進行測試"
const { sum, average } = require('../test/sum');

describe('sum', () => {
  test('計算一個空陣列的總和應該為0', () => {
    expect(sum([])).toBe(0);
  });

  test('計算數字陣列的總和', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });
});
```

### 修改 `package.json` 配置並執行

```json title="設定新指令"
"scripts": {
  "test": "jest",
  // highlight-next-line
  "test:coverage": "jest --coverage"
}
```

執行 `npm run test:coverage`：

<img src={require('./img/coverage/fiftyPercentTest.png').default} alt="fiftyPercentTest" style={{ borderRadius: '10px', width: '80%' }} />

- **File**：測試文件名。
- **Stmts（Statements）**：語句覆蓋率。
- **Branch**：分支覆蓋率。
- **Funcs（Functions）**：函式覆蓋率。
- **Lines**：行數覆蓋率。
- **Uncovered Line**：未覆蓋行號。

### 測試報告

運行完成後，會在項目目錄中生成一個 `coverage` 文件夾，裡面包含了詳細的覆蓋率報告，可以打開 `coverage/lcov-report/index.html` 來查看測試報告：

<img src={require('./img/coverage/fiftyPercentReport.png').default} alt="fiftyPercentReport" style={{ borderRadius: '10px', width: '100%' }} />

點擊 `sum.js` 有更詳盡的測試結果：

<img src={require('./img/coverage/fiftyPercentDetail.png').default} alt="fiftyPercentDetail" style={{ borderRadius: '10px', width: '70%' }} />

## 達到 100% 覆蓋率

```js title="將 average 的測試也加入到 sum.test.js"
describe('average', () => {
  it('計算空陣列的平均值應該為0', () => {
    expect(average([])).toBe(0);
  });

  it('計算數字陣列的平均值', () => {
    expect(average([1, 2, 3])).toBe(2);
  });
});
```

再次執行 `npm run test:coverage`：

<img src={require('./img/coverage/hundredPercentTest.png').default} alt="hundredPercentTest" style={{ borderRadius: '10px', width: '80%' }} />

### 測試報告

<img src={require('./img/coverage/hundredPercentReport.png').default} alt="hundredPercentReport" style={{ borderRadius: '10px', width: '80%' }} />

---

<img src={require('./img/coverage/hundredPercentDetail.png').default} alt="hundredPercentDetail" style={{ borderRadius: '10px', width: '80%' }} />

---
:::info[文章內容參考來源：]

- [Jest官方文件](https://jestjs.io/docs/getting-started)
- [Jest | 讓 Jest 為你的 Code 做測試-基礎用法教學](https://medium.com/enjoy-life-enjoy-coding/%E8%AE%93-jest-%E7%82%BA%E4%BD%A0%E7%9A%84-code-%E5%81%9A%E5%96%AE%E5%85%83%E6%B8%AC%E8%A9%A6-%E5%9F%BA%E7%A4%8E%E7%94%A8%E6%B3%95%E6%95%99%E5%AD%B8-d898f11d9a23)
- [jest 查看测试报告和代码覆盖率](https://juejin.cn/post/7085323443079479310)
:::
