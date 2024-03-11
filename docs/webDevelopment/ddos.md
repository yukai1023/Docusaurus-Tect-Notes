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

### 利用 [BGP（邊界閘道器協定）](https://zh.wikipedia.org/zh-tw/%E8%BE%B9%E7%95%8C%E7%BD%91%E5%85%B3%E5%8D%8F%E8%AE%AE) 進行流量清洗

BGP（Border Gateway Protocol）是網路上使用的一種核心的去中心化路由協定，可以幫助控制網路上的數據流向，當檢測到 DDoS 攻擊時，可以通過 BGP 重新導向流量到一個或多個專門設計來分析和清洗惡意流量的中心，稱為流量清洗中心（Scrubbing Center），這些清洗中心會過濾掉攻擊流量，只讓合法的用戶請求通過，然後再將這些乾淨的流量路由回原本的目的地。

### 反向代理 - [WAF（網站應用程式防火牆）](https://www.cloudflare.com/zh-tw/learning/ddos/glossary/web-application-firewall-waf/)

WAF（Web Application Firewall）是一種部署在客戶端和伺服器之間的反向代理，專門為保護網路應用而設計，它運作於 [OSI 模型](https://zh.wikipedia.org/zh-tw/OSI%E6%A8%A1%E5%9E%8B) 的第7層即應用層，透過監控和篩選所有 HTTP / HTTPS 流量來防禦 DDoS、XSS、SQL Injection 和 CSRF 等多種攻擊。作為反向代理，WAF 提升了後端伺服器的匿名性和安全性。同時，它也支持管理員自訂規則，以實時應對和保護網站免受新出現的威脅，確保應用和用戶數據的安全。

---
:::info[文章內容參考來源：]

- [什麼是 DDoS 攻擊？如何防禦？](https://www.explainthis.io/zh-hant/swe/what-is-ddos)
- [什麼是 DDoS 攻擊？](https://www.cloudflare.com/zh-tw/learning/ddos/what-is-a-ddos-attack/)

:::
