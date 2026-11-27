# Figma 原型规范

**语言：[中文](figma-spec.md) | [English](figma-spec.en.md)**

## 目标

用可点击的手机端 Web 原型验证核心任务流、主动建议方式与用户控制，并用同一套设计语言展示 F02 搜索、Me 设置和全局大字号能力。原型不要求实现底层第三方能力。

## 当前基线（2026-11-25）

- 当前视觉事实源：Figma NutriPal – Healthy Eating App (Copy)，文件 key QHOOV8NcB4Ev499ycoRtZq。
- 8 个页面：F01–F06、F03b、Me；每屏包含默认字号与大字号，共 16 个 390 × 844 Frame。
- 设计归档：[2026-11-25 归档](../../design/exports/2026-11-25-nutripal-v2/README.md)。
- 实现版本：NutriPal v1.1；视觉层重设计，数据和 /api/v1 契约保持兼容。
- Figma 是视觉事实源；工程实现不等于逐像素复制设计稿。

## 已确认的实现解释

- **Figma 图标原样**：F01 菜系使用 Figma emoji；F02–F06/F03b 的食物、通知、设置和状态图标使用从 Figma 导出的 SVG（public/figma-icons），不自行绘制替代资产。
- **不显示设备外观**：不实现 Figma 的 9:41 状态栏、信号/电池和 44px 圆角手机框；Web 原型使用最大 390px 的内容列。
- **移动端固定缩放**：按要求禁止双指放大（viewport、touch-action 与 iOS gesture 事件）；保留单指滚动和输入框聚焦。所有输入框字号至少 16px，防止 iOS 聚焦自动放大。
- **响应式布局**：移动端保持单列；768px 起 App 使用流体宽度，860px 起 Me 双列，900px 起 Home 双列；底部导航居中且不随内容无限拉伸。
- **大字号**：Me 中的 Large text 开关全局生效并持久化；所有显式字号通过 text boost 增加 2px，继承文本同步放大，页面滚动而不复制固定画框裁切。
- **Me 保留 v1.0 信息**：在 Figma 三组内容之外，保留语言、今日目标、偏好摘要、提醒预览、Nudges 入口和隐私说明。
- **自定义忌口**：F01 的 + Add 打开本地 Sheet，可添加任意食材/过敏原，不新增后端字段。

## 当前交付要求

### 必须包含

- 统一视觉 token、组件和底部导航。
- 核心任务的可点击页面流，按钮连接真实目标页面或已记录的 Sheet/演示态。
- F02 菜品搜索接入 Supabase 兼容 Mock（91 道在线/内置菜谱），支持中英文、多词、相似结果与为空时的推荐菜谱。
- F01 自定义忌口、保存和编辑模式返回 Me。
- Me 的大字号开关、语言切换、偏好与通知入口。
- 主动建议的接受、推迟、关闭和解释入口。
- 对 Mock 能力与真实 API 依赖的清晰区分。

### 不要求

- 真实 GPS、天气、食谱、通知或相机权限。
- 真实图像识别、后端、账号或商店发布。
- Figma 状态栏或设备边框；emoji 字形允许随系统字体略有平台差异。

## 页面规划

| Frame | 页面 | 目的 | 当前实现 |
| --- | --- | --- | --- |
| F01 | Dietary & Cultural Preferences | 菜系、饮食方式、忌口/过敏与自定义添加 | 已实现，含编辑模式 |
| F02 | Personalised Meal Recommendations | 营养摘要、搜索、推荐和 See all | 已实现，91 道菜谱 Mock 搜索 |
| F03 | Practical Meal Planning | 周餐单、预算、烹饪时间、食材和购物清单入口 | 已实现，含日期/换餐/编辑/重生成 |
| F03b | Shopping List | 采购项、预算、已有食材、勾选与分享 | 已实现，含配送演示 |
| F04 | Context-Aware Proactive Assistance | 锁屏式主动建议与情境解释 | 已实现，渐变背景与全部动作 |
| F05 | Notification Control & Explanation | 总开关、Snooze、频率、类别、解释与反馈 | 已实现 |
| F06 | AI Food Recognition & Calorie Estimation | 模拟识别、份量、营养与日志 | 已实现，Mock 识别 |
| Me | Profile & Settings | 个人资料、偏好、通知、语言、大字号等设置 | 已实现，保留 v1.0 内容 |

## 交付前检查

- [x] 8 个页面均有路由和可访问入口。
- [x] 默认/大字号两种字号状态均可用。
- [x] 关键按钮连接到真实页面、Sheet 或已记录的演示态。
- [x] 原型明确区分 Mock 数据与真实能力。
- [x] F01 emoji 与 F02–F06/F03b SVG 图标均与 Figma 一致；不使用模拟设备 chrome。
- [ ] 完成一次团队点击走查。
- [ ] 完成至少一名目标用户的原型测试并记录问题。

