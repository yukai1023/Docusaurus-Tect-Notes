---
---

# Selectors & Combinators

## Selectors
Selectors（選擇器）定義:指定「網頁上的哪一些元素」起來做樣式設定。

<img src={require('./img/selector.png').default} style={{width:'50%'}} alt="selector"/>

### [Class selectors（類選擇器）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors)

「 **`.`** 」開頭，名稱可自訂，可有多個 class 屬性值，且同個 class 屬性值可同時套用多處。

```css
.navbar {
  color: #ffffff;
}

span.classy {
  background-color: Blue;
}
```

### [ID selectors（ID 選擇器）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors)

「 **`#`** 」開頭，名稱可自訂，ID屬性值只能套用一個地方，屬於獨一無二的屬性值，若在同個頁面中撰寫多次相同的 ID 名稱，將會造成語法錯誤。

```css
#demo {
  display: block;
}
```

### [Type selectors（類型選擇器）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors)

設定於HTML的標籤上，網頁上所有的標籤都會套用。

```css
span {
  color: white;
}
```

### [Universal selector（通用選擇器）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)

使用字元「 **`*`** 」，可以匹配任意類型的HTML元素，將樣式套用於全部元素標籤中。

```css
* {
  margin: 0px;
}
```

### [Attribute selectors（屬性選擇器）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)

針對有套用特定屬性的標籤做CSS設定。

```css title="存在 title 屬性的 <a> 元素"
a[title] {
  color: purple;
}
```

```css title="存在 href 屬性並且屬性值匹配 "https://example.org" 的 <a> 元素"
a[href="https://example.org"] {
  color: green;
}
```

```css title="存在 href 屬性並且屬性值包含 "example" 的 <a> 元素"
a[href*="example"] {
  font-size: 2em;
}
```

```css title="存在 href 屬性並且屬性结尾是 ".org" 的 <a> 元素"
a[href$=".org"] {
  font-style: italic;
}
```

```css title="存在 class 屬性并且屬性值包含以空格分隔的 "logo" 的 <a> 元素"
a[class~="logo"] {
  padding: 2px;
}
```

## Combinators

Combinators（組合器）是選擇器的一個部分，用於指定元素之間特定關係的一種語法，更精確地定位和選擇文檔中的元素。

### [Child combinator（子組合器）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator)

使用 **`>`** 區隔兩個元素時，表示在有父子關係的元素才會套用，並且元素之間不能再插入其它的元素，否則就不是父子關係了。

子選擇器是只選擇子元素，子元素的子元素的樣式並不受影響。

```css
div > span {
  color: Blue;
}
```

### [Descendant combinator（後代组合器）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator)

利用空白鍵區隔兩個元素，例如:`A B`，表示在 `A` 元素內的 `B` 元素才會套用。後代選擇器跟子選擇器相似，但是不要求元素是父子關係。

```css
div span {
  color: Blue;
}
```

### [Next-sibling combinator (同層相鄰组合器)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Next-sibling_combinator)

例如: `A + B` ，利用 **`+`** 區隔兩個元素，表示若 `A` 跟 `B` 如果在同一層，並且 `B` 為 `A` 的下一個元素時就會被套用 CSS。

```css
h1 + p {
  color: green;
}
```

### [Subsequent-sibling combinator (同層全體選擇器)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Subsequent-sibling_combinator)

`A ~ B`，用 **`~`** 區隔兩個元素，表示在與 `A` 同一層關係的 `B` 元素全部都會套用。

```css
p ~ span {
  color: red;
}
```