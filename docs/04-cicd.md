# AI 与 CI/CD（含 PR 预览 H5）

## 目标

- **CI**：每次推送 / PR 自动安装依赖、类型检查、Lint、单元测试（有测试后）、构建检查。
- **CD**：主分支构建可发布产物（TestFlight / Internal Testing 等由发布流程定义）。
- **AI**：在流水线或 PR 评论中集成 AI 辅助（代码审查摘要、风险点提示），与团队选型的工具一致即可。
- **PR 预览**：每个 PR 生成**可访问的 H5 预览 URL**，便于设计与产品验收，无需本地打包。

## 推荐架构（可择一或组合）

| 环节 | 常见做法 |
|------|----------|
| 托管 | GitHub Actions / GitLab CI / 其他与仓库同源的 CI。 |
| H5 构建 | React Native Web / Expo Web 等产出静态资源。 |
| PR 预览 | Vercel、Netlify、Cloudflare Pages、或 Expo EAS Web preview；关键是**按 commit/PR 部署预览**并回写评论。 |
| AI | GitHub Copilot for PR、第三方 Code Review Bot、或自研 Action 调用模型 API；注意密钥与费用。 |

## AI 使用边界

- 不在日志中输出密钥、用户 PII、商店共享密钥。
- AI 审查结果作为**辅助**，合并仍由人工批准。
- 模型与供应商需符合公司数据出境与合规要求（若适用）。

## Cursor 与仓库规则

- 在 **`.cursor/rules/*.mdc`** 中写明 RN/TS/Tailwind/i18n 等选型，与 `docs/06-ai-coding-rn.md`、`AGENTS.md` 一致，减少代理幻觉与风格漂移。
- 复杂逻辑可在实现处加**简短意图注释**，便于人机与 AI 后续修改时对齐（非替代测试与类型）。

## PR 预览 H5 流程（逻辑）

1. PR 打开或更新 → 触发 workflow。  
2. `pnpm install` → `pnpm run …` 执行 Web/H5 build。  
3. 将产物部署到预览环境，URL 关联到 PR（或 commit）。  
4. （可选）评论中附带 AI 生成的变更摘要与测试建议。  

## 与主应用的关系

- 预览环境使用**独立**环境变量；不连接生产分析或真实 IAP。

## 落地说明

具体 Workflow YAML、预览平台账号与域名在工程初始化时追加；本文档为**规格与约定**，保持与 `AGENTS.md` 一致即可。
