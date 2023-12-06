---
---

# Virtual DOM

<!-- <img src={require("./img/virtualDOM.png").default} style={{width:'70%'}} /> -->

## 什麼是DOM?
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

---
:::info[文章內容參考來源：]
- [React Hook API 參考文件](https://zh-hant.legacy.reactjs.org/docs/hooks-reference.html#useeffect)
:::