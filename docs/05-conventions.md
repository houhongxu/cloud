# 工程约定

## 包管理

- 必须使用 **pnpm**（`pnpm install`、`pnpm run test` 等）；CI 与文档示例与此一致。

## 样式命名

- **Web / H5 / CSS 类名**：使用 **kebab-case**（例：`habit-card-header`）。
- **React Native `StyleSheet` 键名**：使用 **camelCase**（例：`habitCardHeader`），与 RN 惯例一致。

## TypeScript

- 新代码优先使用 `.ts` / `.tsx`；**根或应用级 `tsconfig` 须保持 `compilerOptions.strict: true`**（若使用 Expo 等模板的嵌套配置，继承链中不得关闭 strict）；避免 `any`；公共 API 需有明确类型导出。

## Lint 与格式化

- 使用 **ESLint** + **Prettier** 统一风格，便于 AI 输出与代码审查一致；具体配置在工程初始化时加入并与 CI 对齐。

## 目录与文件（实现阶段细化）

- 按功能域（feature）或分层（`screens`、`components`、`domain`）组织；优先**扁平、职责单一**，降低检索成本（见 `06-ai-coding-rn.md`）。
- 具体结构在首次代码提交时写入 `README` 或本文件。

## 国际化

- 多语言时推荐 **i18next** + **react-i18next**，键与默认语言集中管理，避免硬编码散落；细节见 `06-ai-coding-rn.md`。

## 与 Cursor 规则

- 在 `.cursor/rules/*.mdc` 中固化 Tailwind、NativeWind、i18next、pnpm 等选型；可执行细节以规则为准。
- 本文件为人读的总览，二者冲突时以**更严格的合规与产品约束**为准。
