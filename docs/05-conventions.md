# 工程约定（仅保留高频规则）

## 必须遵守

- 包管理器：统一使用 `pnpm`。
- TypeScript：保持 `strict`，默认禁止 `any`；若因第三方类型缺陷必须使用，需添加简短注释说明原因与后续修复方向。
- 风格工具：以 ESLint/Prettier 结果为准，不在文档中重复低价值格式规则。

## 命名规则

- Web/H5/CSS 类名：kebab-case（如 `habit-card-header`）。
- React Native `StyleSheet` key：camelCase（如 `habitCardHeader`）。
- 文件与目录命名保持语义化，避免缩写歧义。

## 代码组织

- 优先扁平目录与单一职责文件。
- 共享逻辑下沉到可复用模块，避免在页面层复制业务分支。
- 平台差异放在适配层，不要散落在核心业务代码中。

## 路由与页面分组（必须）

- 路由定义只放在 `src/navigation/**`（如 navigator、route type）；禁止在该目录放业务组件。
- 路由页面壳只放在 `src/screens/**`，负责“路由参数 + 组装 feature”，避免承载复杂业务逻辑。
- 功能组件放在 `src/features/<feature>/components/**`；同一 feature 的状态与交互逻辑优先内聚在 feature 目录。
- 纯业务计算与数据结构放在 `src/lib/**`，不得写入 `src/navigation/**` 与 `src/screens/**`。
- 单元测试统一放在 `src/**/__tests__/**`，与被测模块按功能就近组织。

## 测试规范

- 测试框架统一使用 `Jest`，仅保留单元测试。
- 功能改动必须伴随单元测试改动（新增或更新）。
- 测试文件目录统一为 `src/**/__tests__`。
- 每组测试至少包含：成功路径、失败路径、边界条件。
- 覆盖率门槛为 `70%`（lines、branches、functions、statements）。
- 测试命名需表达行为与预期，不使用无语义名称。
- 修复缺陷时需先补“可复现该缺陷”的测试，再提交修复实现。

## 国际化

- 推荐 `i18next` + `react-i18next`。
- 禁止在组件中散落硬编码文案，统一走翻译键管理。

## 文档与规则优先级

1. 产品边界与合规约束（`AGENTS.md`、`docs/03-monetization.md`）
2. 可执行规则（`.cursor/rules/*.mdc`）
3. 本文档（工程通用约定）

