---
---

# Virtual DOM


## 什麼是 DOM?
**DOM（文件物件模型，Document Object Model）** 是一種跨平台的、語言獨立的標準，用於表示和與 HTML 、 XML 和 SVG 文件互動。當瀏覽器加載一個網頁時，首先會解析 HTML 代碼，根據 HTML 標籤和文本建立一個 node tree（節點樹），這個 tree structure（樹狀結構）正是 DOM，它允許 CSS 來設定樣式與 JavaScript 讀取和修改網頁的結構和內容。

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

**Virtual DOM（虛擬文件物件模型）** 是一種編程概念，用於提升網頁應用的效能和效率。它是真實 DOM 的輕量級副本，存在於 memory 中的 JavaScript Object。當應用的狀態改變時，這些改變首先在虛擬 DOM 上進行，然後通過 **Diffing Algorithm（差異比演算法）** ，只將必要的改變應用到真實的 DOM 上，這種機制比起直接操作真實的 DOM 來說，有助於降低瀏覽器的 repaint（重繪）和 reflow（重排）次數。

<img src={require("./img/virtualDOM.png").default} style={{width:'100%'}} />

### Diffing Algorithm
每當網頁需要更新時，React 會創建一個新的 Virtual DOM ， Diffing Algorithm 會檢查這個新的 Virtual DOM 和上一次的有什麼不一樣。

這個比較過程從根節點開始，並遍歷整個樹結構。算法會檢查每個節點以及其子節點。如果發現了差異，例如 element 類型（tag）的變化、屬性的改變或 child element 的不同，這些差異會被記錄下來。在比較過程中，React 使用了一種稱為 **“keys”** 的機制來有效地比較列表中的元素，從而確保只有真正變化的元素被重新渲染。

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

## React Fiber

---
:::info[文章內容參考來源：]
- [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model)
- [React 渲染機制 - Virtual DOM 與 Diffing 演算法](https://medium.com/swf-lab/react-%E6%B8%B2%E6%9F%93%E6%A9%9F%E5%88%B6-virtual-dom-%E8%88%87-diffing-%E6%BC%94%E7%AE%97%E6%B3%95-fcf515ccbc59)
- [Virtual DOM](https://ithelp.ithome.com.tw/m/articles/10248434)
:::