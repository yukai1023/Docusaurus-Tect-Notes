---
---

# Debounce & Throttle

## Debounce（去抖動）

`Debounce` 會在觸發事件後等待一定時間，如果在這段時間內再次觸發了事件，則重新計時。只有當等待時間結束後，才會執行事件處理函數。這對於減少不必要的函數調用非常有效，特別是在處理連續事件（如鍵盤輸入或窗口調整大小）時。

```js title="假設有一個搜索輸入框，每當用戶輸入文字時都會觸發搜索，這可能導致大量的搜索請求。使用 debounce 可以在用戶停止輸入一段時間後才觸發搜索。"
function debounce(func, delay) {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

// 使用 debounce
const handleSearch = debounce(() => {
  console.log('執行搜索');
}, 500);

// 綁定到輸入框的事件
// inputElement.addEventListener('input', handleSearch);
```

## Throttle（節流）

`Throttle` 會確保函數在一定時間內只被調用一次。即使在這段時間內多次觸發事件，函數也只會在每個時間間隔的開始或結束時執行一次。

```js title="假設正在監聽滾動事件來更新界面，這可能導致大量的函數調用。使用 throttle 可以限制這個函數的調用頻率。"
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// 使用 throttle
const handleScroll = throttle(() => {
  console.log('執行滾動處理');
}, 1000);

// 綁定到滾動事件
// window.addEventListener('scroll', handleScroll);
```


---
:::tip[彙整]

- **`Debounce`** 是等待靜默期後執行一次，適合那些不需要即時反饋的場景。
- **`Throttle`** 則保證在固定時間內至少執行一次，適合需要持續反饋的場景。

:::
