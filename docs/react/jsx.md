---
---

# JSX
JSX（JavaScript [XML](https://developer.mozilla.org/zh-CN/docs/Web/XML/XML_introduction)）是 React 的一個重要特性，它允許開發者在 JavaScript 代碼中使用類似 HTML 的語法來描述用戶介面。這種語法使得 React 組件的撰寫變得更為直觀和方便：

```jsx title="原始的 JSX 代碼"
const App = () => {
  return (
    <div className="app">
      <h1>Hello, JSX!</h1>
    </div>
  );
};
```

當你使用 JSX 撰寫代碼時，這些 JSX 代碼在編譯過程中會被轉換成 `React.createElement` 的調用。這個轉換過程是自動的，通常是由像 [Babel](https://babeljs.io/docs/) 這樣的 JavaScript 編譯器完成的：

```js title="轉換後的 JavaScript 代碼"
const App = () => {
  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement(
      'h1',
      null,
      'Hello, JSX!'
    )
  );
};
```

## JSX 最外層只能有一個根元素

每個 JSX 必須有一個單一的根元素，這意味著在一個組件的返回值中，所有的JSX元素都必須被包含在一個單一的父元素內：

```jsx title="錯誤的用法（兩個平行元素）"
function MyComponent() {
  return (
    <h1>標題</h1>
    <p>段落</p>
  );
}
```

```jsx title="正確的用法（單一根元素）"
function MyComponent() {
  return (
    <div>
      <h1>標題</h1>
      <p>段落</p>
    </div>
  );
}
```

```jsx title="正確的用法（使用 <React.Fragment>）"
function MyComponent() {
  return (
    <React.Fragment>
      <h1>標題</h1>
      <p>段落</p>
    </React.Fragment>
  );
}
// 可以縮寫成 <>
function MyComponent() {
  return (
    <>
      <h1>標題</h1>
      <p>段落</p>
    </>
  );
}
```

```jsx title="正確的用法（陣列返回）"
// 每個元素都需要一個唯一的 key 屬性
function MyComponent() {
  return [
    <h1 key="header">標題</h1>,
    <p key="paragraph">段落</p>
  ];
}
```
## JSX className
若要為元素代入樣式，需要使用 `className` 而非傳統 HTML 中的 `class` 來指定 CSS 類別。這是因為 JSX 最終會被轉換成 JavaScript，而在 JavaScript 中，`class` 是一個保留字，用於聲明類。

```jsx
function MyComponent() {
  return <div className="my-class">歡迎使用React</div>;
}
```
## 自定義 Component 必須由大寫字母開頭

### 小寫字母開頭的 Element
React 會將其視為普通的 HTML 或 SVG 標籤。在 JSX 被轉換成 JavaScript 時，這些元素會被轉換成對應的字串，傳遞給 `React.createElement` 函數：

- JSX 中的 `<div>` 會被轉換為 `React.createElement('div')`
- JSX 中的 `<span>` 會被轉換為 `React.createElement('span')`

### 大寫字母開頭的 Element
React 會將其視為自定義組件的引用。在這種情況下，JSX 會被轉換成以該組件為參數的 `React.createElement` 調用：

- 假設有個名為 `MyComponent` 的組件，那麼 `<MyComponent />` 會被轉換為 `React.createElement(MyComponent)`

## JSX 中的 Props
在 React 中，props 是不可變的，這意味著你不能在子組件內部更改 prop 的值，這是為了確保組件的純凈性和可預測性。如果需要根據 prop 的變化改變組件的行為，應該使用內部狀態（state）或生命週期方法。

### JavaScript 表達式作為 Props
可以用 `{}` 包住任何 **JavaScript 表達式** 作為一個 prop 傳遞。例如：

```jsx title="運算式"
<MyComponent number={1 * 2 - 3} />
```
```jsx title="字串字面值"
<MyComponent message={'hello world'} />
```
```jsx title="物件"
<MyComponent object={{ key: 'value' }} />
```
```jsx title="行內樣式"
<MyComponent style={{ color: 'white', width: '100px' }}> />
```
```jsx title="函式"
<MyComponent onClick={() => console.log('Clicked')} />
```
### Props 預設為 「True」
```jsx title="如果沒給 prop 賦值，那麼它的預設值為 true。"
<MyComponent autocomplete />
```

## JSX 中的 Children
在 React 和 JSX 中，children 是一個特殊的 prop，它允許你將組件的子元素傳遞給該組件。這使得組件可以靈活地封裝和顯示任意的子內容。


### JavaScript 表達式作為 Children
你可以傳遞任何封裝在 `{}` 內的 JavaScript 表達式作為 children。例如：

```jsx title="以下表達式皆相等"
<MyComponent>hello</MyComponent>

<MyComponent>{'hello'}</MyComponent>
```

```jsx title="動態生成列表"
function List() {
  const items = ["蘋果", "香蕉", "橘子"];
  return (
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
```

### Functions 作為 Children
在 React 中，將函式（functions）作為children傳遞給組件是一種常見的進階模式，中文可稱為「函式作為子元素」（Function as Child Component, FaCC）。這種模式使得組件之間的數據和邏輯共享更加靈活和動態。

```jsx
function DataDisplay({ children }) {
  const data = {
    name: '艾咪',
    age: 28,
    job: '行政專員'
  };

  // 調用 children 函式，並傳遞 data 作為參數
  return <div>{children(data)}</div>;
}

<DataDisplay>
  {data => (
    <div>
      <h1>姓名：{data.name}</h1>
      <p>年齡：{data.age}</p>
      <p>職業：{data.job}</p>
    </div>
  )}
</DataDisplay>
```
### Booleans, Null, 與 Undefined 會被忽略

`true`、`false`、`null`以及`undefined`都是有效的 children，但它們在渲染時會被 React 忽略並且不會產生任何DOM輸出。這種行為對於條件渲染非常有用，因為它允許在不生成額外 DOM 節點的情況下控制組件的顯示與隱藏。

```jsx title="當 condition 為 false 時，將不會渲染 <Component />"
{condition && <Component />}
```
:::info[文章內容參考來源：]
- [React深入JSX文件](https://zh-hant.legacy.reactjs.org/docs/jsx-in-depth.html)
:::