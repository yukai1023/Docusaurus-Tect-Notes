---
---

# Hooks API
Hook 是 React 16.8 中增加的新功能。它讓你不必寫 class 就能使用 state 以及其他 React 的功能。

## useCallback
`useCallback` 的主要用途是對 function 進行 memoization（記憶化）。

> useCallback: 記憶化的是函式本身。  
> useMemo: 記憶化的是函式執行的結果。


```jsx title="只有當依賴發生變化時，函式才會被重新創建"
const memoizedCallback = useCallback(
  () => {
    // 回調函數邏輯
  },
  [dependencies], // 依賴數組
);
```

```jsx title="只會在組件首次渲染時創建函式，在之後的渲染中函式不會改變"
const memoizedCallback = useCallback(
  () => {
    // 回調函數邏輯
  },
  [], // 空依賴數組
);
```

```jsx title="如果沒有提供依賴數組，則每次組件渲染時都會重新創建函式"
const memoizedCallback = useCallback(
  () => {
    // 回調函數邏輯
  } // 省略依賴數組
);
```

```jsx title="即使父組件重新渲染，子組件也不會重新渲染"
import React, { useState, useCallback } from 'react';

// 使用 React.memo 創建一個記憶化的子組件 MyButton
const MyButton = React.memo(({ onClick }) => {
  console.log('MyButton 重新渲染');
  return <button onClick={onClick}>點擊我</button>;
});

// 父組件
function MyComponent() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 來儲存 increment 函式
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // 將 increment 函式作為 onClick prop 傳遞給 MyButton
  return (
    <div>
      Count: {count}
      <MyButton onClick={increment} />
    </div>
  );
}
```

:::warning[注意]
在 JavaScript 中，每次創建一個函式，它實際上是在記憶體中創建了一個新的 Object 。因此當一個函式作為 prop 傳遞給一個子組件，並且在父組件渲染時重新創建，即使函式的內部邏輯完全相同，子組件會因為記憶體地址改變而判斷 prop 發生了變化，從而導致子組件重新渲染。

使用 `useCallback` 它會返回之前創建的函式（即相同的記憶體地址）。

:::

---
:::info[文章內容參考來源：]
[官網 Hooks API 參考](https://zh-hant.legacy.reactjs.org/docs/hooks-reference.html)
:::
