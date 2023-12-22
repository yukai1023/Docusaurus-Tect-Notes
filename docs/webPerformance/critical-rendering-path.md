---
---

# Critical Rendering Path

<img src={require('./img/criticalRenderingPath.png').default} alt="criticalRenderingPath"/>

Critical Rendering Path（關鍵渲染路徑），描述了從瀏覽器加載到渲染網頁到螢幕上的整個過程，這個過程中的每一步都對網頁的加載速度和性能有顯著影響。

## 解析 HTML 生成 DOM Tree
> **DOM 相關介紹可至另一篇文章 [Virtual DOM](../react/virtual-dom) 查看。**

瀏覽器發送請求（request）至伺服器要求取得網頁 HTML 檔案並開始解析，解析過程涉及將接收到的字節（Bytes）轉換成字符（Characters），然後進一步解析成標記（Tokens）和節點（Nodes），最終建立成 DOM Tree。

當瀏覽器遇到引用外部資源的標籤，它會發送請求來加載這些資源，如 `<link>` 、 `<script>` 、 `<img>` 等，當遇到 `<script>` 標籤時，它會立即停止 DOM 的建構，這是因為 JavaScript 可能會改變 DOM 的結構，所以瀏覽器需要等待 JavaScript 執行完畢才能繼續 DOM 的建構，這種行為被稱為「禁止剖析器」（parser blocking）。

### Preload Scanner

Preload Scanner（預加載掃描器）是一種瀏覽器的優化機制，即使在 JavaScript 請求和執行的過程中，瀏覽器仍然可以利用 Preload Scanner 機制來識別，並提前發起網路請求來加載其他資源。

:::warning[注意]
- Preload Scanner的行為可能會因瀏覽器而異，並且它是瀏覽器的內部機制，開發者無法直接控制。
- 開發者可以通過使用 [`<link rel="preload">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/preload) 標籤來明確指示瀏覽器預加載特定資源。
:::

## 解析 CSS 並建立 CSSOM
---
:::info[文章內容參考來源：]
- [HTML5 語意標籤](https://training.pada-x.com/docs/article.jsp?key=html5-semantic-elements)
- [快速了解HTML語意化標籤](https://medium.com/@changru.studio/%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3html%E8%AA%9E%E6%84%8F%E5%8C%96%E6%A8%99%E7%B1%A4-33dd8247d779)
- [[Day 2] HTML5 & Semantic HTML](https://ithelp.ithome.com.tw/articles/10190737)
:::