---
---
# Event Capturing and Bubbling

## 事件傳遞機制

JavaScript 是一種事件驅動（Event-driven）的程式語言，當瀏覽器載入網頁時，會立即讀取 JavaScript 事件相關的程式碼，但這些程式碼並不會立即執行，而是等待事件被觸發後才會進行對應的處理。事件的傳遞和處理是通過 DOM（Document Object Model）來實現的，當一個事件在 DOM Tree 中的某個元素上被觸發時，Event Propagation 可以分成三個階段：

1. **Capturing Phase（捕獲階段）**：事件由外而內傳遞到被觸發事件的元素。

2. **Target Phase（目標階段）**：事件抵達被觸發事件的元素。

3. **Bubbling Phase（冒泡階段）**：事件從該元素透過冒泡從內而外傳遞。

理解事件的傳遞順序對於正確處理事件至關重要，假設有一個 `ul` 元素，其中包含多個 `li` 元素，代表不同的項目，當點擊任何一個 `li` 元素時，實際上也點擊了 `ul` 元素，因為 `ul` 元素包含了所有的 `li` 元素，如果在 `ul` 和 `li` 元素上都添加了事件監聽器，那麼事件的執行順序就需要特別注意。

<img src={require("./img/capturing-bubbling/eventFlow.png").default} style={{width:'60%', margin: '20px auto', display: 'block' }} />
<p style={{ textAlign: 'center' }}>Image by [W3C](https://www.w3.org/)</p>

:::warning[注意]

- **事件傳遞順序為先捕獲，再冒泡**，在捕獲階段，事件從 DOM Tree 的根節點開始向下傳遞，直到到達觸發事件的目標元素。在冒泡階段，事件從目標元素開始向上傳遞，一直到達 DOM Tree 的根節點。
- **當事件傳遞到目標元素（target）本身時，捕獲和冒泡階段的區分並不適用**，事件會直接在目標元素上觸發對應的事件監聽器。

:::

## Capturing Phase（捕獲階段）

當事件發生時，事件首先從文檔的根節點（通常是document）開始，沿著 DOM Tree 向下傳遞，會依次經過目標元素的所有祖先元素，直到到達目標元素。

當使用 `addEventListener(event, handler)` 的時候，預設只會處理到目標階段和冒泡階段，如果想要監聽到捕獲階段的事件，那麼就必須在 `addEventListener` 中設置第三個參數為 `true`（預設是 `false`）。

```js
element.addEventListener(event, handler, true);
```

## Bubbling Phase（冒泡階段）

當事件到達目標元素後，事件會從目標元素開始，沿著 DOM Tree 向上傳遞，事件會依次經過目標元素的所有祖先元素，直到到達文檔的根節點。

<img src={require("./img/capturing-bubbling/bubbling.webp").default} style={{margin: '20px auto', display: 'block' }} />

#### 範例

```html title="假設有 3 層嵌套，且各自擁有一個點擊事件："
<form onClick="alert('form')">
  <div onClick="alert('div')">
    <p onClick="alert('p')">測試</p>
  </div>
</form>
```

點擊內部的 `<p>` 會首先運行 onClick 順序為：

1. 在該 target `<p>` 上的。

2. 外層 `<div>` 上的。

3. 外層 `<form>` 上的。

4. 以此類推，直到最後的 document 對象。

因此，將看到 3 個 alert：`p` → `div` → `form`。

## 取消事件傳遞

在事件傳遞的過程中，可以通過調用事件對象的 [`Event.stopPropagation()`](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/stopPropagation)、[`Event.stopImmediatePropagation()`](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/stopImmediatePropagation) 方法來阻止事件的進一步傳遞。

默認情況下，事件監聽器是在冒泡階段執行的，兩者的差異為當在一個元素上調用 `stopPropagation()` 時，它會阻止事件向上傳播到父元素，但不會影響該元素上的其他事件監聽器；而調用 `stopImmediatePropagation()` 不僅會阻止事件向上傳播，還會阻止該元素上的其他事件監聽器接收和處理事件。

---

:::info[文章內容參考來源：]

- MDN
- [瀏覽器事件：Event Bubbling, Event Capturing 及 Event Delegation](https://www.shubo.io/event-bubbling-event-capturing-event-delegation/#google_vignette)

:::
