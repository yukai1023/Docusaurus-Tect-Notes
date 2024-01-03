---
---

# 安裝與基礎測試

[Jest](https://jestjs.io/) 是 JavaScript 測試框架，由 Meta 所維護，並廣泛用於測試 React 應用程序，主要用於撰寫自動化的單元測試和整合測試。

除了 Jest，還有一些其他流行的 JavaScript 測試框架，如：[Mocha](https://mochajs.org/)、[Jasmine](https://jasmine.github.io/)、[Karma](https://karma-runner.github.io/)。

## 安裝 Jest

### 創建專案
```bash npm2yarn
npm init -y
```
> `-y` 是 `--yes` 的縮寫，這表示自動同意所有問題的默認答案，並快速創建一個新的 `package.json` 文件。

### 下載套件

```bash npm2yarn
npm install jest --save-dev
```

> `--save-dev` 為命令選項，將模組作為 **開發依賴 （Development Dependencies）** 安裝，而非 **生產依賴（Production Dependencies）** ，表示模組僅在開發過程中需要，而在生產環境中則不必使用。

### 配置 package.json

在 `package.json` 文件中，添加一個測試腳本：

```json
"scripts": {
  "test": "jest"
}
```

## 編寫基礎測試

### 創建測試文件
在專案中，創建一個以 `.test.js` 結尾的文件，例如 `example.test.js`， Jest 會自動找到這些測試文件。

```js
test('兩數相加結果為正確', () => {
  expect(1 + 2).toBe(3);
});
```

在這個例子中， test 函式用於定義一個測試案例，其兩個參數的意義如下：

- **測試案例的名稱**：用於描述測試案例的目的或正在測試的行為。

- **匿名函式**：函式中包含了測試的邏輯，`expect` 和 `toBe` 是 Jest 提供的匹配器（matchers），用來進行斷言（assertions），斷言是單元測試中的一個重要概念，它用於檢查程式碼的某個特定部分是否符合預期的行為或結果。因此上方測試內容為：「 1 加 2 期望會等於 3 」。

### 運行測試

```bash npm2yarn
npm run test
```
終端機執行後，將顯示測試的結果：
<img src={require('./img/runTest.png').default} alt="runTest" style={{ borderRadius: '10px', width: '40%' }} />

會顯示測試了哪些 `.test.js` 檔案，如果測試內的結果正確符合的話會輸出 PASS 。

為了進行一次錯誤測試，這邊把預期（toBe）的數字改成 4 ：

<img src={require('./img/runErrorTest.png').default} alt="runErrorTest" style={{ borderRadius: '10px', width: '60%' }} />

- **Expected**：測試中期望得到的結果。
- **Received**：測試中實際得到的結果。

---
:::info[文章內容參考來源：]
- [Jest官方文件](https://jestjs.io/docs/getting-started)
- [Jest | 讓 Jest 為你的 Code 做測試-基礎用法教學](https://medium.com/enjoy-life-enjoy-coding/%E8%AE%93-jest-%E7%82%BA%E4%BD%A0%E7%9A%84-code-%E5%81%9A%E5%96%AE%E5%85%83%E6%B8%AC%E8%A9%A6-%E5%9F%BA%E7%A4%8E%E7%94%A8%E6%B3%95%E6%95%99%E5%AD%B8-d898f11d9a23)
:::