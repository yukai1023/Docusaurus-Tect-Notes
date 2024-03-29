---
---

# Virtual DOM


## 什麼是 DOM?
**DOM（文件物件模型，Document Object Model）** 是一種樹狀資料結構，表示瀏覽器中的畫面結構。當瀏覽器加載一個網頁時，首先會解析 HTML 代碼，根據 HTML 標籤和文本建立一個 node tree，這個 tree structure 正是 DOM，它允許 CSS 來設定樣式與 JavaScript 讀取和修改網頁的結構和內容。

瀏覽器的渲染與 DOM 有密切連動關係，當對 DOM 進行任何操作時，瀏覽器將自動執行相關流程來重新繪製畫面，因此過多的 DOM 操作會導致網頁效能下降。


```html title="html範例"
<!DOCTYPE html>
<html>
  <head>
    <title>我的網頁</title>
  </head>
  <body>
    <h1 id="header">歡迎來到我的網頁</h1>
    <p>這是一段文本。</p>
    <button id="changeText">點擊改變文本</button>
  </body>
</html>
```

```js title="可以使用 JavaScript 和 DOM API 來動態地與這些元素互動"
document.getElementById("changeText").addEventListener("click", function() {
  document.querySelector("p").textContent = "文本已經被改變了！";
});
```

## 什麼是 Virtual DOM?

**Virtual DOM（虛擬文件物件模型）** 是一種程式設計概念，用於處理 UI 結構並提升效能。虛擬 DOM 並不是從實際的 DOM 複製過來的，而是創建新的虛擬結構來模擬實際的 DOM，是存在於 memory 中的 JavaScript Object。

當畫面需要更新時，會先產生新的 Virtual DOM 結構，接著通過 **Diffing Algorithm（差異比演算法）** 比較新舊 Virtual DOM 的結構差異，最終只將必要的改變應用到真實的 DOM 上，這種機制比起直接操作真實的 DOM 來說，有助於降低瀏覽器的 repaint（重繪）和 reflow（重排）次數，減少效能成本。

<img src={require('./img/virtual-dom/virtualDOM.png').default} alt="virtualDOM"/>

### Diffing Algorithm

這個結構比較過程會從根節點開始，並遍歷整個樹結構，算法會檢查每個節點以及其子節點。在比較過程中，React 使用了一種稱為 **“keys”** 的機制來有效地比較列表中的元素，從而確保只有真正變化的元素被重新渲染。

```jsx title="keys範例"
function UserList(props) {
  const users = props.users; // 假設 users 是數組對象，每個對象都有一個唯一的 id 屬性
  return (
    <ul>
      {users.map(user =>
        <li key={user.id}>{user.name}</li>
      )}
    </ul>
  );
}
```

當比對兩顆 tree 時，不同類型的 root element 會有不同的處理方式。

- **比對不同類型的 Element**：當在比對過程中發現兩個 root element 的類型不同，它會拆除原有的整個 DOM tree，並基於新的 Virtual DOM tree 重新建立 DOM。這種情況通常發生在 element 的類型（tag）完全變化時，例如從一個 `<a>` 標籤變成 `<img>`，或者從一個自定義的 `<Article>` 組件變成 `<Comment>` 組件。

- **比對同一類型的 DOM Element**：當比對的兩個元素是同一類型時，它會保留這個 DOM 節點，並只更新發生變化的屬性（attributes）。
```jsx title="只需要修改 DOM 節點上的 className"
<div className="before" />

<div className="after" />
```

### 渲染頁面的兩個階段
在 React 中，渲染過程指的是 React 處理組件的渲染邏輯，被分為兩個主要階段：

- **Reconciliation（調度階段）**：React 會根據組件的新 props 或 state 生成新的 Virtual DOM tree。然後通過 Diffing Algorithm 從而找出需要更新的元素，這些變化會被放入一個更新隊列中，等待後續處理。

- **Commit（渲染階段）**：一旦確定了所有的更新，React 進入 Commit。在這個階段，React 會遍歷之前在調度階段收集的更新隊列，並實際應用這些變化到真實的 DOM 上。這包括執行組件的生命週期方法、添加或刪除 DOM 節點等。Commit 是對用戶界面的實際更新，並且一旦開始，就不會中斷，直到所有的更新都應用到 DOM 上。

---
:::info[文章內容參考來源：]
- [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model)
- [React 渲染機制 - Virtual DOM 與 Diffing 演算法](https://medium.com/swf-lab/react-%E6%B8%B2%E6%9F%93%E6%A9%9F%E5%88%B6-virtual-dom-%E8%88%87-diffing-%E6%BC%94%E7%AE%97%E6%B3%95-fcf515ccbc59)
- [Virtual DOM](https://ithelp.ithome.com.tw/m/articles/10248434)
- [Reconciliation (React 效能調整)](https://hackmd.io/@cckai/BklHB9Ru-F)
:::