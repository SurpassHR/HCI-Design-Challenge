# NutriPal ATDD 原型脚手架

**语言：[中文](atdd.md) | [English](atdd.en.md)**

> - 状态：v1.1 自动化验收通过；视觉按 2026-11-25 Figma 结构实现
> - 日期：2026-11-26
> - 技术栈：React 19 + Vite 8 + TypeScript 5.9 + Vitest + Testing Library

当前视觉审计见 [Figma 原型实现一致性审计](../03-design/figma-implementation-audit.md)。

## 1. 当前验收范围

| ID | 用户行为 | 验收条件 |
| --- | --- | --- |
| AC-01 | 新用户访问 /home | 自动进入 F01；无状态栏；可打开 + Add 并添加自定义忌口 |
| AC-02 | 用户选择偏好并 Continue | 偏好写入本地 Mock，进入 F02，底部导航出现 |
| AC-03 | 用户在 F02 搜索 | 91 道双语菜谱；chi 与中文菜名均可搜索；chi 只返回 Chicken/Chilli 标题相关项；结果按当前语言显示 |
| AC-04 | 用户进入 F03/F03b | 显示新周条、约束、食材、三餐；F03b 显示 4 个采购项与预算 |
| AC-05 | 用户勾选 F03b 采购项 | Feta 初始勾选；点击 Chicken thighs 后显示已勾选 |
| AC-06 | 用户进入 F04 | 显示渐变锁屏、通知和建议；无底部导航；Cook this/Other ideas/Not now/Why 可用 |
| AC-07 | 用户进入 F05 | 总开关、Snooze、频率、类别、解释和反馈可用 |
| AC-08 | 用户进入 F06 | 识别结果、份量调整、营养条、Log to Dinner 与返回 Home |
| AC-09 | 用户进入 Me | 新设置行、语言、今日目标、偏好摘要、预览提醒、隐私说明和大字号开关均存在 |
| AC-10 | 用户开启 Large text | 根元素 data-text-size=large，设置持久化，8 个路由均可访问 |
| AC-11 | 用户切换语言 | 中英文界面切换并在刷新后保留 |
| AC-12 | Figma 图标 | F01 使用原样 emoji；F02–F06/F03b 使用 Figma 导出 SVG |
| AC-13 | Mock 菜谱与 CSS 回归 | 中英文/多词搜索通过；所有显式字号跟随大字号 boost |

自动验收文件：[app.acceptance.test.tsx](../../src/acceptance/app.acceptance.test.tsx)。

## 2. RED → GREEN 记录（v1.1）

1. 大字号验收先因 DisplayPreferencesProvider 缺失而失败；补齐领域类型、Repository 和 Provider 后通过。
2. F02 搜索验收先因无搜索框而失败；升级为 91 道菜的 Supabase 兼容 Mock，支持结果、详情和空结果建议。
3. F01 自定义忌口验收先因 + Add 无目标而失败；加入 Sheet 与保存逻辑后通过。
4. F03/F03b 新 fixture 与 Share 主操作验收在更新页面数据和 CTA 后通过。
5. Me 保留内容验收在恢复语言、目标、偏好摘要、预览提醒和隐私说明后通过。
6. F01 emoji 与 F02–F06/F03b SVG 均按 Figma 原样落地；旧“禁 emoji”规则已撤销。

## 3. 已实现内容

- React/Vite/TypeScript 工程、锁文件和 Node 版本要求。
- 路由、onboarding guard、共享 App Shell 和底部导航。
- v1.1 token 层、共享 UI 组件和页面样式。
- F01 偏好持久化、自定义忌口、编辑返回。
- F02 营养摘要、91 道菜谱 Mock 搜索、详情 Sheet、Try 芯片、推荐与 See all。
- F03 日期、预算、食材、换餐、重生成与购物入口。
- F03b 采购项、预算、 pantry、勾选、分享和配送演示。
- F04/F05/F06 主动建议、控制、解释和扫描计算。
- Me 的完整 v1.0 内容 + 新 Accessibility 大字号。
- PWA manifest、图标、Apple touch icon 和离线 shell。

## 4. 验证命令

npm test
npm run lint
npm run build

## 5. 后续 ATDD 循环

1. 在 src/acceptance 或新增 acceptance 文件写一个用户行为。
2. 运行并确认失败原因。
3. 写最小实现。
4. 运行全部测试、lint 和 build。
5. 在 390 × 844 与 2026-11-25 归档比对，记录有意偏差。

## 6. 执行基线

- 视觉与文案：以 [2026-11-25 Figma 归档](../../design/exports/2026-11-25-nutripal-v2/README.md) 为基线。
- 图标：F01 使用 Figma emoji；F02–F06/F03b 使用 Figma 导出 SVG（public/figma-icons），不自行绘制替代。
- 设备外观：不显示状态栏、信号/电池或手机框。
- 后端：只使用本地 Mock 和预留 Repository/API 契约。
- 权限与隐私：不请求真实相机、定位或通知权限。
- PWA：manifest、主题色和离线外壳可用；正式部署仍由项目所有者完成。

## 7. 仍需人工

- 团队点击走查和目标用户原型测试。
- 真实第三方服务凭据与授权。
- 真实设备字体和系统 emoji 以外的跨平台渲染检查。

