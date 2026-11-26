# HCI Design Challenge — Healthy Lifestyle

本仓库基于小组截至 **2026-11-24** 的 [Google Doc 源文档](https://docs.google.com/document/d/1saT3KarlYWZEsDZ_4e_jiKFE5pDmFoJ5wQ47QorzcoU/edit?tab=t.0) 初始化，用于集中管理问题探索、用户研究、原型设计与后续开发资料。

> 当前源文档记录到 **Stage 0 – Problem Exploration**，并已补入第三次会议纪要。2026-11-25 Figma v2 的 8 屏默认/大字号设计、系统/模块设计基线、V0–V3 问卷和 NutriPal v1.1 React 原型均已归档；最终功能范围、真实后端与品牌资产仍未确定。

## 项目快照

| 项目 | 当前信息 |
| --- | --- |
| 选题 | Healthy Lifestyle |
| 产品方向 | 基于智能手机的主动式健康管理系统（proactive health management system） |
| 预期用户 | General public |
| 初始研究参与者 | University students |
| 现阶段 | Stage 0；文档、ATDD 与 NutriPal v1.1 原型已完成；8 屏 Figma 结构已实现，待团队走查与用户测试 |
| 产品名称 | NutriPal（Figma 原型名）；问卷使用 Nourish，待统一 |
| 最终功能范围 | 未确定，须由问卷、访谈及竞品分析决定；工程文档将其视为设计基线 |
| 技术栈 | 前端 React 19 + Vite 8 + TypeScript 5.9 已落地；后端与数据库待定 |
| 源文档快照 | [`docs/00-source/google-doc-snapshot-2026-11-24-v2.md`](docs/00-source/google-doc-snapshot-2026-11-24-v2.md) |
| Figma 设计稿 | [`design/figma/README.md`](design/figma/README.md) |
| 设计归档 | [2026-11-25 v2 归档](design/exports/2026-11-25-nutripal-v2/README.md)（当前视觉基线） |
| 用户研究问卷 | [`docs/02-research/questionnaire/questionnaire-v3-participant.md`](docs/02-research/questionnaire/questionnaire-v3-participant.md)（V3 为当前第三版；预测试待完成） |
| 问卷结果 | [V3 模拟回答归档](data/processed/questionnaire-v3/README.md)（100 条 AI 生成数据，非真实样本） |
| 菜谱数据 | [TheMealDB Mock 菜谱目录](data/processed/recipe-catalog/README.md)（91 道，供 F02 搜索） |
| 系统设计 | [`docs/04-engineering/system-design.md`](docs/04-engineering/system-design.md) |
| 模块设计 | [`docs/04-engineering/module-design.md`](docs/04-engineering/module-design.md) |
| English design docs | [`System Design`](docs/04-engineering/system-design.en.md) · [`Module Design`](docs/04-engineering/module-design.en.md) |
| ATDD 原型脚手架 | [`docs/04-engineering/atdd.md`](docs/04-engineering/atdd.md) · [`src/README.md`](src/README.md) |

## 已经形成的方向性结论

- 在 Healthy Lifestyle 与 Reduce Procrastination 两个候选题中，小组选择 Healthy Lifestyle。
- 产品面向大众，但首轮用户研究聚焦大学生，以便招募和迭代。
- 目标不是单纯提供健康信息，而是研究及时、相关、可控制且尊重隐私的主动式支持。
- 原型以智能手机界面为起点；GPS、天气、通知、用户偏好和食谱 API 属于可行性候选能力，不是已确定需求。
- 首轮原型只实现最重要的基础功能，同时使用可点击的 Figma 页面流；底层数据导入和拍照识别不作为第一轮技术实现要求。

## 目录结构

```text
.
├── README.md                          # 项目总览与导航
├── docs/
│   ├── 00-source/                     # Google Doc 快照、来源说明与原始截图
│   ├── 01-project-definition/         # 问题背景、选题、目标用户、技术可行性
│   ├── 02-research/                   # 问卷、伦理声明、竞品分析
│   ├── 03-design/                     # 设计方向、Figma 规范与决策记录
│   ├── 04-engineering/                # 技术栈、API 清单与技术决策
│   ├── 05-team/                       # 分工、协作方式与任务看板
│   ├── 06-meetings/                   # 三次会议记录与未决事项
│   ├── 07-evaluation/                 # 用户测试与迭代评估
│   └── 08-delivery/                   # 报告、展示与最终交付索引
├── data/
│   ├── raw/                           # 原始研究数据（默认不提交可识别个人信息）
│   └── processed/                     # 去标识化、整理后的研究数据
├── design/
│   ├── figma/                         # Figma 文件/链接说明与版本记录
│   └── exports/                       # 原型截图、导出稿与评审素材
├── src/                               # React/Vite/TypeScript 原型与 ATDD 验收测试
└── assets/                            # 演示、展示与交付通用素材
```

完整目录说明见 [`docs/README.md`](docs/README.md)。

## 运行原型

```bash
npm install
npm run dev
```

验证命令：

```bash
npm test
npm run lint
npm run build
```

## 在线原型

- GitHub Pages: <https://surpasshr.github.io/HCI-Design-Challenge/>
- 推送到 `main` 后，`.github/workflows/pages.yml` 会自动构建并部署。
- Pages 构建使用 `VITE_BASE=/HCI-Design-Challenge/`，并生成 SPA 路由回退页 `404.html`。

## 当前待办与决策门槛

1. 完成 V3 的 3–5 人认知预测试，并确定样本与招募安排。
2. 完成经人工核实的竞品分析，并据此确定首轮基础功能。
3. 落实第三次会议决定：梳理交互模糊点、完成 HCI 设计原则映射，并确定具体开发方式。
4. 评审现有可点击流，补充缺失的演示态，并安排用户原型测试。
5. 评审系统设计和模块设计，确认设计缺口与首版 Mock 范围后再进入代码实现。

可执行任务、负责人和原文依据统一记录在 [`docs/05-team/task-board.md`](docs/05-team/task-board.md)。

## 文档约定

- **来源优先**：`docs/00-source/` 保存只读快照；其他文档是整理稿，不应覆盖原始记录。
- **区分事实与假设**：未在源文档出现的日期、负责人、决策和完成状态不补写；内容用 `待确认`、`待开始` 明确标记。
- **状态含义**：`已决策` 表示小组已明确选择；`已成稿` 表示正文已记录；`要求已记录` 表示只记录了要求或任务；`待确认` 表示无法从源文档确认完成情况。
- **隐私**：参与者可识别信息不得进入 Git；原始数据放在 `data/raw/`，该目录默认被忽略。
