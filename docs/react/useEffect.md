---
---

# useEffect
`useEffect` 是一個 React Hook，用於在函式組件中處理副作用（side effects），它允許開發者將組件與外部系統（例如 API 或數據庫）同步。使用它可以在組件狀態變化時執行操作（如發送 HTTP 請求），或者在外部系統變化時更新組件狀態。

## 基本概念
```jsx
useEffect(() => {
  // Side Effects Function

  return () => {
    // Cleanup Function (Optional)
  };
}, [Dependencies Array]);
```

- **`Side Effects Function`**：在 component render 到螢幕後執行，可以在這裡執行任何 side effects 操作。

- **`Dependencies Array`**：控制 side effects 執行的時機，當 array 中的 variable 改變時，side effects 會重新執行。

- **`Cleanup Function`**：side effects function 可以選擇性地返回一個 cleanup function，這個 function 會在 component 卸載前執行，用於清理 side effects（如取消訂閱或清除 Timer）。

## Effect 的時機
- **`延遲執行`**：**side effects 不會在 component rendering 階段同步執行**。會先完成 component rendering，並且將 component 的更新呈現到瀏覽器上，然後才執行 useEffect 中的 side effects。這種行為確保了不會阻塞瀏覽器的繪制過程，從而避免了可能的性能問題。

- **`在新的渲染前執行`**：在 component 進行下一次更新或 rendering 之前，**會先執行上一次 rendering 中設置的 useEffect 的 cleanup function（如果有的話）**，然後再執行新的 side effects function。這樣確保了每次 rendering 都是基於最新狀態的，並且前一次的 side effects 已經被適當地清理。

- **`刷新上一次的 effect`**：在進行任何新的 rendering 前，**會確保清理並執行上一輪的 side effects**。這個過程確保了 side effects 的狀態與 component 的 rendering 狀態保持同步。

## 有條件的觸發 Effect
可以透過指定 `dependencies array` 來實現有條件地觸發 effect，允許你指定當哪些值改變時應該重新執行 effect。
```jsx title="只有當 count 改變時才會觸發"
useEffect(() => {
  console.log(`Count has changed: ${count}`);
}, [count]);
```
```jsx title="如果不提供 dependencies array，effect 將在每次渲染後執行"
useEffect(() => {
  ...
});
```
```jsx title="如果提供一個空 array，effect 僅在組件掛載時執行一次"
useEffect(() => {
  ...
}, []);
```
:::warning[注意]

請確保該 array 包含了所有在該 component 中會隨時間而變的值（例如 props 和 state）以及在該 effect 所使用到的值。否則，程式碼將會引用先前 render 的舊變數。

:::

## 清除一個 effect
cleanup function 會在 **component 從 UI 被移除前執行**，來防止 memory leak。此外，如果 component render 了數次，在執行下一個 effect 前，上一個 effect 就已被清除。

```jsx title="component 被移除前，setTimeout 創建的計時器會被清除"
useEffect(() => {
  const timer = setTimeout(() => {
    ...
  }, 1000);

  return () => {
    clearTimeout(timer);
  };
}, []);
```

## useLayoutEffect

其功能和 `useEffect` 相似，但在執行時機上有所不同。 `useLayoutEffect` 主要用於處理 DOM 渲染後的同步操作，確保在瀏覽器進行 **重繪（repaints）** 之前執行。

### 差異比較

#### useEffect

- **異步執行**： `useEffect` 在 DOM 更新完成後異步執行，不會阻塞瀏覽器的重繪過程，因此不會影響到網頁的渲染速度。

- **用途**：適合用於那些不需要立即使用或修改 DOM 的操作，例如發送網路請求、設置事件監聽器或任何不會對用戶界面產生立即影響的操作。

- **避免阻塞**：由於其異步特性， `useEffect` 是一種避免阻塞瀏覽器渲染的好方法，特別是在進行重的計算或具有潛在延遲的操作時。

#### useLayoutEffect

- **同步執行**： `useLayoutEffect` 在 DOM 更新完成後，但在瀏覽器重繪之前同步執行，這意味著可以在瀏覽器進行下一次重繪前，同步讀取或修改 DOM 。

- **用途**：適合用於需要立即讀取或修改 DOM 的操作，例如測量 DOM 節點的尺寸或位置、執行 DOM 動畫等，它確保在瀏覽器下一次重繪前，所有 DOM 的變更都已經完成。

- **避免閃爍**：當 DOM 變更可能導致可見的布局變化或閃爍時，使用 `useLayoutEffect` 可以在用戶看到這些變化之前完成這些更新，從而避免不良的用戶體驗。

:::warning[注意]

由於 `useLayoutEffect` 在瀏覽器重繪前執行，在進行大量計算或有復雜邏輯時，可能會導致性能問題。

:::

```jsx title="範例"
import React, { useLayoutEffect, useRef, useState } from 'react';

function MeasureExample() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const ref = useRef();

    useLayoutEffect(() => {
      if (ref.current) {
        // 獲取DOM元素的尺寸
        const { width, height } = ref.current.getBoundingClientRect();
        setSize({ width, height });
      }
    }, []);

    return (
      <div>
        <div ref={ref}>這是一個要測量的元素</div>
        <p>元素尺寸：寬度 {size.width}px，高度 {size.height}px</p>
      </div>
    );
}
```
---

:::info[文章內容參考來源：]
- [React Hook API 參考文件](https://zh-hant.legacy.reactjs.org/docs/hooks-reference.html#useeffect)
:::