# AGENTS.md — 项目级协作边界（给 AI 与开发者）

本文件只保留高价值、跨任务稳定的约束。细节放在 `docs/` 与 `.cursor/rules/*.mdc`，避免规则膨胀导致执行质量下降。

## 项目一句话（WHAT）

纯前端 React Native + TypeScript 应用，开发框架使用 Expo（底层能力基于 React Native）；支持 iOS、Android 付费，并提供 H5 仅用于 PR 预览。

## 关键决策（WHY）

- 保持 TypeScript `strict`：减少隐式错误与回归。
- 坚持纯前端边界：不引入自建后端 API，优先本地与平台能力。
- RN 与 H5 分层：共享业务逻辑，平台差异通过适配层隔离。

## 执行规则（HOW）

- 包管理器必须使用 `pnpm`。
- 先读“相关文档”，再改代码；不要一次性加载全部文档。
- 代码与规则冲突时：先满足产品边界与合规要求，再处理实现细节。
- 测试框架统一使用 `Jest`，且仅做单元测试。
- 所有功能改动必须补单元测试用例；至少覆盖成功路径、失败路径和一个边界条件。
- 单元测试文件统一放在 `src/**/__tests__` 目录下。

## 快速文档路由（按需读取）

- 技术栈与分层：`docs/02-tech-stack.md`
- 付费与合规：`docs/03-monetization.md`
- CI/CD 与 PR 预览：`docs/04-cicd.md`
- 命名与工程规范：`docs/05-conventions.md`
- AI 协作与规则落地：`docs/06-ai-coding-rn.md`

## 规则分层职责

- `AGENTS.md`：项目级边界与稳定决策（本文件）。
- `docs/*.md`：面向人类和 AI 的主题化说明。
- `.cursor/rules/*.mdc`：可执行、可匹配路径的细粒度规则。
