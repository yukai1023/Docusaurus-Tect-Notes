---
---

# Hook
在 React 中，Hook 是一種功能強大的新特性，它允許你在不編寫 `class` 的情況下使用 state 和其他 React 特性。自從 React 16.8 版本引入以來，Hook 成為了在 function component 中管理 state 和 side effects 的首選方式。

## 什麼是 Hook?
Hook 是 **function**，它允許 function component **“勾住”**（hook into）React 的**狀態管理**和**生命週期**功能。這裡的 **“勾住”** 指的是能夠直接訪問和操作這些核心功能，這在過去僅限於 class component。

- 訪問 React 狀態（State）：在 class component 中，你會使用 `this.state` 和 `this.setState` 來管理狀態。但在 function component 中，沒有 `this` 關鍵字，而是使用 `useState` 這個 Hook 管理自己的內部狀態。

- 利用生命週期功能：在 class component 中，生命週期方法（如 `componentDidMount`,   `componentDidUpdate`, `componentWillUnmount`）用於在組件的不同階段執行代碼。function component 中沒有這些生命週期方法，但 useEffect 這個 Hook 提供了類似的功能。

## Hook 的規則

### 只在最上層呼叫 Hook

**不要在迴圈、條件判斷或嵌套函式中調用 Hook**。這是為了確保 Hook 在每次組件渲染時都以相同的順序被調用，這對於 React 正確追踪 Hook 的狀態非常重要。

### 只在 React Function 中呼叫 Hook
**不要在普通的 JavaScript function 中調用 Hook**。如果你需要在一個自定義 function 中使用 Hook，那麼該 function 必須是一個自定義 Hook。

## 使用 State Hook

### 宣告一個 State 變數
```jsx
const [myState, setMyState] = useState(initialValue);
```
在這個範例中，`myState` 是你創建的 State 變數，`setMyState` 是是一個可以更新 state 的 function，用於更新 myState 的值。`initialValue` 是 myState 的初始值。


### 方括號代表什麼?
在 JavaScript 和 React 中，方括號 `[]` 主要有兩個用途：表示陣列和進行[解構賦值（Destructuring Assignment）](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E9%99%A3%E5%88%97%E8%A7%A3%E6%A7%8B)。


### Class Component 對比 Function Component
```jsx title="class component"
class Counter extends React.Component {
  // highlight-start
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  // highlight-end

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        {/* highlight-next-line */}
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
```jsx title="function component"
import React, { useState } from 'react';

function Counter() {
  {/* highlight-next-line */}
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* highlight-next-line */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 使用 Effect Hook

Effect Hook 讓你可以使用 function component 中的 side effect，指那些發生在組件渲染流程之外的操作。這些操作包括數據獲取、訂閱、手動更改 DOM，以及其他需要在組件加載和更新時執行的操作。

> **詳細可至另一篇文章 [useEffect](./useEffect) 查看。**

### Class Component 對比 Function Component
```jsx title="class component"
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  // highlight-start
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  // highlight-end
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

```jsx title="function component"
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  // highlight-start
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  // highlight-end
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 自定義 Hook
自定義 Hook 允許你將組件邏輯提取到可重用的 function 中。當你發現自己在不同組件中重複相同的邏輯時，這就是創建自己的 Hook 的好時機。

假設你需要在多個組件中使用計數器的邏輯，你可以創建一個 **`useCounter`** Hook：
```jsx
import React, { useState } from 'react';

// highlight-start
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return [count, increment, decrement, reset];
}
// highlight-end
```
你可以在任何函式組件中使用這個自定義 Hook：
```jsx
import React from 'react';
import useCounter from './useCounter'; // 假設 Hook 在這個路徑
function CounterComponent() {
  // highlight-next-line
  const [count, increment, decrement, reset] = useCounter(0);

  return (
    <div>
      <p>計數: {count}</p>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>減少</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```
### 必須以「use」開頭命名
以 「use」 開頭的命名規範幫助開發者快速識別一個函數是否是一個 Hook。並且 React 團隊提供了一個名為 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 的 ESLint 插件，這個插件依賴於命名規則來自動化檢測 Hook 的正確使用。

### 每個使用 Hook 的 component 都有其自己獨立的 state
每次使用 Hook ，不論是內建的 Hook (如 `useState` 或 `useEffect`) 或是自定義 Hook 時，都是在為當前 component 創建一個全新且獨立的 `state` 和 `effect`。
這也是為什麼可以在 **component 中多次調用同一個 Hook** 的原因。