# 设计与原型

**语言：[中文](README.md) | [English](README.en.md)**

## 当前阶段

已归档 2026-11-25 的 8 屏 Figma 设计（默认/大字号共 16 个 Frame），并完成 React 原型及 F07a–l 菜谱详情/食材替换流。新视觉采用矢量图标、语义字号 token 与全局大字号；Me 保留 v1.0 的语言、目标、偏好摘要和提醒入口。下一步仍是团队走查与目标用户测试。

## 已记录的约束

- 第三次会议已选择现有 UI/UX 和 App 交互方案；交互模糊点仍待收口。
- 先让 ChatGPT 提供几种页面设计方案，由团队选定统一框架后再多人开发，避免风格分裂。
- Figma 原型必须支持按钮到页面的可点击跳转。
- 第一轮原型不要求真正实现数据导入、拍照识别等底层能力。
- 需要提前列出并说明现实可行的外部 API 依赖。
- 首轮只聚焦最重要的基础功能，后续通过第二轮调研补充。

## 产物入口

- [设计决策记录](design-decisions.md)
- [Figma 原型规范](figma-spec.md)
- [系统设计](../04-engineering/system-design.md)
- [模块设计](../04-engineering/module-design.md)
- [Figma 原型实现一致性审计](figma-implementation-audit.md)
- 设计链接与版本：[`../../design/figma/README.md`](../../design/figma/README.md)
- 导出与评审截图：[`../../design/exports/README.md`](../../design/exports/README.md)

## 设计评审与交付前检查

- [x] 第三次会议确认沿用现有 UI/UX 与 App 交互方案。
- [x] 完成交互方案模糊点的评审与关闭。
- [ ] 用户研究与竞品分析形成明确的核心用户问题。
- [x] 选定首轮基础功能与页面清单。
- [ ] 明确各页面需要展示的 API 依赖与模拟数据。
- [x] 统一组件、字体、颜色、间距和命名规范。
