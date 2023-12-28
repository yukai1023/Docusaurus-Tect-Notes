---
---

# Hooks API
Hook 是 React 16.8 中增加的新功能。它讓你不必寫 class 就能使用 state 以及其他 React 的功能。

## useCallback
`useCallback` 用於記憶化（memoization）一個函式本身。

它接收一個函式和一個依賴數組，並返回這個函式的記憶化版本。

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
在 JavaScript 中，每次創建一個函式，它實際上是在記憶體中創建了一個新的 Object 。因此當一個函式作為 prop 傳遞給一個子組件，並且在父組件渲染時重新創建，即使函式的內部邏輯完全相同，但因為 React 在比較 props 和 state 來決定是否重新渲染組件時，使用的是 shallow compare ，所以子組件會因為記憶體地址改變而判斷 prop 發生了變化，從而導致子組件重新渲染。

使用 `useCallback` 它會返回之前創建的函式（即相同的記憶體地址）。

:::

## useMemo
`useMemo` 用於記憶化（memoization）一個函式的計算結果。

它接收一個產生值的函式和一個依賴數組。

```jsx title="只有當依賴發生變化時，才會重新計算"
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]); // 依賴數組
```

```jsx title="只會在組件首次渲染時計算一次值，之後的渲染都會重用這個值"
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), []); // 空依賴數組
```

```jsx title="如果沒有提供依賴數組，則每次組件渲染時重新計算值"
const memoizedValue = useMemo(() => computeExpensiveValue(a, b)); // 省略依賴數組
```

```jsx title="只有在依賴數組改變時才會重新計算"
import React, { useState, useMemo } from 'react';

function SumComponent() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  const sum = useMemo(() => {
    console.log('計算總和');
    return numbers.reduce((acc, cur) => acc + cur, 0);
  }, [numbers]);

  return (
    <div>
      <p>數組: {numbers.join(', ')}</p>
      <p>總和: {sum}</p>
      <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>
        新增數字
      </button>
    </div>
  );
}

export default SumComponent;
```

:::warning[注意]
- `useMemo` 能夠作為效能最佳化的手段，但 React 文檔明確指出可能會在必要時清除記憶化的值，例如為已離開螢幕的 component 釋放記憶體。
- 應該先撰寫不依賴於 `useMemo` 的代碼，然後再加入它來做效能最佳化。
:::

## useRef
`useRef` 用於在函式組件中獲取 DOM 元素的 reference 及保存跨渲染周期的可變數據，即使數據變化，也不會引起組件重新渲染。

它接收一個初始值，並返回一個包含 `.current` 屬性的 mutable ref 對象，`.current` 可保存任意類型值。

```jsx title="可以使用 domRef.current 來訪問 DOM 節點"
const domRef = useRef(null);
```

```jsx title="保存任意類型值"
const countRef = useRef(0);
const objRef = useRef({ key: 'value' });
```

```jsx title="值會在每次定時器觸發時增加，但並不會觸發組件的重新渲染"
import React, { useRef, useEffect } from 'react';

function TimerComponent() {
  const countRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current += 1;
      console.log(`Timer: ${countRef.current}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>查看控制台以看到計時器輸出。</div>;
}
```

```jsx title="聚焦輸入欄位"
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    if(inputEl.current) {
      inputEl.current.focus();
    }
  };

  return (
    <div>
      {/* 將 ref 物件賦值給想要參照的 DOM 元素 */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>按鈕</button>
    </div>
  );
}

export default TextInputWithFocusButton;
```

---
:::info[文章內容參考來源：]
[官網 Hooks API 參考](https://zh-hant.legacy.reactjs.org/docs/hooks-reference.html)
:::
