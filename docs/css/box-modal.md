---
---

# Box Modal

Box Model（盒子模型）是一個用於描述 HTML 元素在網頁佈局中所佔空間的概念。它將每個元素視為一個矩形的盒子，由四個部分組成：`content(內容區域)`、`padding(內邊距)`、`border(邊框)` 和 `margin(外邊距)`。

<img src={require('./img/box-modal/box-modal.webp').default} style={{margin:'0 auto 10px', display:'block'}} alt="selector"/>

想像一下，你有一個裝禮物的盒子，這個盒子就像是一個 HTML 元素，例如一個 `<div>`，盒子的內容就是禮物本身，相當於元素的實際內容，如文字、圖片等。

現在，你想要在禮物周圍添加一些填充物，使其在盒子內部有一些空間。這就是 `padding(內邊距)` 的作用。它是元素內容和邊框之間的空間。可以通過增加內邊距來擴大盒子的內部空間，使內容與邊框之間有一定的距離。

接下來，你可能想要為盒子添加一個邊框，使其看起來更加美觀。 `border(邊框)` 是圍繞元素內容和內邊距的一條線，可以設置邊框的寬度、樣式和顏色，以增強盒子的視覺效果。

最後，你可能希望在盒子與其他盒子之間保持一定的距離，以便它們不會緊貼在一起，這就是 `margin(外邊距)` 的作用，它是元素邊框和其他元素之間的空間，通過調整外邊距，可以控制盒子與其他元素之間的間距，以實現合適的佈局效果。

## [Box-Sizing](https://developer.mozilla.org/zh-TW/docs/Web/CSS/box-sizing)

當我們談論 CSS 中的盒子模型時，有一個重要的屬性叫做 `box-sizing`，它定義了元素的寬度和高度的計算方式，也就是說，它決定了 width 和 height 屬性究竟包含了哪些部分，常用的有兩個值：

- **`content-box`（預設值）**：`width` 和 `height` 只包括 `Content` 的尺寸。

- **`border-box`**：設定 `width` 和 `height` 包括 `Content`、 `Padding` 和 `Border` 的總和。

## [Margin Collapsing（邊界重疊）](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)

當一個 `Block` 的 `margin-bottom`（下邊界範圍）和一個 `Block` 的 `margin-top`（上邊界範圍）都有設定時只會留下最大那個，這種情況稱為 **Margin Collapsing（邊界重疊）**，而設定了 `float` 或絕對定位的元件並不會產生邊界重疊。

### 理解邊界重疊的原因

首先，邊距重疊並不是一個 bug ，而是 CSS 規範中故意定義的一種行為，早在 CSS1 時代，出於排版需求，就引入了這個特性。

在網頁排版中，我們經常會遇到一些連續的塊級元素，如幾個連續的段落 `<p>` 。一般而言，我們會給每個 `<p>` 元素設置一個 `margin-bottom` 作為段落間距，而第一個 `<p>` 元素因為處在頁面開頭，又會設置一個 `margin-top`，但試想如果沒有邊距重疊特性，那麼相鄰的兩個 `<p>` 元素之間的實際距離將是它們的 `margin-bottom` 和 `margin-top` 之和，這個距離並不是我們所需要的。

因此為了避免相鄰元素之間因為各自的 `margin` 而產生過大的間距，規定由通過較大的 `margin` 來決定間距。

### 三種情況會形成邊界重疊

1. 相鄰兄弟元素之間的邊界重疊

```html
<style>
  .box1 {
    margin-bottom: 20px;
    background-color: #f1f1f1;
  }
  .box2 {
    margin-top: 30px;
    background-color: #e1e1e1;
  }
</style>

<div class="box1">Box 1</div>
<div class="box2">Box 2</div>
```

在這個例子中，`.box1` 的 `margin-bottom` 為 20px，`.box2` 的 `margin-top` 為 30px，根據規則它們之間的 margin 會重疊，最終的間距為 30px（取較大值）。

2. 父元素與第一個 / 最後一個子元素之間的邊界重疊

```html
<style>
  .parent {
    margin-top: 20px;
    background-color: #f1f1f1;
  }
  .child {
    margin-top: 30px;
    background-color: #e1e1e1;
  }
</style>

<div class="parent">
  <div class="child">Child</div>
</div>
```

在這個例子中，`.parent` 的 `margin-top` 為 20px，.child 的 `margin-top` 為 30px，由於父元素與第一個子元素之間沒有分隔，它們的 `margin-top` 會重疊，最終的間距為 30px（取較大值）。

3. 空的塊級元素的邊界重疊

```html
<style>
  .empty {
    margin-top: 20px;
    margin-bottom: 30px;
  }
</style>

<div class="empty"></div>
```

在這個例子中，`.empty` 元素沒有任何 `border`、`padding`、`inline content`、`height` 或 `min-height`。它的 `margin-top` 為 20px，`margin-bottom` 為 30px。根據規則，它的 `margin-top` 和 `margin-bottom` 會重疊，最終的高度為 30px（取較大值）。

:::info[文章內容參考來源：]

- MDN

:::
