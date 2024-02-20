---
title: CSRF
---

# CSRF

CSRF（Cross-Site Request Forgery，跨站請求偽造）是一種網路攻擊方式，它讓攻擊者可以在不知情的使用者的協助下，以該用戶的身分，在網路應用程式上執行非授權的操作，這種攻擊通常發生在用戶已經登入某個網站（例如銀行或社交媒體），然後在不知情的情況下，點擊了攻擊者準備的連結或者載入了惡意網頁。

<img alt="csrf" src={require("./img/csrf/csrf.png").default} />

#### 範例

假設有一個銀行網站，允許用戶通過 URL `http://bank.example.com/transfer` 來執行轉賬操作。

這個 URL 接受三個參數：`toAccount`（收款帳號）、`amount`（轉賬金額）和 `description`（交易描述），如果這個網站沒有實施適當的 CSRF 防護措施，攻擊者可以創建以下形式的惡意連結：

```html
<a href="http://bank.example.com/transfer?toAccount=attackerAccount&amount=1000&description=Gift">點擊這裡領取您的免費禮物！</a>
```

如果用戶已經登入了銀行網站，且在相同的瀏覽器中點擊這個連結，他們的瀏覽器將發送一個包含他們認證信息（例如 Cookies）的請求到銀行網站，網站將通過驗證並執行轉賬操作。

## 如何防範 CSRF 攻擊？

### CSRF Token

由伺服器加密產生唯一且有時效性的 token，前端可以在頁面加載時或者進行特定操作前請求此 token，並放入到 API 請求的 HTTP Header 或表單數據中，回傳後交給伺服器檢查是否有效。

```js title="由表單回傳 token"
<form action="http://localhost:3000/submit" method="post">
  <input type="hidden" name="_csrf" value="從伺服器獲得的CSRF-Token">
  <button type="submit">提交</button>
</form>
```

```js title="使用 Fetch API 發送 AJAX 請求，並在 headers 加入 token"
fetch('http://localhost:3000/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'CSRF-Token': '從伺服器獲得的CSRF-Token'
  },
  body: ...
})
```

### 檢查 Referrer

HTTP Referrer 用來表示從哪連結到目前的網頁，也就可以檢查訪客從哪裡而來，由於 Referrer Header 是由瀏覽器提供的，且有可能被用戶或惡意軟體修改，因此不應被視為唯一的安全防護措施。

<img src={require('./img/csrf/referrer.png').default} alt="Referrer" style={{ width: '50%', margin: '10px auto', display: 'block', boxShadow: '0 0 0 1px' }} />

<p style={{ textAlign: 'center' }}>由伺服器端檢查</p>

### 避免使用 `GET` 請求進行關鍵操作

根據 HTTP 標準，`GET` 請求應該是安全且無副作用的， `POST` 請求則用於提交數據，並且預期會導致伺服器的狀態變化或副作用，介面操作上也需要用戶明確的提交動作（例如點擊按鈕），這就降低了攻擊者無需用戶明確互動就能發起攻擊的可能性。

<img alt="getAndPost" src={require("./img/csrf/getAndPost.png").default} />

<p style={{ textAlign: 'center' }}>POST 請求的參數不會出現在 URL 中，提供了更好的隱蔽性和安全性</p>

儘管使用 `POST` 請求比 `GET` 請求更安全，但這並不意味著 `POST` 請求就完全不會受到 CSRF 攻擊，依然需要實施其他防護措施。

### 設置 Cookie 的 `SameSite` 屬性

`SameSite` 是可在 HTTP Cookie 中設定的屬性，可以控制 Cookie 跨站時的行為，屬性主要有三個值：

- `Strict`：Cookie 只會在用戶直接訪問該網站時被發送，如果是透過第三方網站的連接，則不會被包含在請求中。

- `Lax`：

-

---
:::info[文章內容參考來源：]

- MDN、React官網

:::
