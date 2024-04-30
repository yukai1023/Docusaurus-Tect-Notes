---
---

# 等比例寬高

## aspect-ratio

`aspect-ratio` 用於設置元素的寬高比，它允許你指定一個元素的寬度和高度之間的比例關係，而不需要設置寬度和高度的具體值。

```css title="可以是正整數或浮點數，並用斜線分隔"
aspect-ratio: width-value / height-value;
```

```css title="設置一個元素的寬高比為 16:9"
.element {
  aspect-ratio: 16 / 9;
}
```

:::warning[注意]
需要注意的是，`aspect-ratio` 屬性目前還是一個相對較新的 CSS 屬性，Chrome 從版本 88 開始支援（2021 年 1 月發布），各個瀏覽器對它的支援可能有所不同，可以參考 [`Can I use`](https://caniuse.com/?search=Aspect%20Ratio)。
:::

## padding-top / padding-bottom

當 `padding` 設置為百分比時，`padding-top` 和 `padding-bottom` 的值是根據元素的父元素的寬度 `width` 計算的，如果一個元素的的父元素寬度是 `300px`，那設置 `padding-top: 100%` 的值等於 `300px`，不管該元素自身的寬度是多少。

| 寬高比 | padding-bottom / padding-top |
|:--------:|:--------:|
| 1:1 (正方形) | 100% |
| 4:3 | 75% |
| 16:9 | 56.25% |

#### 範例

```html
<div class="container">
  <img src="https://test.png"></img>
</div>
```

```css
.container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* or padding-bottom */
}
img {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
}
```

:::info[文章內容參考來源：]

- MDN

:::