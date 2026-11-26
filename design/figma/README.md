# Figma 工作区

**语言：[中文](README.md) | [English](README.en.md)**

## 文件索引

| 名称 | 链接 | 版本/日期 | 状态 |
| --- | --- | --- | --- |
| NutriPal – Healthy Eating App (Copy) | <https://www.figma.com/design/QHOOV8NcB4Ev499ycoRtZq/> | 2026-11-25 | **当前视觉基线**；已归档 |
| NutriPal – Healthy Eating App | <https://www.figma.com/design/FzzqscVPbxGe2X56MfWBEW/NutriPal-%E2%80%93-Healthy-Eating-App?timeline=keyframe&node-id=0-1&p=f&t=6hx1mpAIOP6H6Jma-0> | 2026-11-24 | 已归档；只读访问 |

## 当前基线（2026-11-25）

- Figma 文件 key：QHOOV8NcB4Ev499ycoRtZq
- 文件：NutriPal – Healthy Eating App (Copy)
- 页面：App Screens（0:1）
- 画板规格：iPhone 390 宽；F02 高 936，其余高 844；8 个页面 × 默认/大字号 = 16 个 Frame
- 页面：F01–F06、F03b、Me；每屏包含默认字号与大字号变体
- 组件与 token：10 个组件、17 个变量、2 个变量集合
- 静态副本、预览图与验收记录：[2026-11-25 归档](../exports/2026-11-25-nutripal-v2/README.md)
- 实现约定：不显示 Figma 中的状态栏/手机框；F01 菜系 emoji 按 Figma 原样使用，F02–F06/F03b 图标从 Figma SVG 节点导出至 public/figma-icons。
- 本文件记录设计事实源；当前 App 是 v1.1 React 原型，不是 Figma 的逐像素副本。

## 历史归档（2026-11-24）

- Figma 文件 key：`FzzqscVPbxGe2X56MfWBEW`
- 页面：`App Screens`
- 文件最近修改时间（Figma 页面元数据）：2026-11-24 13:16:20 UTC
- 访问状态：归档时可查看、不可编辑（`can_edit: false`）
- 画板规格：iPhone 390 × 844；共 7 个屏幕
- 静态副本、预览图与验收记录：[`../exports/2026-11-24-nutripal/`](../exports/2026-11-24-nutripal/README.md)
- 该文件夹记录的是**设计稿归档**，不是后端或可上线的 App 实现。
- 工程契约：[`../../docs/04-engineering/system-design.md`](../../docs/04-engineering/system-design.md)、[`../../docs/04-engineering/module-design.md`](../../docs/04-engineering/module-design.md)。

## 画板清单

| Frame | 功能 | 关键内容 |
| --- | --- | --- |
| F01 | Dietary & Cultural Preferences | 首次使用第 2/4 步；菜系、饮食风格、忌口/过敏选择 |
| F02 | Personalised Meal Recommendations | 每日热量与三大营养素摘要、个性化食谱推荐 |
| F03 | Practical Meal Planning | 每周餐单、预算/烹饪时间/储藏物约束、购物清单入口 |
| F03b | Shopping List | 从餐单生成的预算、采购项与已有食材 |
| F04 | Context-Aware Proactive Assistance | 锁屏主动建议；离开健身房、用餐间隔、蛋白质目标与食材到期等触发依据 |
| F05 | Notification Control & Explanation | 主动建议开关、延后、频率、免打扰时段与“为何收到此提醒”解释 |
| F06 | AI Food Recognition & Calorie Estimation | 拍照识别食物、份量调整、热量与营养估算、加入当天记录 |
| Me | Profile & Settings | 个人资料、饮食/通知设置入口、大字号无障碍开关 |

大字号变体（F01–F06、F03b、Me）沿用同一结构，正文和标题字号约增加 2px；固定 844px 高度截图中的裁切不代表实现要求。

## 历史 Figma 评论索引（2026-11-24 文件）

| 评论 | 内容 |
| --- | --- |
| #1 | 用户个性化设置，首次启动展示 |
| #2 | 当天食物热量 |
| #3 | AI 推荐食谱 |
| #4 | AI 计划当日饮食 |
| #5 | 消息通知，属于主动介入进行提示 |
| #6 | 通知和消息提示的设置 |
| #7 | 热量计算器，通过拍照 + AI 识图 |
| #8 | 根据用户配置好的食谱进行食材推荐以及主动介入的通知 |

> 评论 #2 与 #7 各有一条回复；回复内容在只读评论列表中未展开，因此未归档。

## 版本规则（建议）

- 页面框架定稿后建立基线版本。
- 重大结构调整使用日期或版本记录。
- 原型评审时冻结截图，避免评审期间多人同步修改导致比较失效。
- 确保课程评审成员具有只读访问权限。
