---
---

# Semantic Elements

在 HTML 4.01 中有提供一些元素是具有語意性的，例如 `<form>` 、 `<table>` 、 `<img>` 。

在 HTML 5 的最新規格中，提供了更多語意性元素，包括 `<header>` 、 `<nav>` 、 `<main>` 、 `<footer>` 、 `<mark>` 、 `<time>` 等等。

## 什麼是語意標籤？
語意標籤和 `<div>` 、 `<span>` 在排版上具有完全一樣的特性，以下幾對 HTML 標籤在版面顯示上是完全相同的：

```html
<div>Hello</div>
<header>Hello</header>
<main>Hello</main>
<footer>Hello</footer>
```

那為什麼要使用語意標籤呢？目的是為了讓標籤（Tag）更具意義，以加強文件的結構化，讓搜尋引擎及其他軟體工具更清楚了解，網頁中每個區塊的設計目的，提升網頁生態圈的資訊交流，更便於分享、查詢，因此，也有增強網頁 SEO（Search Engine Optimization） 的效果。而對眼睛不方便的人， 他們會用聲音來聽網頁， 那有 semantic html 會對他們來說會更有幫助。

## 經常使用的標籤

### [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header)

用來表示區塊標題的區塊元素，這個區塊可以是一整個頁面、一個段落或一篇文章，可以把它當成一個放置介紹內容的容器，通常放置網站標題。

- 一個頁面中可以有多個 `<header>` 。
- `<header>` 為容器，但是裡面裝的東西應該只有區塊的標題或者摘要。
- `<header>` 不能放在 `<footer>` 、 `<address>` 或另一個 `<header>` 裡面。
- 在 `<body>` 內，它表示網頁的頁首，在 `<article>` 或 `<section>` 內，則可以表示文章或區塊內的首要區塊。

### [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav)

網頁的選單、導覽。只要是在網站內的導航區塊，都適合使用 `<nav>` 標籤。

- 不是所有的文件連結都需要在 `<nav>` 元素裡面，它僅適用於主要的導航鏈接塊。一般來說 `<footer>` 常常有一個不需要在 `<nav>` 裡面的的鏈接列表。
- 文件可以有很多個 `<nav>` 元素。例如說，一個用做網站導覽、另一個用做頁內導覽。

```html
<nav>
  <ul>
    <li><a href="#home">首頁</a></li>
    <li><a href="#news">新聞</a></li>
    <li><a href="#contact">聯絡我們</a></li>
    <li><a href="#about">關於我們</a></li>
  </ul>
</nav>
```

### [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main)
用來放置頁面主要資訊的區塊，展現頁面內容的獨特性。每個頁面只能有一個 `<main>` 標籤，且理想狀態下，不能被放在 `<nav>` 、 `<article>` 、 `<aside>` 、 `<footer>` 和 `<header>` 內。

```html
<main>
  <article>
    <h2>文章標題</h2>
    <p>這是文章的主要內容。它可以包含多個段落、圖片、視頻等。</p>
  </article>

  <article>
    <h2>另一篇文章的標題</h2>
    <p>這是另一篇文章的內容。每篇文章都應該包含獨特且相關的信息。</p>
  </article>
</main>
```

### [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section)
文件中的一個專題群組或區塊。

- 一般來說，裡面都會包含heading。
- 如果這個區塊的內容可以分成幾個部分的話，那應該使用 `<article>`。
- 使用 `<section>` 的地方像是文章中的章節，一個標籤式對話框中的各個標籤頁面，或論文的編號部分。一個網站的主業通常可以分成幾個section，像是introduction，news items還有contact information。
- 不要把 `<section>` 當成 `<div>` 用， `<section>` 內裝的應該是有意義且附帶標題的一段內容。例如這樣：

```html
<section>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</section>
```

### [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article)
一個獨立的區塊，這可以是一篇博客文章、一個論壇帖子、一個用戶評論、一個互動小部件、或者任何其他獨立的內容項目，同樣必須帶有heading。

`<article>` 跟 `<section>` 的區分是:

- `<article>` 有更高的獨立性及完整性，本身就算脫離了整體也是一個可以獨立存在、具有完整內容的區塊。
- `<section>` 雖然也具有獨立表達內容的能力，但是對外層有一定的相依性。
- `<article>` 可以有很多個 `<section>` ，也可以是 `<section>` 有很多 `<article>` ，取決於內容。

```html
<article>
  <header>
    <h1>我的第一篇博客文章</h1>
    <p>發布於：2023年4月1日</p>
  </header>

  <p>這裡是文章的開頭。這個段落介紹了文章的主要主題。</p>

  <section>
    <h2>小節標題</h2>
    <p>這是文章的一個小節，它有自己的小節標題。</p>
  </section>

  <section>
    <h2>另一個小節標題</h2>
    <p>這是另一個小節，繼續談論和展開主題。</p>
  </section>

</article>
```

### [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside)

語意算是跟主要區塊內容無關的區塊，也就是額外資訊，像是側邊欄、廣告、其他連結、推薦文章等都蠻適合使用的，不一定是側邊位置才能使用。

- 如果一段文字是網頁的主要部分，就不要用 `<aside>` 標籤來包裹它，因為 `<aside>` 是用來標記跟主內容相關但不是最重要的資訊。

```html
<main>
  <h1>文章標題</h1>
  <p>這裡是文章的主要內容。</p>
</main>

<aside>
  <h2>相關文章</h2>
  <ul>
    <li><a href="#">相關主題一</a></li>
    <li><a href="#">相關主題二</a></li>
    <li><a href="#">相關主題三</a></li>
  </ul>
</aside>
```

### [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer)

用來定義一個頁尾或結尾區塊，常見的 `<footer>` 是網頁最下面的頁尾區塊會包含作者、版權、聯絡方式等資訊。

- 一個網頁中除了可以有主要的網頁頁尾(page footer)區塊， `<article>` 、 `<section>` 、 `<aside>` 、 `<nav>` 這些 HTML 語意區塊中都可以有自己 `<footer>` 。

```html
<footer>
  <p>版權所有 &copy; 2023 我的網站名稱</p>
  <ul>
    <li><a href="#">隱私政策</a></li>
    <li><a href="#">使用條款</a></li>
    <li><a href="#">關於我們</a></li>
  </ul>
</footer>
```

### [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure)
是一個有完整內容的區塊，是主要內容的一部分，可以任意移動位置而不影響整體內容的表達。

- 把每個 `<img>` 都包上 `<figure>` ，這完全沒有意義。
- 簡單的判斷方式是，把 `<figure>` 拿掉會不會影響到上下文的閱讀？如果會的話，那就絕對不該是一個 `<figure>` 。

`<figure>` 不是只拿來包圖片的，他可以包含影音檔、圖表（可能是 canvas 或是 svg ）或是一段 code 。他跟 `<aside>` 的差別在於：

- `<aside>` 和主內容有關，但不是主內容的一部分。
- `<figure>` 是主內容的一部分，但是他可以任意移動或刪除而不影響主內容的表達。

通常 `<figure>` 會搭配 [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption) ，用來提供對圖片的描述或說明，這對於提高網頁的無障礙性和SEO非常有幫助，他放在第一個或最後一個子元素，例如：
```html
<figure>
  <img src="image.jpg" alt="描述圖片內容">
  <figcaption>這是圖片的說明文字。</figcaption>
</figure>
```

## 其他

- `<time>` ：表示日期時間。
- `<mark>`：如黃色螢光筆的方式畫出重點，強調一小塊內容。
- `<details>`：描述文章的細節。
- `<dialog>`：用於標記對話框或交互式窗口，可以是模態或非模態形式。
- `<hgroup>`：當內容有主標題及次標題等多個標題的狀況下使用。
- `<cite>`：引用其他文獻或作品（例如書籍、歌曲、電影、繪畫、雕塑等）的標題。
- `<abbr>`：用於標記縮寫或首字母縮略詞。通過提供 title 屬性，可以顯示完整形式，以增強可讀性和無障礙性。
- `<address>`：用於標記聯絡信息，如郵件地址、社交媒體鏈接或物理地址。
- `<dfn>` (Definition Element)：用於標記詞語的定義或解釋，常與 `<dl>` (定義列表) 元素一起使用。
- `<kbd>`：用於表示鍵盤輸入，常用於指導文檔或技術文章中。
- `<samp>`：用於表示程式或系統的樣本輸出。
- `<ruby>` 、 `<rt>` 、 `<rp>`：這些元素用於標記東亞文字的注音或注解，如日文的振假名或中文的注音符號。
-  `<progress>` 、 `<meter>`：這些元素分別用於顯示任務的進度（如文件上傳進度）和表示範圍內的數量（如磁盤空間使用）。

---
:::info[文章內容參考來源：]
- [HTML5 語意標籤](https://training.pada-x.com/docs/article.jsp?key=html5-semantic-elements)
- [快速了解HTML語意化標籤](https://medium.com/@changru.studio/%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3html%E8%AA%9E%E6%84%8F%E5%8C%96%E6%A8%99%E7%B1%A4-33dd8247d779)
- [[Day 2] HTML5 & Semantic HTML](https://ithelp.ithome.com.tw/articles/10190737)
:::