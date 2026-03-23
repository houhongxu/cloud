# 商业化与商店付费

## 平台

- **iOS**：App Store — 使用 Apple 提供的应用内购买（IAP）或订阅（Auto-Renewable Subscription），具体以产品定价模型为准。
- **Android**：Google Play — 使用 Play Billing Library / 订阅类商品。

## 原则

- **纯前端**不意味着「无付费」：付费能力由**商店 SDK + 客户端校验流程**完成；服务端收据校验为可选增强（若未来引入后端，再单独文档化）。
- 所有付费点需有：清晰标价、功能说明、恢复购买入口（平台要求）、订阅管理外链（按商店指南）。

## 合规清单（实现前核对）

- Apple [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) 中与 IAP、订阅、退款说明相关条款。
- Google Play [Monetization](https://support.google.com/googleplay/android-developer/topic/9857752) 政策。
- 应用内展示「用户协议」「隐私政策」链接（内容由法务/产品提供）。

## 与 H5 的关系

- Web/H5 通常**不**直接完成 iOS/Android 内购闭环；可展示营销页与「前往商店下载」或有限 Web 支付（若采用，须单独合规评估）。
- PR 预览环境**禁止**使用生产收款密钥；使用沙箱或 Mock。

## 文档维护

定价档位、SKU 列表、试用期规则变更时，更新本节或附属 `pricing.md`（若创建）。
