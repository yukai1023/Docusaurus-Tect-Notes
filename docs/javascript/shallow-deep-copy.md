---
sidebar_position: 1
---

# Shallow Copy & Deep Copy

## 型別
<img src={require("./img/dataTypes.png").default} style={{width:'60%'}} />

JavaScript內建的型別主要可以分成**基本型別**(Primitives)與**物件型別** (Object)兩大類。

而基本型別又分成 `string`、`number`、`boolean`、`null`、`undefined`、`symbol`幾種，除了以上幾種之外，其他都可以歸類至物件型別。

這二種型別之間的差異，就是在他們的傳值方式：
```js
基本型別 => 傳「值」(value)
物件型別 => 傳「址」(reference)
```
### 基本型別
```js
let a = "apple";
let b = a;
b = "banana";
console.log(a); // apple
console.log(b); // banana
```
在修改 `b` 時並不會改到 `a` 的值。

### 物件型別
```js
let objA = { name: 'apple' }
let objB = objA
objB.name = 'banana'
console.log(objA); // { name: 'banana' }
console.log(objB); // { name: 'banana' }
```
在修改 `objB` 時，也會修改到 `objA` 的值。

## Shallow Copy（淺拷貝）與 Deep Copy（深拷貝）
<img src={require("./img/shallowDeepCopy.png").default} style={{width:'70%'}} />

- **淺拷貝** — 只能完成第一層的淺層複製，若有第二層結構時，還是依據參考特性作處理，也就代表指向記憶體位址還是一樣的。

- **深拷貝** — 深度複製指定物件，操作新物件不影響原物件，兩者指向不同記憶體位址。

### 淺拷貝方法 — [Object.assign](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

[Object.assign](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 是 ES6 的新函式，我們可以用來達成複製的功能。

```js
let array = ['red', 'blue', 'yellow'];
let object = { p1: '1', p2: '2', p3: '3' };

let arrayCP = Object.assign([], array);
arrayCP[0] = 'black';

let objectCP = Object.assign({}, object);
objectCP.p2 = '4';

console.log(array); // ['red', 'blue', 'yellow']  <= 原陣列沒有影響
console.log(arrayCP); // ['black', 'blue', 'yellow']
console.log(object); // { p1: '1', p2: '2', p3: '3' }  <= 原物件沒有影響
console.log(objectCP); // { p1: '1', p2: '4', p3: '3' }
```
雖然目前看起來都沒受影響，但第二層還是會有參考特性影響原物件問題：
```js
let data = [{ name: 'Yukai', age: 25 }];
let dataCP = Object.assign([], data);
// 操作第一層 ： 不影響原物件
dataCP.push({ name: 'Amy', age: 50 });
// 操作第二層 ： 影響原物件
dataCP[0].name = 'Tom';

console.log(data); // [{ name: 'Tom', age: 25 }]
console.log(dataCP); // [{ name: 'Tom', age: 25 }, { name:'Amy', age: 50 }]
```

### 淺拷貝方法 — [展開運算符(Spread Operator)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

[展開運算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)也是 ES6 新增的特性，主要功能是把一個陣列展開（expand）成個別值，在依序放入指定物件或陣列，也可用做淺層複製：

```js
let array = ['red', 'blue', 'yellow'];
let object = { p1: '1', p2: '2', p3: '3' };

let arrayCP = [...array];
arrayCP[0] = 'black';

let objectCP = { ...object };
objectCP.p2 = '4';

console.log(array); // ['red', 'blue', 'yellow']  <= 原陣列沒有影響
console.log(arrayCP); // ['black', 'blue', 'yellow']
console.log(object); // { p1: '1', p2: '2', p3: '3' }  <= 原物件沒有影響
console.log(objectCP); // { p1: '1', p2: '4', p3: '3' }
```
但如同 `Object.assign`，第二層也會有參考特性影響原物件問題。

### 深拷貝方法 — [JSON](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/JSON)
常見應用為 Local Storge 等存儲操作，但也可以應用在深拷貝，主要利用 [JSON.stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 把物件轉成字串，再用 [JSON.parse](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 把字串轉為物件：

```js
let data = [{ name: 'Yukai', age: 25 }];
let dataCP = JSON.parse(JSON.stringify(data));
// 操作第一層：不影響原物件
dataCP.push({ name: 'Amy',age:50 });
// 操作第二層：不影響原物件
dataCP[0].name = 'Tom';
console.log(data); // [{ name: 'Yukai', age: 25 }]
console.log(dataCP); // [{ name: 'Tom', age: 25 }, { name: 'Amy', age: 50 }]
```
:::warning[限制與缺點]
- **無法處理循環引用**：如果對象中存在循環引用（例如，對象的一個屬性直接或間接地引用了對象本身），這種方法會拋出錯誤。
- **忽略屬性值**：在拷貝過程中，對象中的任意的函式、undefined 以及 symbol 值會被忽略。
- **特殊對象處理不足**：不能處理像 Date、RegExp、Function、Map、Set 等特殊類型的對象。
:::

### 深拷貝方法 — [structuredClone](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)
它是一個全局方法，用於創建給定值的深拷貝，使用的是[結構化克隆算法](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)，這意味著它不僅複製了對象本身，還複製了所有嵌套的對象：

```js
const original = {
  name: "Alice",
  age: 25,
  contact: {
    email: "alice@example.com",
    phone: "1234567890"
  }
};
const clone = structuredClone(original);
clone.contact.email = "alice_clone@example.com";
console.log(original); // { name: 'Alice', age: 25, contact: { email: 'alice@example.com', phone: '1234567890' } }
console.log(clone); // { name: 'Alice', age: 25, contact: { email: 'alice_clone@example.com', phone: '1234567890' } }
```

:::warning[限制與缺點]
- **不支援所有類型**：雖然 structuredClone 支援許多 JavaScript 內建類型，但它不支援某些專門的對象類型，如函數、錯誤對象、DOM 節點等。嘗試克隆這些不支援的類型會導致錯誤。
- **可能改變原始對象**：如果原始對象包含可轉移對象（如 [ArrayBuffer](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)），在克隆過程中這些對象會從原始對象轉移到新對象，使得它們在原始對象中不再可用。
:::

### 深拷貝方法 — 遞迴實現
通過遞迴方式複製每個屬性（包括嵌套的對象和數組）來實現深拷貝。這保證了拷貝對象在結構上與原始對象完全獨立，對拷貝對象的任何修改都不會影響原始對象，反之亦然：
```js
function deepCopy(obj) {
  // 如果 obj 是基本類型之一，將直接返回
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  // 判斷 obj 是物件還是陣列，返回空物件或空陣列
  let tempObj = Array.isArray(obj) ? [] : {};

  // 每個屬性的拷貝被賦值給 tempObj 的對應屬性
  for (let key in obj) {
    tempObj[key] = deepCopy(obj[key]);
  }

  // 返回深拷貝的對象
  return tempObj;
}

const originalObj = {
    name: 'Alice',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'Wonderland'
    },
    hobbies: ['reading', 'coding']
};

const copiedObj = deepCopy(originalObj);

// 修改原始對象
originalObj.address.city = 'New Wonderland';
originalObj.hobbies.push('painting');

// 修改拷貝对象
copiedObj.name = 'Bob';

console.log(originalObj); // address和hobbies被修改，name保持不變
console.log(copiedObj);   // name被修改，address和hobbies保持不變
```
:::warning[限制與缺點]
- **特殊對象處理不足**：不能處理像 Date、RegExp、Function、Map、Set 等特殊類型的對象。
:::

---

:::info[文章內容參考來源：]

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)
- [JavaScript 淺拷貝 (Shallow Copy) 與深拷貝 (Deep Copy)](https://awdr74100.github.io/2019-10-24-javascript-deepcopy/)
- [關於JS中的淺拷貝(shallow copy)以及深拷貝(deep copy)](https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122)
- [淺拷貝(Shallow Copy) VS 深拷貝(Deep Copy)](https://kanboo.github.io/2018/01/27/JS-ShallowCopy-DeepCopy/)
:::
