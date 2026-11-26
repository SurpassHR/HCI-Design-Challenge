# 用户研究与竞品分析

## 研究目标

在确定功能与界面之前，了解大学生在饮食、活动和作息方面的真实习惯、困难与应对策略，并判断主动式健康建议的接受度及隐私边界。

当前 V3 问卷聚焦饮食与营养；体力活动和作息尚未进入本轮问卷，是否保留为产品范围仍待小组确认。

## 研究工作流

1. **问卷**：建立伦理声明，覆盖健康习惯、困难、现有方案、主动建议、通知偏好和功能偏好。
2. **竞品分析**：先搜索真实竞品及用户反馈，再由成员人工核实；拒绝直接采用未经核对的 AI 结论。
3. **需求综合**：把发现归纳为具体问题、设计机会和首轮基础功能，而不是继续扩展功能清单。
4. **形成性评估**：原型阶段验证主动建议的时机、内容、控制方式与隐私接受度。

## 当前状态

| 工作项 | 状态 | 依据 |
| --- | --- | --- |
| 问卷版本 | V3 为当前第三版 | 已核对第三次会议修改并完成题号映射 |
| 文化/种族、通知偏好、核心功能偏好 | 已完成 | Q4–5、Q15–18、Q20 覆盖相关维度 |
| 伦理声明 | 已完成 | 线下匿名访谈与记录；课程不要求正式审批；最终仅保留匿名汇总数据 |
| 认知预测试 | 待开始 | 计划 3–5 名目标用户，尚未执行 |
| 正式发放与数据分析 | 待开始 | 受认知预测试与招募安排阻塞；伦理说明已完成 |
| V3 结果归档 | 已归档（模拟数据） | 100 条 AI 生成回答；跳题、唯一 ID 与多选计数已校验；不代表真实调研 |
| 竞品搜索与人工核对 | 要求已记录 | 第二次会议待办，负责人 @全体成员 |
| 确定首轮基础功能 | 待确认 | 原计划在完成问卷与竞品分析后决定 |

## 资料入口

- [潜在用户分析、三张模拟人物卡与健康饮食故事版（HTML）](potential-users/NutriPal-research-and-evaluation.html) · [评论编码样本](potential-users/nutripal_review_sample_30.csv)

- [问卷工作区](questionnaire/README.md)
- [V3 参与者问卷](questionnaire/questionnaire-v3-participant.md)
- [V3 修订与设计映射报告](questionnaire/questionnaire-v3-design-report.md)
- [V3 模拟结果归档](../../data/processed/questionnaire-v3/README.md)
- [原始 DOCX 与文本快照](questionnaire/source/README.md)
- [伦理声明状态](questionnaire/ethics-statement.md)
- [竞品分析工作区](competitor-analysis/README.md)
- [竞品矩阵模板](competitor-analysis/competitor-matrix.csv)

## 数据与隐私

- 不放具有可识别个人信息的原始问卷、访谈录音或联系人信息进入 Git。
- 原始数据请放 `data/raw/`，该目录已在 `.gitignore` 中排除。
- 共享给团队的分析文件应去标识化后放入 `data/processed/`。
