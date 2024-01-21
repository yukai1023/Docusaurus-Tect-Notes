---
title: XSS
---

# XSS（Cross-Site Scripting，跨站腳本攻擊）

XSS 是一種網路安全漏洞，攻擊者將惡意腳本注入到正常的網頁中，當其他用戶瀏覽這些被篡改的網頁時，這些腳本就會在他們的瀏覽器中執行。

為什麼稱之為「Cross-Site（跨站）」呢？這是因為攻擊行為往往發生在用戶與信任網站間的交互過程中，並非直接來自攻擊者的網站，這種從信任來源發出的攻擊能夠繞過瀏覽器的 **Same-origin policy（同源政策）**。

> 在另一篇筆記 [**CORS**](./cors#同源政策same-origin-policy) 有提及 **Same-origin policy（同源政策）**。

這些腳本可以在其他用戶的瀏覽器上自動執行，從而導致一系列安全問題，包括竊取敏感資料如 Cookies 和 Session Token、重新導向至惡意內容的網站、篡改網頁內容、在瀏覽器上執行惡意操作等等。

## XSS 攻擊類型

XSS 攻擊主要分為三種類型，每種都有其特定的攻擊方式和防禦策略。

### Stored XSS / Persistent XSS

Stored XSS（儲存型 XSS），在沒有適當安全防護的情況下，攻擊者利用像文章、評論區或個人資料欄位這樣的用戶輸入區域來存儲惡意腳本到後端資料庫，當其他用戶瀏覽這些包含惡意腳本的頁面時，這些腳本會與正常內容一同被加載並在用戶的瀏覽器上自動執行。

<img src={require("./img/storedXSS.png").default} />

#### 範例

假設有一個網站允許用戶在評論區發表評論，並且這些評論會被儲存在服務器的數據庫中，然後在其他用戶瀏覽該頁面時顯示出來。

```html title="攻擊者在輸入框中輸入 JavaScript 代碼"
<script>alert('這是一個 Stored XSS 攻擊！')</script>
```

如果網站未對用戶輸入進行檢查過濾，這段腳本將被儲存資料庫中，當其他用戶訪問含有這則評論的頁面時，這段惡意腳本將在他們的瀏覽器上執行，導致彈出一個警告框。

### Reflected XSS

Reflected XSS（反射型 XSS），這種攻擊通過將惡意代碼藏在 URL，然後誘使用戶點擊或訪問，當用戶進行加載後，網站會將惡意腳本作為用戶輸入的一部分處理並返回給瀏覽器，導致該腳本在瀏覽器上自動執行。

<img src={require("./img/reflectedXSS.png").default} />

#### 範例

假設有一個網站允許使用者透過 URL 的查詢參數來搜索內容，例如 URL 可能看起來像這樣：

```
https://example.com/search?query=使用者輸入
```

攻擊者可以創建一個包含惡意 JavaScript 代碼的 URL，如：

```
https://example.com/search?query=<script>alert('這是一個 Reflected XSS 攻擊！')</script>
```

網站會將這段惡意腳本作為正常內容來處理和顯示，這段腳本隨即在使用者的瀏覽器中執行，導致彈出一個警告框。

:::warning[注意]

- 攻擊者經常會使用 URL 編碼（URL encoding）或短網址服務來掩飾惡意 URL，使其看起來不那麼明顯或可疑。
- 在一些情況下，攻擊者可能會利用存在 XSS 漏洞的第三方服務（例如廣告或小工具）來發起攻擊。
:::

### DOM Based XSS

DOM Based XSS（DOM基礎型XSS），與 Reflect XSS 非常類似，但此類型完全在客戶端執行，不涉及到伺服器端的腳本處理。攻擊主要發生在網站未檢查輸入的資料，並直接用於 DOM 操作，由於 JavaScript 能夠動態地修改網頁的DOM，惡意腳本也就能夠以這種方式改變網頁內容和行為。

<img src={require("./img/domBasedXSS.png").default} />

#### 範例

假設網頁上有一個文本框，允許用戶輸入一些文本，網站的 JavaScript 將讀取這個文本框的值，並將其直接賦值給某個元素的 innerHTML：

```js
document.getElementById('output').innerHTML = document.getElementById('userInput').value;
```

如果用戶在文本框中輸入普通文本，它將正常顯示，但如果用戶輸入的是一段 HTML 或 JavaScript 代碼，例如：

```js
<script>alert('這是一個 DOM Based XSS 攻擊！');</script>
```

網站會將這段惡意腳本作為正常內容來處理和顯示，這段腳本隨即在使用者的瀏覽器中執行，導致彈出一個警告框。

## 如何防範 XSS 攻擊？

### 使用 [CSP (Content Security Policy)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

CSP（內容安全策略，Content Security Policy）是一種安全標準，後端透過設置 HTTP Header 中特定的指令，如白名單機制般允許網站管理哪些外部資源可以被加載和執行，像是可以指定只允許加載來自特定 `domain` 的腳本，或者禁止加載任何外部圖像。

<img src={require('./img/CSP.png').default} alt="Access-Control-Allow-Origin" style={{ width: '50%', margin: '20px auto', display: 'block', boxShadow: '0 0 0 1px' }} />

假設你想設置一個政策，僅允許從自己的域名加載腳本和樣式，同時阻止所有的圖片加載，可以在 HTTP 頭部中設置：

```
Content-Security-Policy:
  default-src 'none';
  script-src 'self';
  style-src 'self';
  img-src example.com;
```

### 輸入驗證與過濾

對所有用戶輸入進行嚴格的驗證，這包括過濾或轉義特殊字符，如 `<` 、 `>` 、 `&` 、 `'` 、 `"` 等，以避免它們在HTML中被解釋為代碼，防止 `<script>`、 `onerror` 、 `onclick` 等可能執行的腳本事件。

:::warning[注意]

- React 在 JSX 的設計上已經進行自動轉義等防範 XSS 的處理，在官網也有[相關說明](https://zh-hant.legacy.reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)。
- 雖然 React 已經做了相關處理，但不代表就是百分之百安全，比如使用 [`dangerouslySetInnerHTML`](https://zh-hant.legacy.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) 的地方依然要謹慎小心。
:::

---
:::info[文章內容參考來源：]

- MDN、React官網
- [什麼是 XSS 攻擊？如何防範？](https://www.explainthis.io/zh-hant/swe/what-is-xss)
- [幼幼班也能懂的 2017 OWASP TOP 10](https://medium.com/hannah-lin/%E5%B9%BC%E5%B9%BC%E7%8F%AD%E4%B9%9F%E8%83%BD%E6%87%82%E7%9A%84-owasp-top-10-692764c51f61#dd52)
- [身為 Web 工程師，你一定要知道的幾個 Web 資訊安全議題](https://medium.com/starbugs/%E8%BA%AB%E7%82%BA-web-%E5%B7%A5%E7%A8%8B%E5%B8%AB-%E4%BD%A0%E4%B8%80%E5%AE%9A%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E5%B9%BE%E5%80%8B-web-%E8%B3%87%E8%A8%8A%E5%AE%89%E5%85%A8%E8%AD%B0%E9%A1%8C-29b8a4af6e13)
- [React项目里我们不用担心XSS攻击吗？](https://juejin.cn/post/7217795738691911717)
:::
