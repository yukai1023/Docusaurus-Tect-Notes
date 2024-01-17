---
title: CORS
---

# CORS（Cross-Origin Resource Sharing，跨來源資源共享）

CORS 是一種安全機制，允許網站指定哪些其他網站可以安全地訪問其資源，如 API、字體和腳本，從而在保護數據安全的同時實現跨域資源共享。

## 同源政策（Same-origin policy）

同源政策是指在瀏覽器中，允許某個網頁腳本訪問另一個網頁的資料，必須來自相同來源，以避免跨站腳本攻擊（Cross-Site Scripting, XSS）和其他安全風險。

同源的定義包括三個主要部分：

- **同通訊協定（Protocol）**：網頁地址使用的協議必須相同，例如，`HTTP` 和 `HTTPS` 之間就不被認為是同源。

- **同網域（Domain）**：網址的域名必須完全相同，即使是子域名也不被視為同源，例如 `example.com` 和 `sub.example.com` 就不是同源。

- **同通訊埠（Port）**：網址中指定的埠號必須相同，即使其他兩者相同，不同的埠也會被視為不同的源，例如 `http://example.com:80` 和 `http://example.com:8080` 就不是同源。

## 透過 CORS 來解決非同源訪問

在同源政策下，所有的跨來源請求默認是被禁止的，但通過 CORS，伺服器可以明確地告訴瀏覽器哪些請求是安全的，實現資源的跨域共享。

### 處理流程

1. **請求發送**：當一個網頁試圖透過 JavaScript（如使用 AJAX）發起一個跨來源請求時，請求會被發送到目標 Server。
2. **伺服器響應**：Server 會正常接收請求並處理，然後返回 Response。
3. **瀏覽器處理**：當瀏覽器收到 Response 後，首先會先檢查 Header 的 CORS 設置 `Access-Control-Allow-Origin`。

如果有包含 CORS 標頭且允許該來源的請求，JavaScript 將能夠正常讀取 Response。

但如果沒有 CORS 標頭或不允許該來源的請求，瀏覽器將會攔截並拋出錯誤，JavaScript 則無法訪問 Response。

<img src={require('./img/errorCORS.png').default} alt="errorCORS"/>

### 簡單請求（Simple Requests）

如果請求是使用 `GET`、 `HEAD` 或 `POST` 方法，且 HTTP 標頭與 Content-Type 的類型符合[相關規範](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS#%E7%B0%A1%E5%96%AE%E8%AB%8B%E6%B1%82)，同時沒有使用 [ReadableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 物件進行數據流處理，那麼這個請求就可以被視為是一個簡單請求。

對於簡單請求，瀏覽器會直接發送該請求到伺服器，然後檢查伺服器回應的標頭，如果 `Access-Control-Allow-Origin` 標頭中包含了發送請求的來源，則請求成功。

<img src={require('./img/Access-Control-Allow-Origin-Url.png').default} alt="Access-Control-Allow-Origin" style={{ margin: '20px auto', display: 'block', boxShadow: '0 0 0 1px' }} />

<img src={require('./img/Access-Control-Allow-Origin.png').default} alt="Access-Control-Allow-Origin" style={{ margin: '20px auto', display: 'block', boxShadow: '0 0 0 1px' }} />

<p style={{ textAlign: 'center' }}>`*` 星號為萬用字元，代表伺服器允許任何來源的網頁請求它的資源。</p>

### 預檢請求（Preflight Requests）

當不符合簡單請求的條件，瀏覽器會先發送一個預檢請求，預檢請求使用 `OPTIONS` 方法發送，伺服器需要回應這個請求，指出哪些來源、方法、和標頭是被允許的，只有當預檢請求成功後，瀏覽器才會發送實際的請求。

使用預檢請求的主要原因是為了網絡安全和數據完整性，雖然預檢請求需要發送額外的 HTTP 請求，會稍微增加資源佔用，但預檢請求允許伺服器對進行潛在風險較高的操作的跨來源請求進行控制和過濾，有助於防止跨站腳本攻擊和其他安全威脅，確保只有獲得伺服器明確許可的請求才能被執行。

- **`Access-Control-Allow-Origin`**：哪些來源可以訪問資源。

- **`Access-Control-Allow-Methods`**：允許的方法，如 `GET` 、 `POST` 、 `DELETE` 等。

- **`Access-Control-Allow-Headers`**：在實際請求中允許的自定義標頭列表。

- **`Access-Control-Max-Age`**：預檢請求的結果可以被緩存多長時間。

## 臨時繞過 CORS 限制

雖然處理 CORS 主要是後端的職責，但作為前端開發中還有一些方式能繞過 CORS 的限制，特別是在開發階段。

- **代理伺服器**：部署在前端的本地環境中，主要用於將前端的請求中繼到後端伺服器，這種設置使得請求都來自於代理伺服器本身，從而規避 CORS 限制，適用於開發階段。

- **反向代理**：位於伺服器端，擔任前端與後端伺服器之間的中介，它將前端發出的請求轉發至後端 API 服務器，與一般代理伺服器不同，在反向代理的設置下，客戶端通常無法察覺到請求被轉發的過程。

- **瀏覽器插件**：可以臨時禁用或修改 CORS 策略，對於快速測試很有用，不需要更動程式碼就可完成，例如：[Allow CORS](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)、[Moesif](https://chromewebstore.google.com/detail/digfbfaphojjndkpccljibejjbppifbc)。

---
:::info[文章內容參考來源：]

- [MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
- [CORS 是什麼? 為什麼要有 CORS?](https://www.explainthis.io/zh-hant/swe/what-is-cors)
- [1.6 CORS](https://jack1in.gitbook.io/font-end/1.-web/1.6-cors)
:::
