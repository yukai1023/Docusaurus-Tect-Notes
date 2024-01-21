---
---

# Critical Rendering Path

<img src={require('./img/critical-rendering-path/criticalRenderingPath.png').default} alt="criticalRenderingPath"/>

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

當瀏覽器加載並解析 CSS 時，它會建立一個稱為 CSSOM（CSS Object Model）的樹狀結構，反映了 CSS 中各個樣式規則的繼承和層疊關係，並且是根據選擇器的關係建立的，而不是根據 HTML 文件的結構。

在 CSSOM 建立完成之前， JavaScript 無法正確執行， 除非以 async 方式加載，或在其之前執行。

```css
span {
  color: white;
}

div {
  background: red;
}

div p {
  font-size: 24px;
}

img {
  width: 300px;
}
```

<img src={require('./img/critical-rendering-path/CSSOM.png').default} alt="CSSOM"/>

## 建立 Render Tree

對於 DOM 元素，瀏覽器會計算其最終的樣式，這個過程會涉及到解析 CSSOM Tree 中的相關規則，決定了元素的尺寸、顏色、位置等屬性，一但所有可見元素的樣式計算完成，就會將這些信息與 DOM Tree 結合，形成 Render Tree。

Render Tree 只包含可見的 DOM 元素，那些不會影響渲染的元素將被移除（例如，設置了 `display: none` ）。而使用 `visibility: hidden;` 、 `opacity: 0;` 或 `height: 0;` 的元素仍會出現在 Render Tree 中，因為它們依然佔有空間並影響布局。


### Render Blocking

HTML 和 CSS 都是會影響 Render Tree Resource， 因此在 DOM 及 CSSOM 建構完成之前，瀏覽器不會建立 Render Tree ， 這種情況被稱為 Render Blocking 。

## 產生 Layout

在 Layout（佈局）階段，瀏覽器計算 Render Tree 中每個節點的確切大小和在頁面上的位置，這包括確定元素的 `width` 、 `height` 、 `margin` 、 `border` 、 `padding` 等等其他相關的屬性。

任何影響 Render Tree 中元素尺寸和位置的更改都會觸發重新佈局，這在瀏覽器中被稱為 Reflow（回流）。

## 產生 Painting

在 Painting（繪製）階段，瀏覽器將佈局階段計算出的元素轉換為屏幕上的實際像素，這包括處理顏色、圖像、邊框、陰影、文字等視覺效果，瀏覽器通常會對複雜的元素進行分層處理，每個層獨立繪製，最後這些層會被 Compositing（合成）到一起，形成最終的頁面。

當元素的樣式發生變化，但不影響其佈局時，比如改變元素的背景顏色，就會觸發 Repaint（重繪）。

---
:::info[文章內容參考來源：]
- MDN
- [淺談關鍵渲染路徑(Critical Rendering Path)](https://medium.com/@eileen19930207/%E6%B7%BA%E8%AB%87%E9%97%9C%E9%8D%B5%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%91-critical-rendering-path-part-1-6c67d40ccafc)
- [關鍵轉譯路徑](https://jackblackevo.github.io/2017/03/31/critical-rendering-path.html)
:::