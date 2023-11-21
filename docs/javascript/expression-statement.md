---
sidebar_position: 1
---

# Expression ＆ Statement


## Expression（表達式）
程式碼執行後**會回傳結果**。完整類別可至 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_operators)。


- ### 純值
```js
輸入 5678
// highlight-next-line
> 5678
```

- ### 運算值
```js
// 比較運算子
輸入 5678 === 5678
// highlight-next-line
> true

// 算術運算子
輸入 123 + 456
// highlight-next-line
> 579

// 賦值運算子
輸入 age = 30
// highlight-next-line
> 30
```
- ### 執行函式
```js
// 使用函式陳述式宣告函式
function time() {
  return 200;
};
time();
// highlight-next-line
> 200
```
- ### 函式表達式
```js
let area = function () {}
// highlight-next-line
> undefined
```
:::note[備註]

- 函式陳述式有提升 (Hoisting) 的效果，而函式表達式則無。


:::


## Statement（陳述式）

程式碼執行後**不會回傳結果**。完整類別可至 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements)。

- ### 宣告
  - `var`
  - `const`
  - `let`
  - `class`
  - `return`
```js
const a = 10;
let b = 20;
```
- ### 迴圈
  - `for`
  - `while`
  - `do...while`
```js
for (let i = 0; i < 9; i++) {
  str = str + i;
}
```
- ### 流程控制
  - `if…else`
  - `switch`
  - `try...catch`
```js
let result;
if (a > 0) {
  result = 'positive';
} else {
  result = 'NOT positive';
}
```
- ### 其他
  - `debugger`
  - `export`
  - `import`

---

:::tip[彙整]

- JavaScript 語句類型分別為表達式和陳述式。
- 表達式會回傳結果，陳述式則不會。

:::

:::info[文章內容參考來源：]

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_operators)
- [表達式觀念及運用](https://www.casper.tw/development/2020/09/17/js-expression/)
- [運算子、型別與文法-陳述式與表達式](https://israynotarray.com/javascript/20200607/196651152/)
- [何謂表達式(Expression)與陳述式(Statement)？](https://hackmd.io/@ivaSrwTTSkC1jb66rpGfnQ/HyTUsaASF)
:::
