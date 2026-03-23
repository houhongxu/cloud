# 项目总览

## 定位

- **类型**：移动端戒色 / 自我约束类工具应用（产品气质可参考 Quittr）。
- **形态**：纯前端；数据以端侧为主，可选云同步需在独立规格中另立文档。
- **技术**：React Native + TypeScript。

## 目标平台

| 平台 | 说明 |
|------|------|
| iOS | App Store 上架；应用内购买或订阅（见 monetization）。 |
| Android | Google Play 上架；应用内购买或订阅。 |
| H5 | 用于 Web 访问、营销落地页，以及 **CI 中 PR 预览**；与原生共享尽可能多的业务与展示逻辑。 |

## 文档阅读顺序

1. `01-product.md` — 做什么、不做什么。  
2. `02-tech-stack.md` — 如何实现多端与 TS 分层。  
3. `03-monetization.md` — 付费与商店政策。  
4. `04-cicd.md` — AI 辅助流程与 PR 预览。  
5. `05-conventions.md` — 命名与工程约定。  
6. `06-ai-coding-rn.md` — AI 协作与 RN 选型（Vibe Coding）。  

## 当前阶段

仓库以**文档与 Cursor 规则**为优先；应用源码与流水线实现按迭代追加，需与本目录描述保持一致。
