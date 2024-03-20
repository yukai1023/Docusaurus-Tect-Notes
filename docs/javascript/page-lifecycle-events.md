---
---

# Page Lifecycle Events

## [DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event)

`DOMContentLoaded` 是一個 JavaScript 事件，它會在當前 HTML 文件被完全加載和解析後觸發，而無需等待外部資源(如圖片、樣式表等)的加載完成。這意味著當 `DOMContentLoaded` 事件被觸發時，整個 HTML 文檔的 DOM Tree 已經構建完成，可以安全地進行 DOM 操作。

### 與 [load](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event) 事件的區別

`load`（window.onload）事件會在頁面上的所有資源(包括圖片、樣式表等)都加載完成後才觸發，因此，`DOMContentLoaded` 事件通常比 `load` 事件更早觸發。

```js
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded 事件觸發');
});

window.addEventListener('load', function() {
  console.log('load 事件觸發');
});
```


在 [`document.readyState`](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/readyState) 屬性中也能證明區別。此屬性能描述文件的讀取狀態，它有三個可能的值:

- **loading**：表示文檔正在加載和解析中，DOM Tree 還在構建過程中。

- **interactive**：表示文檔已經完成加載和解析，DOM Tree 已經構建完成，但一些外部資源可能仍在加載中，這個狀態表示 `DOMContentLoaded` 事件已經被觸發。

- **complete**：表示文檔及其所有依賴資源都已經完全加載完畢，這個狀態表示 `load` 事件即將被觸發。

而有另一個事件 [`document.readystatechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readystatechange_event) 可以當 `readyState` 屬性發生變化時觸發，用來追蹤文檔的加載進度。

```js
document.addEventListener('readystatechange', function() {
  switch (document.readyState) {
    case 'loading':
      console.log('文檔正在加載中...');
      break;
    case 'interactive':
      console.log('文檔已經完成加載和解析,但外部資源可能仍在加載...');
      break;
    case 'complete':
      console.log('文檔及其所有資源已經完全加載完畢!');
      break;
  }
});
```

## [beforeunload](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeunload_event)

`beforeunload`（window.onbeforeunload）事件是在用戶嘗試離開當前頁面時觸發的事件，它允許開發者在頁面卸載之前執行一些操作，例如保存用戶的未提交數據或向用戶顯示確認消息。

以下是可能觸發 `beforeunload` 事件的情況：

- 點擊瀏覽器的關閉按鈕。

- 在地址欄輸入新的 URL 並轉導到另一個頁面。

- 點擊瀏覽器的後退或前進按鈕。

- 在頁面上進行表單提交或鏈接點擊，使頁面轉導。

```js title="示例"
window.addEventListener('beforeunload', function (event) {
  event.preventDefault(); // 取消事件的默認行為
  event.returnValue = '您確定要離開此頁面嗎?'; // 顯示瀏覽器的確認消息
});
```

但在大多數瀏覽器中，上述代碼將僅顯示瀏覽器的默認確認消息，而不會顯示我們設置的自定義消息，這是為了防止網站濫用確認消息來阻止用戶離開頁面。

## [pagehide](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pagehide_event)

`pagehide`（window.onpagehide）事件是用於在頁面實際離開時執行一些操作，例如當瀏覽器從當前頁面導航到其他頁面時，就會觸發該事件，它類似於即將逐步淘汰的 [`unload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unload_event) 事件。

`pagehide` 事件的事件對象包含一個名為 `persisted` 的 `Boolean` 類型屬性：

- 當 `persisted` 的值為 `true` 時，表示頁面將被存儲在瀏覽器的緩存中，可以通過瀏覽器的前進 / 後退按鈕快速還原。

- 當 `persisted` 的值為 `false` 時，表示頁面將被完全卸載，不會存儲在瀏覽器的緩存中。

```js
window.addEventListener('pagehide', function(event) {
  // event.persisted 屬性是由瀏覽器提供
  if (event.persisted) {
    // 在這裡可以保存用戶的數據或狀態
    // highlight-next-line
    localStorage.setItem('userData', JSON.stringify(userData));
  } else {
    // 在這裡可以執行一些清理操作
    // highlight-next-line
    localStorage.removeItem('userData');
  }
});
```

## [pageshow](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pageshow_event)

`pageshow` 事件是當頁面加載完成並顯示給用戶時會觸發該事件，例如頁面首次加載。它與 `load` 事件類似，但 `pageshow` 事件在頁面從瀏覽器緩存中恢復時也會觸發，`load` 事件則不會。

與 `pagehide` 事件一樣，包含一個名為 persisted 的 Boolean 類型屬性：

- 當 `persisted` 的值為 `true` 時，表示頁面是從瀏覽器的緩存中恢復的，無需重新加載。

- 當 `persisted` 的值為 `false` 時，表示頁面是首次加載或重新加載的。

```js
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    // 在這裡可以恢復用戶的滾動位置或之前的狀態
    // highlight-next-line
    window.scrollTo(0, localStorage.getItem('scrollPosition'));
  } else {
    // 在這裡可以執行一些初始化操作
    // highlight-next-line
    localStorage.removeItem('scrollPosition');
  }
});
```

## [visibilitychange](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

`visibilitychange` 檢測頁面的可見性狀態變化，並在狀態變化時執行相應的操作，例如用戶切換到其他標籤頁或最小化瀏覽器窗口，當用戶切換回頁面時，可以恢復之前的狀態，如視頻播放進度、表單輸入等。

[`document.visibilityState`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilityState) 屬性允許開發者獲取當前頁面的可見性狀態。它有三個可能的值:

- **visible**：頁面在前台，對用戶可見。

- **hidden**：頁面在後台，對用戶不可見，通常發生在用戶切換到其他標籤頁、最小化瀏覽器窗口或切換到其他應用程序時。

- **prerender**：頁面正在預渲染，對用戶不可見，通常發生在瀏覽器為了加速頁面加載而預先渲染頁面時。

``` js
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    console.log('頁面變為可見狀態');
  } else {
    console.log('頁面變為不可見狀態');
  }
});
```

---
:::info[文章內容參考來源：]
- MDN
:::