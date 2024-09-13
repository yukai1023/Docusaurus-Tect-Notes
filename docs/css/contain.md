---
---

# Contain

CSS 中的 contain 屬性用於提高渲染性能，通過將元素的內容與頁面的其餘部分隔離開來，這允許瀏覽器優化渲染和佈局計算。

## 網頁瀏覽器的渲染過程

網頁瀏覽器在呈現網頁時所執行的三個關鍵步驟:

1. **佈局計算**

    - 瀏覽器會精確計算頁面上每個元素的位置和尺寸。

    - 這個過程決定了各元素如何排列和互相影響。


2. **繪製(渲染)**

    - 將計算好的佈局轉化為視覺呈現。

    - 這個階段會將各種樣式、顏色、圖像等視覺元素繪製到螢幕上。


3. **重排(Reflow)和重繪(Repaint)**

    - 重排: 當頁面結構發生變化時，重新計算元素的幾何屬性。

    - 重繪: 更新元素的視覺樣式，而不改變其幾何特性。

    - 這兩個過程通常由使用者互動或動態內容更新觸發。


## CSS containment

可以將 CSS containment 想像成一種將網頁不同部分放入 Virtual Box 裡，這通過避免同時進行佈局、繪製、大小和樣式的計算，使網頁渲染更加高效。

CSS containment 的主要目標是通過在網站內創建獨立區域來提升網站性能。具有 contain 屬性的元素就像建築師，形成自成一體的區域，既不影響外部元素也不受外部元素影響。

這項創新引入了 contain 屬性，提供四個關鍵值：`layout`、`paint`、`size` 和 `style`。這些值可以根據需求相互組合使用，也可以使用兩個額外的標準關鍵字來實現兩種不同的組合，開發者可以使用這些值來指定網頁的部分區域，減少該區域內的變化對整個頁面的影響：

```css
contain: layout | size | paint | style | strict | content;
```

### Size Containment

**當一個元素設置 `contain: size`，會阻止該元素內部發生的任何變化（無論是內容變化還是子元素變化）影響其大小，也就是說，這提供了一種實現真正固定大小的方法**。


在性能和佈局穩定性方面具有多種優勢。首先，它降低了佈局計算的複雜性，讓瀏覽器更有效地確定元素在頁面上的位置。其次，它可以幫助防止佈局變化，當元素意外改變其大小時會發生佈局變化，導致頁面跳躍或重新排列。

雖然 Size Containment 聽起來非常有用，但在實際應用中，可能並不會經常使用它，因為現代網頁設計趨勢傾向於動態和響應式佈局，我們有許多方式來實現動態大小調整：

- 響應視口大小的單位： `vw`、`dvh`

- 相對於根字體大小的單位： `rem`

- 相對於當前字體大小的單位： `em`

#### 實際應用場景

考慮一個常見的情況：使用者與頁面元件互動，導致新的動態元件出現，這些新元件會佔用空間，這時我們就面臨一個選擇：

1. 允許元素（可能是整個頁面）重新佈局和改變？

2. 限制元素大小，防止重新佈局？

如果第二種選擇更適合需求的話，那麼 `contain: size` 可能會是一個很好的解決方案。

<iframe 
  height="500" 
  style={{width: '100%', border: '2px solid #ccc', borderRadius: '4px'}}
  scrolling="no" 
  title="contain: size" 
  src="https://codepen.io/tjmeeyyc-the-vuer/embed/NWZJgJZ?default-tab=css%2Cresult" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true"
>
  See the Pen <a href="https://codepen.io/tjmeeyyc-the-vuer/pen/NWZJgJZ">contain: size</a> by 吳玉凱 (<a href="https://codepen.io/tjmeeyyc-the-vuer">@tjmeeyyc-the-vuer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<iframe 
  height="500" 
  style={{width: '100%', border: '2px solid #ccc', borderRadius: '4px'}}
  scrolling="no" 
  title="contain: size 2" 
  src="https://codepen.io/tjmeeyyc-the-vuer/embed/LYKajPQ?default-tab=css%2Cresult" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true"
>
  See the Pen <a href="https://codepen.io/tjmeeyyc-the-vuer/pen/LYKajPQ">contain: size 2</a> by 吳玉凱 (<a href="https://codepen.io/tjmeeyyc-the-vuer">@tjmeeyyc-the-vuer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Paint Containment

**當一個元素設置 `contain: paint`，會將該元素的內容限制在其邊界內，並且不會在元素框外顯示或允許滾動到任何內容，這提供了一種有效的方法來控制元素的視覺呈現和性能優化。**

Paint Containment 的行為類似於 `overflow` 屬性，但有一些重要的區別：

1. `contain: paint` 更類似於 `overflow: clip`，而不是 `overflow: hidden`。（後者允許通過 JavaScript Scroll 事件等方法滾動到隱藏的內容或元素）。

2. Paint Containment 不僅裁剪內容，還創建新的 [Stacking Context（堆疊上下文）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)和 [Formatting Context（格式化上下文）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flow_layout/Introduction_to_formatting_contexts)。

如果想要不顯示元素超出範圍的內容，並且內容完全無法透過滾動，那麼使用 Paint Containment 會是個不錯的選擇，除此之外，瀏覽器還能藉由不渲染那些不在可視範圍內的元素，來減少運算負擔，進而提升整體效能。

#### 實際應用場景

<iframe 
  height="500" 
  style={{width: '100%', border: '2px solid #ccc', borderRadius: '4px'}}
  scrolling="no" 
  title="contain: paint" 
  src="https://codepen.io/tjmeeyyc-the-vuer/embed/GRbeXYK?default-tab=css%2Cresult" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true"
>
  See the Pen <a href="https://codepen.io/tjmeeyyc-the-vuer/pen/GRbeXYK">contain: paint</a> by 吳玉凱 (<a href="https://codepen.io/tjmeeyyc-the-vuer">@tjmeeyyc-the-vuer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<iframe 
  height="500" 
  style={{width: '100%', border: '2px solid #ccc', borderRadius: '4px'}}
  scrolling="no" 
  title="overflow: clip and contain: paint" 
  src="https://codepen.io/tjmeeyyc-the-vuer/embed/abgMara?default-tab=css%2Cresult" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true"
>
  See the Pen <a href="https://codepen.io/tjmeeyyc-the-vuer/pen/abgMara">overflow: clip and contain: paint</a> by 吳玉凱 (<a href="https://codepen.io/tjmeeyyc-the-vuer">@tjmeeyyc-the-vuer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Layout Containment

當一個元素設置 `contain: paint`，會將元素建立了一個邊界，將其內部佈局與外部影響隔離開來，反之亦然，形成其自己的 [Stacking Context（堆疊上下文）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)和 [Formatting Context（格式化上下文）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flow_layout/Introduction_to_formatting_contexts)。

在網頁設計中，佈局是一個核心概念，它決定了頁面元素和內容如何流動和排列，佈局一直是最複雜且工作量最大的部分。

而 CSS 為我們提供了豐富的工具來控制佈局，從基本的 `float` 和 `vertical-align` 等屬性，到更全面的佈局系統，如：`Grid Layout`、`Flexbox Layout`，這些讓我們能夠精確地在頁面上排列元素。

現代瀏覽器在處理這些複雜的佈局任務時已經有不錯的效率和速度，Layout Containment 則可以進一步優化這個過程。

#### 實際應用場景

<iframe 
  height="500" 
  style={{width: '100%', border: '2px solid #ccc', borderRadius: '4px'}}
  scrolling="no" 
  title="contain: layout" 
  src="https://codepen.io/tjmeeyyc-the-vuer/embed/oNrVQXz?default-tab=css%2Cresult" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true"
>
  See the Pen <a href="https://codepen.io/tjmeeyyc-the-vuer/pen/oNrVQXz">contain: layout</a> by 吳玉凱 (<a href="https://codepen.io/tjmeeyyc-the-vuer">@tjmeeyyc-the-vuer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<iframe 
  height="300" 
  style={{width: '100%', border: '2px solid #ccc', borderRadius: '4px'}}
  scrolling="no" 
  title="CSS Contain: Layout Containment" 
  src="https://codepen.io/tjmeeyyc-the-vuer/embed/QWXPqyp?default-tab=css%2Cresult" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true"
>
  See the Pen <a href="https://codepen.io/tjmeeyyc-the-vuer/pen/QWXPqyp">CSS Contain: Layout Containment</a> by 吳玉凱 (<a href="https://codepen.io/tjmeeyyc-the-vuer">@tjmeeyyc-the-vuer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Style Containment

Style Containment 主要用於處理 CSS 中的計數器和引用，作用是將元素限制在特定的區域內，當你在這個區域內使用計數器或引用時，它會重新開始計數或創建新的引用。
 
使用 `contain: style` 將確保由 [`counter-increment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-increment) 和 [`counter-set`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-set) 屬性所創建的新計數器的作用域被限制在此 DOM Tree 內。

#### 實際應用場景

<iframe 
  height="500" 
  style={{width: '100%', border: '2px solid #ccc', borderRadius: '4px'}}
  scrolling="no" 
  title="CSS style containment example" 
  src="https://codepen.io/tjmeeyyc-the-vuer/embed/GRbLMxZ?default-tab=css%2Cresult" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true"
>
  See the Pen <a href="https://codepen.io/tjmeeyyc-the-vuer/pen/GRbLMxZ">CSS style containment example</a> by 吳玉凱 (<a href="https://codepen.io/tjmeeyyc-the-vuer">@tjmeeyyc-the-vuer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Containment Shorthands

所有四個主要的 Containment 可以用各種組合方式結合使用，還可以使用幾個標準的簡寫值：

- **strict**：將所有 Containment 應用於元素，即 `layout`、`paint`、`style` 和 `size`，為元素提供了強大的隔離，適用於需要在渲染的所有方面進行優化的場景。

- **content**：將除了 `size` 以外的所有 Containment 應用於元素，這使瀏覽器能夠通過 `layout`、`paint` 和 `style` 計算來優化渲染，告訴瀏覽器元素的內容獨立於頁面的其餘部分，但元素本身可能不是。


```css
.contain-strict {
  /* contain: layout paint style size; */
  contain: strict; 
}

.contain-content {
  /* contain: layout paint style; */
  contain: content; 
}
```

### Layout Performance

1. `contain: content` 測試頁面 By LogRocket：
https://codepen.io/_rahul/pen/OJdwQGw

<img src={require('./img/contain/no-content-effect.png').default} style={{width:'50%'}} alt="selector"/>
(沒有使用 `contain: content`)
<img src={require('./img/contain/content-effect.png').default} style={{width:'50%'}} alt="selector"/>
(有使用 `contain: content`)


2. hidden elements 測試頁面 By LogRocket：
https://codepen.io/_rahul/pen/KKJxZma

<img src={require('./img/contain/no-strict-hidden-effect.png').default} style={{width:'50%'}} alt="selector"/>
(沒有使用 `contain: strict`)
<img src={require('./img/contain/strict-hidden-effect.png').default} style={{width:'50%'}} alt="selector"/>
(有使用 `contain: strict`)

## CSS Containment Browser Support

Can I use: [CSS property: contain](https://caniuse.com/?search=CSS%20property%3A%20contain)
:::tip[彙整：]
- `none`：這是默認值，指定元素沒有包含限制。

- `size`：元素的大小可以在不檢查其子元素的情況下計算。

- `layout`：元素外部的任何東西都不能影響其內部佈局，反之亦然。

- `paint`：元素的後代不會在其邊界外顯示。

- `style`：可能對不僅僅是元素及其後代產生影響的屬性不會逃脫包含元素。

- `strict`：這是最嚴格的包含級別。等同於 `contain: size layout paint style`。

- `content`：這個值等同於 `contain: layout paint style`。
:::
