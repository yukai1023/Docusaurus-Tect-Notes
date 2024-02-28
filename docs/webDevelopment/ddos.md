---
title: DDoS
---

# DDoS

DDoS（Distributed Denial of Service，分散式阻斷服務攻擊）是一種網路攻擊方式，攻擊者通過控制一大群被感染的電腦（[僵屍網路](https://zh.wikipedia.org/zh-tw/%E6%AE%AD%E5%B1%8D%E7%B6%B2%E7%B5%A1)）向目標網站發送大量請求，超出網站處理能力從而使系統過載。

<img alt="ddos" src={require("./img/ddos/ddos.png").default} />

## 與 DoS 的差別

|   Features   |  DoS（Denial of Service）   | DDoS（Distributed Denial of Service）  |
|-------|--------|-------|
| **來源** |  通常來自單一的攻擊源  | 來自多個分散的攻擊源  |
| **規模** | 攻擊規模較小，攻擊強度有限 | 攻擊規模大，攻擊力量強 |
| **複雜性** |  較為簡單，可能只是重複發送大量請求   |  較為複雜，涉及多層次的網路架構攻擊   |
| **類型**  |  常見於網路遊戲，用以干擾或中斷遊戲服務，影響其他玩家的遊戲體驗 |  常針對需要穩定服務的領域，如金融業，對其進行攻擊造成經濟損失和信譽損害  |

## 如何防範 DDoS 攻擊？

### 增加可承受的容量

如同擴大商店的空間能夠容納更多客人一樣，對網站來說，增加帶寬能在一定程度上吸收更大流量的衝擊，但這種做法成本較高，且在非攻擊時期可能造成資源浪費，因此現代解決方案更傾向於使用雲端資源，可以根據流量需求動態擴展資源，這樣在遭受 DDoS 攻擊時，系統可以自動擴展以吸收流量，攻擊結束後可以再縮減資源，有效控制成本。

### [CDN (內容傳遞網路)](https://zh.wikipedia.org/zh-tw/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF)

CDN (Content Delivery Network or Content Distribution Network) 是一種分佈式網路服務，通過將內容分散存儲到多個地理位置的伺服器上，來加快內容向終端用戶的傳遞速度。除了加速內容傳遞，CDN 也能夠提供安全防護，尤其是對抗 DDoS 攻擊：

- **分散攻擊流量**：當 DDoS 攻擊發生時，攻擊流量會被分散到多個節點，而不是集中到原始伺服器，大幅降低對單一伺服器的壓力。
- **流量過濾**：提供流量過濾功能，能夠識別和過濾非法流量，這包括利用各種規則和模式識別惡意流量，並將其封鎖，確保只有合法的請求能夠到達原始伺服器。
- **規模優勢**：具有龐大規模的基礎設施和帶寬，可以吸收大量流量，因此能夠處理大規模的 DDoS 攻擊，避免伺服器超載。

### 利用 BGP 進行流量清洗

---
:::info[文章內容參考來源：]

- [什麼是 CSRF 攻擊？如何防範？](https://www.explainthis.io/zh-hant/swe/what-is-csrf)
- [談 SameSite 設定對 Cookie 的影響與注意事項](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E5%86%8D%E6%8E%A2%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-%E8%AB%87-samesite-%E8%A8%AD%E5%AE%9A%E5%B0%8D-cookie-%E7%9A%84%E5%BD%B1%E9%9F%BF%E8%88%87%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85-6195d10d4441)
- [零基礎資安系列（一）認識 CSRF](https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/)
- [防禦CSRF攻擊的五種方法](https://gcdeng.com/blog/five-ways-to-defend-against-CSRF-attacks)

:::
