# AGENTS.md — 本仓库 AI / Cursor 协作说明

本文件为 Cursor 与自动化代理提供**持久化上下文**。修改产品方向或工程约束时，请同步更新本文件与 `docs/` 下对应章节。

## 产品一句话

纯前端的 React Native（TypeScript）应用，定位为**戒色 / 自我约束**类工具，体验与目标可参考 Quittr；需支持 **iOS 与 Google Play 付费**，并提供 **H5** 形态以便 Web 分发与 PR 预览。

## 技术边界

- **语言**：TypeScript 全栈（应用层）；**`compilerOptions.strict` 必须为 `true`**（见根目录 `tsconfig.json`）。
- **范围**：纯前端；无自建后端业务 API（本地存储、第三方 SDK、应用商店计费除外）。
- **平台**：iOS、Android；H5 与原生共用业务逻辑与 UI 策略时需明确分层（见 `docs/02-tech-stack.md`）。

## 文档索引

| 文档 | 内容 |
|------|------|
| [docs/00-overview.md](docs/00-overview.md) | 项目总览与目标 |
| [docs/01-product.md](docs/01-product.md) | 产品范围与竞品参照 |
| [docs/02-tech-stack.md](docs/02-tech-stack.md) | RN、TS、H5 策略 |
| [docs/03-monetization.md](docs/03-monetization.md) | 商店付费与合规注意 |
| [docs/04-cicd.md](docs/04-cicd.md) | AI 与 CI/CD、PR 预览 H5 |
| [docs/05-conventions.md](docs/05-conventions.md) | 命名与代码风格约定 |
| [docs/06-ai-coding-rn.md](docs/06-ai-coding-rn.md) | AI 协作与 RN 选型（Vibe Coding） |

## 代理工作方式（摘要）

1. 优先阅读 `docs/` 中与任务相关的章节再改代码；RN + AI 协作选型见 `docs/06-ai-coding-rn.md`。
2. 不引入未文档化的后端或隐私敏感数据收集；付费与商店相关改动需对照 `docs/03-monetization.md`。
3. 样式命名：Web 侧使用 **kebab-case**；React Native 样式对象使用 **camelCase**（见 `docs/05-conventions.md`）。
4. 包管理：必须使用 **pnpm**（`pnpm install`、`pnpm run <script>`）；勿使用 yarn / npm 作为默认包管理器。
5. 在 `.cursor/rules/*.mdc` 中固化 Tailwind / NativeWind、i18next、pnpm 等选型，与 `06-ai-coding-rn.md` 保持一致。

## 与 `.cursor/rules/` 的关系

具体可执行的编码规则放在 `.cursor/rules/*.mdc`（带 frontmatter）。本文件负责**产品与工程级**边界；规则文件负责**文件级**约定。
