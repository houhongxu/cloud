# AI 协作（Vibe Coding）与 RN 工程最佳实践

面向 Cursor / 自动化代理的**选型与协作约定**，与 `AGENTS.md`、`05-conventions.md` 一致；落地后以 `package.json` 与规则文件为准。

## 选型速览

| 类别 | 本仓库推荐 | 说明（对 AI 友好） |
|------|------------|-------------------|
| 包管理器 | **pnpm**（必须） | 锁文件清晰、避免幽灵依赖；**勿**用 yarn/npm 作为默认包管理器。 |
| 国际化 | **i18next** + **react-i18next** | 生态广、示例多，便于生成与类型扩展（配合 TS）。 |
| 样式 | **Tailwind CSS** + **NativeWind**（或与 RN 官方 StyleSheet 混用，分层明确） | 类名即样式、上下文短，利于补全；RN 侧键名仍遵循 `05-conventions.md` 的 camelCase。 |
| 语言 | **TypeScript** | **`strict` 必须开启**（根 `tsconfig.json`）；类型约束减少无效改动。 |
| 规范 | **ESLint** + **Prettier** | 统一风格，便于模型输出与人工 diff 一致。 |
| 结构 | **扁平化、职责单一** | 降低检索成本，文件易定位；避免过深嵌套目录。 |

## Cursor / 规则配置

- 在 **`.cursor/rules/*.mdc`**（带 frontmatter）中固化上述选型（Tailwind、i18next、pnpm 脚本等），代理优先读规则再改代码。
- 与仅使用根目录 `.cursorrules` 相比，分文件规则更易按主题维护；若存在根级规则，应与 `AGENTS.md` 不冲突。

## 依赖与组件选型

- 优先 **React Native 官方组件**与**维护活跃、文档齐全**的第三方库，便于模型与社区示例对齐。
- 复杂业务逻辑、状态机或平台分支：**在实现前用简短注释写清意图与不变量**，便于后续 AI 与人工按同一规格修改。

## 与其他文档的关系

| 主题 | 见 |
|------|-----|
| 多端与分层 | `02-tech-stack.md` |
| CI、PR 预览、流水线中的 AI | `04-cicd.md` |
| 命名、包管理、样式细则 | `05-conventions.md` |
