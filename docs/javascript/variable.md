---
---

# Variable
variable（變數）可以被視為儲存數據的容器。

## 變數的有效範圍
在 JavaScript 中，變數的作用範圍，即它們能夠發揮作用的區域，被稱為 **Scope**（**作用域**）。這個作用域是由變數的宣告位置決定的，並影響到變數在代碼中的可訪問性。

變數的有效範圍主要分為兩種：**全域變數**（**global variables**）和 **區域變數**（**local variables**）。

```js title="全域變數：所有程式區塊外之變數稱為全域變數"
var item = 10;
function count() {
 console.log(item);
}
```

```js title="區域變數：區塊中之變數稱為區域變數"
for (let i = 0; i < 2; i++) {
 console.log(i);
}
```

## 無宣告變數
**如果在作用域內沒有宣告，變數就會往外層的作用域找看看有沒有宣告**，全域都沒找到，就會在全域的最開端進行宣告，也就是說無宣告變數且直接賦值就是全域變數。

與 `var` 最大差別在於「可不可以被 `delete` 刪除」。
```js
var a = "a";
delete a; // false
b = "b";
delete b; // true
```

## var
以 `var` 宣告的變數，其作用域是「**函式作用域**（**function scope**）」，也就是在 function 內宣告的 `var` ，在 function 外面的區域不會被存取到，但是如果在函式外宣告的話，其作用範圍則為全域性（global）。

```js title="在一些區塊作用域（block scope）使用 var 宣告的變數，可能會污染全域變數"
var item = 10;
if (true) {
  var item = 20;
}
console.log(item); // 20
```

```js title="區域變數變為全域變數，重複覆蓋"
for (var i = 0; i<10 ; i++) {
 …
}
console.log(i); // 10
```

## let
以 `let` 宣告的變數，其作用域是「**區塊作用域**(**block scope**)」，也就是 `{}` 包住的區域，一但離開 `{}` 範圍，這個變數就不會被存取到，但是如果在區塊外宣告的話，其作用範圍則為全域性（global）。例如:
```js
let item = 50;
if (true) {
  let item = 20;
  console.log(item); // 20
}
console.log(item); // 50
```

```js title="禁止同一層 Block 重複宣告變數"
let a = 5;
let a = 10;
console.log(a); // 出現錯誤
```

```js title="即使另一個是用 var 宣告的變數也會出現錯誤"
var a = 5;
let a = 10;
console.log(a); // 出現錯誤
```

## const
以 `const` 宣告的常數，`let` 有的特性 `const` 都有，但宣告 `const` 時就必定要指定給值，不然會產生錯誤。並且指定後不能被重新指定（re-assign）。

```js title="無法重新宣告"
const item = 10;
const item = 20; // 出現錯誤
```
```js title="無法重新指定(re-assign)"
const item = { x: 10, y: 5};
item.x = 20 // 可以修改值
item = { x: 5, y: 10 } // 出現錯誤
```

## 變數賦予默認值
有助於閱讀代碼的人理解該變數的用途和類型。
```js
let count = 0;
let name = "";
let isActive = false;
```
## 駝峰式命名 (Camel Case)
在 JavaScript 中，駝峰式命名（Camel Case）是一種常用的命名慣例，特別是在命名**變數（variable）、** **函式（function）** **或 實例對象（instances）** 時。

這種命名方式的特點是：第一個單詞以小寫字母開頭，之後每個單詞的首字母都大寫。這種命名方式稱為「小駝峰式命名」（lower camel case）。
```jsx title="變數（variable）"
let userAge = 25;
```
```jsx title="函式（function）"
function calculateTotalPrice(price, tax) {
  return price + (price * tax);
}
```
```jsx title="實例對象（instances）"
let myCar = new Car('Toyota', 'Corolla');
```

還有一種變體稱為「大駝峰式命名」（Upper Camel Case），也被稱為 Pascal Case，在這種命名慣例中，每個單詞的首字母都大寫。在 JavaScript 中，大駝峰式命名通常用於**類別（class）或建構式（constructor）** 的命名。
```jsx title="類別（class）"
class UserAccount {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
```
```jsx title="建構式（constructor）"
function Car(make, model) {
  this.make = make;
  this.model = model;
}
```
---
:::tip[彙整]

- 在 ECMAScript（JavaScript）裡，嚴謹／限制程度由高到低爲：const 變數、let 變數、var 變數、全域變數。
- 無宣告變數會被視為全域變數，而寫在全域環境的 var、let、const 變數同樣可以視為全域變數。
- var：會受限於函式作用域（function scope），但不會受限在區塊作用域（block scope）內。可以重複宣告。
- let：所宣告的變數只有在區塊作用域（block scope）內有效，不會產生全域變數，無法在同一層 Block 重複宣告變數。
- const：具備 let 所有的特性。在一宣告時就必定要指定給值，不然會產生錯誤，宣告後不能更改值。
:::

:::info[文章內容參考來源：]
- [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Variable)
:::
