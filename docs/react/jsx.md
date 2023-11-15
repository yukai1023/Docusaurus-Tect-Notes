---
sidebar_position: 1
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

## 自定義 Component 必須由大寫字母開頭
### 小寫字母開頭的 Element
React 會將其視為普通的 HTML 或 SVG 標籤。在 JSX 被轉換成 JavaScript 時，這些元素會被轉換成對應的字串，傳遞給 `React.createElement` 函數：

- JSX 中的 `<div>` 會被轉換為 `React.createElement('div')`
- JSX 中的 `<span>` 會被轉換為 `React.createElement('span')`

### 大寫字母開頭的 Element
React 會將其視為自定義組件的引用。在這種情況下，JSX 會被轉換成以該組件為參數的 `React.createElement` 調用：

- 假設有個名為 `MyComponent` 的組件，那麼 `<MyComponent />` 會被轉換為 `React.createElement(MyComponent)`

## JSX 中的 Props
在 React 中，props 是不可變的，這意味著你不能在子組件內部更改 prop 的值。這是為了確保組件的純凈性和可預測性。如果需要根據 prop 的變化改變組件的行為，應該使用內部狀態（useState）或生命週期方法。

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