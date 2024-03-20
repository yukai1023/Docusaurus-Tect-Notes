---
---

# Closure

## 單辭解析

由 `Close` 與字尾 `-ure` 所構成， `-ure` 有 "動作" 、 "進行" 或 "結果" 的意思。

為名詞或動詞，作名詞時意為 **"關閉，終止"** ，作動詞時為 **“使終止”** 。

## Scope Chain（範圍鏈）

> 在另一篇筆記 [**Variable**](./variable) 有提及過 Scope。

```js
const a = 1;

function outer() {
  // 可外部變量訪問 a
  const b = a * 2;
  function inner(c) {
    // 可以訪問一層一層往上找 a, b, c
    console.log(a, b, c);
  }
  inner(b * 2);
}
outer(a); // 1 2 4
```

在 JavaScript 中，當函式或區塊中需要訪問一個變數時，會首先嘗試在當前的局部作用域（Local Scope）中找到這個變數。如果沒有找到，它會繼續在包含它的外部函式的作用域中尋找，這個過程會一直持續，一層層向上直到全局作用域（Global Scope）為止。

這就是所謂的 **Scope Chain（範圍鏈）**，它確保了函式可以訪問到它被定義時的作用域中的變數和函式。這個鏈結的方向是單向的：**內層可以訪問外層的變數，但外層不能訪問內層的變數**。

當在程式碼中使用一個未宣告的變數時，JavaScript 會沿著 Scope Chain 向上查找，如果在全局作用域中也沒有找到該變數的宣告，並且在非嚴格模式（non-strict mode）下，它會在全局作用域中創建這個變數。

另一個重要觀念是 Scope Chain 是在函式定義時決定的，而不是在函式執行時，這意味著函式的作用域是靜態的，並且在函式創建時就已經確定。

## Closure（閉包）
Closure 是一種函式。它能夠存取被宣告當下的環境中的變數。
```js
function outer() {
  const item = 'box';

  function inner() {
    return item;
  }
  return inner;
}
const call = outer();
console.log(call()); // box
```
在呼叫函式以前，範圍鏈就已經被建立了。因此我們可以在函式 `outer()` 裡面「回傳」另一個內部的函式 `inner()` 給外層的範圍，使得外層也可以透過「範圍鏈」取得內部的變數 `item`。

所以，之後不管你在哪裡呼叫 `outer()`，回傳的 `inner()` 中的 `item` 永遠只會是 `box` 的結果，而不是外面的 `item`。

為了比較一下「使用閉包」與「沒有使用閉包」的差異。來寫一個「計數器」，每呼叫一次 `counter()` 時，數值都要再加一：

```js
let count = 0;
function counter() {
  return ++count;
}
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```
通常會利用一個全域變數來儲存 count 的資訊，邏輯上很合理，不然當你每呼叫一次 `counter()` 就重新宣告 `count` ，永遠都是同一個數。 但是，要是當我們的程式碼開始變多了，過多的全域變數會造成不可預期的錯誤，像是你與同事間的變數名稱衝突、沒用到的變數無法回收等等的。

```js title="這時候改用閉包的做法就可以避免這些問題："
function counter() {
  let count = 0;

  function innerCounter() {
    return ++count;
  }
  return innerCounter;
}
const countFunc = counter();
console.log(countFunc()); // 1
console.log(countFunc()); // 2
console.log(countFunc()); // 3
```
```js title="可以簡化成："
function counter() {
  let count = 0;

  return function () {
    return ++count;
  }
}
```
```js title="搭配 ES6 的箭頭函數 (Arrow Function) 可以寫得更簡短："
function counter() {
  let count = 0;
  return () => ++count;
}
```

另外，過去需要新增另一個計數器時，可能會再新增另一個全域變數去儲存另一個 `count` 的狀態。而改用閉包的寫法之後，只需要像這樣：

```js title="countFunc 與 countFunc2 分別是「獨立」的計數器實體，彼此不會互相干擾！"
function counter() {
  let count = 0;

  function innerCounter() {
    return ++count;
  }
  return innerCounter;
}
const countFunc = counter();
const countFunc2 = counter();

console.log(countFunc()); // 1
console.log(countFunc()); // 2
console.log(countFunc()); // 3

console.log(countFunc2()); // 1
console.log(countFunc2()); // 2
console.log(countFunc2()); // 3
```


---

:::info[文章內容參考來源：]
- [重新認識 JavaScript: Day 19 閉包 Closure](https://ithelp.ithome.com.tw/articles/10193009)
- [Javascript 的作用域 (Scope) 與範圍鏈 (Scope Chain)：往外找](https://medium.com/itsems-frontend/javascript-scope-and-scope-chain-ca17a1068c96)
- [從ES6開始的JavaScript學習生活-Closure 閉包](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/closure.html)
:::
