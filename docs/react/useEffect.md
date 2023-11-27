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

---
:::info[文章內容參考來源：]
- [React Hook API 參考文件](https://zh-hant.legacy.reactjs.org/docs/hooks-reference.html#useeffect)
:::