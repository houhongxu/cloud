# CI/CD 与 PR 预览（HOW 优先）

## 目标

- CI：每次 push/PR 自动执行安装、lint、typecheck、测试、构建检查。
- CD：主分支具备可发布产物。
- PR 预览：每个 PR 生成可访问的 H5 预览地址，支持产品与设计快速验收。

## 基线流程

1. PR 创建或更新触发 workflow。
2. 使用 `pnpm install` 安装依赖。
3. 运行质量门禁（lint/typecheck/test/build）。
4. 构建 H5 预览并部署到临时环境。
5. 将预览 URL 回写到 PR（评论或 checks）。
6. （可选）预览部署成功后发送邮件通知：在仓库 Actions Variables 设置 `PR_PREVIEW_EMAIL_NOTIFY=true`，并配置 SMTP 相关 Secrets（见 `.github/workflows/pr-preview.yml` 内注释）。GitHub 不会在「仅修改仓库 Secret」时单独触发 workflow，因此以「预览部署成功」作为通知时机；每次 PR 同步更新预览后都会发信。

## 关键约束

- 包管理命令统一使用 `pnpm`。
- 预览环境使用独立配置，不连接生产分析与真实 IAP。
- 失败优先暴露在 PR 阶段，不把风险延后到发布阶段。
- H5 产物仅用于 PR 预览，不作为正式线上 Web 站点。

## 测试门禁（必须）

- 测试框架统一使用 `Jest`，且仅执行单元测试。
- `test` 为必跑项，不允许在 CI 中跳过。
- 新增或修改功能时，必须同时提交对应测试用例。
- 测试文件统一放在 `src/**/__tests__` 目录下。
- 测试至少覆盖成功路径、失败路径、一个边界条件；缺少任一项则视为不达标。
- 覆盖率门槛为 `70%`（lines、branches、functions、statements 均需达到）。
- PR 描述中需包含测试范围与执行结果摘要。

## 与 AI 协作的关系

- 在 `.cursor/rules/*.mdc` 中固化与 CI 一致的检查规则，减少“本地通过、CI 失败”。
- 对复杂流程使用简短意图注释，帮助后续自动化修改保持一致。

## 任务路由

- 工程命名与风格：看 `docs/05-conventions.md`
- 技术分层与多端策略：看 `docs/02-tech-stack.md`
