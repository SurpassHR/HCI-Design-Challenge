# NutriPal Figma 设计归档 v2（2026-11-25）

**语言：[中文](README.md) | [English](README.en.md)**

![NutriPal v2 默认字号总览](screens-gallery.png)

实现对照：[默认字号](implementation/screens-gallery.png) · [大字号](implementation/screens-gallery-large-text.png)

## 来源

- Figma：<https://www.figma.com/design/QHOOV8NcB4Ev499ycoRtZq/>
- 文件：`NutriPal – Healthy Eating App (Copy)`
- File key：`QHOOV8NcB4Ev499ycoRtZq`
- 页面：`App Screens`（`0:1`）
- 归档日期：2026-11-25
- 画板：iPhone 390 × 844；F02 为 390 × 936
- 屏幕：8 个页面 × 默认/大字号 = 16 个 Frame

## 与 2026-11-24 归档的差异

- 新增 `Me · Profile & Settings` 页面和独立的 `Me` 底部导航入口。
- 全部 8 个页面增加大字号变体，字号普遍增加约 2px，页面内容允许滚动。
- F02 新增菜品搜索、Try 芯片和搜索状态变量。
- F03/F03b 更新预算、食材、餐次和购物项 fixture。
- 全站改用新的颜色 token、圆角、卡片与底部导航样式。
- F01 菜系图标使用 Figma 原样 emoji（🥟 🍛 🍝 🍣 🌮 🥙 🥧 🍜）；不再使用自绘 SVG 替代。

## 文件

| 文件 | 说明 |
| --- | --- |
| `screens/*.png` | 16 个 390 × 844 的 Figma 单屏截图 |
| `screens-gallery.png` | 默认字号 8 屏总览 |
| `screens-gallery-large-text.png` | 大字号 8 屏总览 |
| `components-gallery.png` | Figma 组件区截图 |
| `frames.json` | Frame ID、名称、变体与截图文件名 |
| `design-tokens.json` | 颜色、搜索状态变量和组件索引 |
| `checksums.sha256` | 归档图片与元数据 SHA-256 |
| `implementation/` | v1.1 实现后的对照截图（实现阶段补充） |

### 实现对照

- `implementation/screens-gallery.png`：v1.1 默认字号总览。
- `implementation/screens-gallery-large-text.png`：v1.1 大字号总览。
- `implementation/comparison-gallery.png`：每屏左为 Figma、右为 v1.1 实现。
- `implementation/F02-search-gallery.png`：Mock 菜谱搜索结果、详情 Sheet 与无匹配建议。
- F02–F06/F03b 的图标已从 Figma SVG 节点原样导出至 `public/figma-icons/`，映射清单见 `public/figma-icons/manifest.json`。
- 实现截图不含 Figma 状态栏/手机框，Me 页比设计更长。

## 屏幕索引

| Frame | 页面 | 默认截图 | 大字号截图 |
| --- | --- | --- | --- |
| 3:6 | F01 Dietary & Cultural Preferences | `F01-preferences.png` | `F01-preferences-large-text.png` |
| 3:87 | F02 Personalised Meal Recommendations | `F02-recommendations.png` | `F02-recommendations-large-text.png` |
| 4:62 | F03 Practical Meal Planning | `F03-meal-plan.png` | `F03-meal-plan-large-text.png` |
| 4:193 | F04 Context-Aware Proactive Assistance | `F04-proactive-assistance.png` | `F04-proactive-assistance-large-text.png` |
| 5:112 | F05 Notification Control & Explanation | `F05-nudge-settings.png` | `F05-nudge-settings-large-text.png` |
| 5:226 | F06 AI Food Recognition & Calorie Estimation | `F06-food-recognition.png` | `F06-food-recognition-large-text.png` |
| 26:209 | F03b Shopping List | `F03b-shopping-list.png` | `F03b-shopping-list-large-text.png` |
| 2014:269 | Me Profile & Settings | `ME-profile-settings.png` | `ME-profile-settings-large-text.png` |

## 设计 token

颜色：`bg #FFF7EC`、`surface #FFFFFF`、`ink #1E1A3C`、`muted #6E6A8A`、`line #EEE6DA`、`purple #7B5CFF`、`orange #FF8A3D`、`pink #FF5C8A`、`green #22C27A`、`yellow #FFC83D`、`blue #38B6FF`。

组件：Button/Primary、Checklist Item、Chip、Cuisine Tile、Me / Accessibility Toggle Row、Me / Settings Row、Segmented Control、Status Bar、Tab Bar、Toggle。

## 实现约定

- Figma 是视觉事实源；此目录是冻结的静态证据，不随实现修改。
- 实现不显示 Figma 中的 9:41 状态栏、信号/电池或 44px 手机圆角框；这些属于展示稿 chrome，不是产品 UI。
- 大字号实现采用全局字号 token 和滚动，不复制 Figma 截图中固定 844px 高度造成的裁切。
- Me 页在 Figma 基础上保留 v1.0 的语言、今日目标、偏好摘要、提醒预览和隐私说明，详见实现审计。

## 验收

| 检查项 | 结果 |
| --- | --- |
| 8 个页面 × 默认/大字号共 16 个 Frame | 通过 |
| 每屏宽 390；F02 高 936，其余高 844 | 通过 |
| 组件与 token 索引 | 通过 |
| 源文件哈希 | 通过，见 `checksums.sha256` |
| 与 Figma 逐像素一致 | 不适用：本目录为 Figma 截图；实现稿在 `implementation/` |

