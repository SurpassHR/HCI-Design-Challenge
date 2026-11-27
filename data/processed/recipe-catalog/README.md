# 公共菜谱 Mock 数据集

> 用途：为 NutriPal 原型提供本地“Supabase 兼容”菜谱表，支持 F02 搜索与详情 Sheet。
> 数据不是用户数据；所有在线菜谱保留来源链接。

## 1. 来源与抓取

- 来源：TheMealDB 公开 API（https://www.themealdb.com/api.php）
- 抓取时间：2026-11-26T14:02:25.705Z
- 方法：按 14 个分类抓取每类前 5 条，并补充 sushi、tofu、ramen、burger、taco、pizza、curry、dumpling 关键词结果；按 TheMealDB meal ID 去重。
- 外部菜谱：86 条
- 原型内置推荐：5 条
- 总计：91 条
- 运行时文件：[src/data/recipe-catalog.json](../../../src/data/recipe-catalog.json)

分类分布：

| 分类 | 数量 |
| --- | ---: |
| Beef | 8 |
| Breakfast | 5 |
| Chicken | 7 |
| Dessert | 5 |
| Goat | 2 |
| Lamb | 7 |
| Miscellaneous | 7 |
| Pasta | 5 |
| Pork | 8 |
| Seafood | 8 |
| Side | 6 |
| Starter | 5 |
| Vegan | 5 |
| Vegetarian | 8 |

## 2. 存储字段

| 字段 | 说明 |
| --- | --- |
| id | 稳定标识；TheMealDB 记录使用 themealdb-{mealId} |
| title | 菜名对象：en / zh；86 道 TheMealDB 菜谱与 5 道本地菜均补齐中文名 |
| category / area | 分类和地区 |
| ingredients | 食材名称数组（不含完整做法） |
| glyph | 前端矢量图标映射 |
| origin | themealdb 或 nutripal |
| sourceName / sourceUrl | 来源名称与原始菜谱页面 |
| keywords / searchText | 英文、中文别名与检索文本 |
| minutes / calories / price / reason | 仅原型内置推荐包含 |

不复制 TheMealDB 的完整烹饪步骤和图片；详情 Sheet 提供原始页面链接。

## 3. Mock Supabase 结构

- 客户端：[src/data/mock-supabase.ts](../../../src/data/mock-supabase.ts)
- 查询层：[src/data/recipe-repository.ts](../../../src/data/recipe-repository.ts)
- 支持链式 select / ilike / or / limit 和 thenable 结果，模拟 PostgREST 查询形态。
- 表名固定为 recipes；字段同时接受 SQL 风格 search_text 与前端 camelCase。
- 替换真实 Supabase 时，只需把 mock client 替换为 createClient(...)，并保持 recipes 表结构与查询字段。
- 菜谱 Sheet 的 4 步“简单做法”由 [recipe-steps.ts](../../../src/data/recipe-steps.ts) 提供：5 道 NutriPal 内置菜谱使用定制步骤，其余按菜品类别生成；不复制 TheMealDB 完整做法。

## 4. 搜索行为

1. 规范化查询：NFKD、去除变音符号、折叠 æ/ø/ß 等拉丁连字、小写、标点和空格归一化。
2. 搜索覆盖英中标题、关键词、食材、分类、地区和 searchText，不依赖单一语言字段。
3. 英文短前缀优先匹配菜名词边界（chi → Chicken/Chilli），避免分类/食材泛匹配。
4. 3 个字符起的拉丁词支持 1 个字符的拼写容错，7 个字符起最多允许 2 个字符，例如 tou/toufu → tofu、pabellon → Pabellón、farikal → Fårikål。
5. 中文查询同时匹配中文标题、关键词与食材，并允许单字查询（如“鸡”），结果按标题优先排序并显示中文菜名。
6. 仍无结果时返回 4 条推荐菜谱作为可操作建议。
7. 中文别名覆盖常见食材、分类和地区，例如 豆腐、寿司、鸡肉、咖喱、意大利、日本。

## 5. 验证

- 91 条记录均有唯一 ID、标题、分类、地区、食材和 searchText。
- 英文、短前缀与转写查询：tofu、tou、toufu、sushi、chicken、pasta、curry 均有结果。
- 中文查询：豆腐、寿司、鸡肉、咖喱均有结果。
- 变音符号缺省查询：pabellon、aebleskiver、farikal 均能匹配归档菜名。
- 每个菜谱的 title 同时包含英文与中文名称；搜索和结果展示按当前 UI 语言切换。
- 未知查询返回 suggestions，不出现无响应状态。
- 自动测试见 [recipe-search.test.ts](../../../src/test/recipe-search.test.ts)。

## 6. 许可与更新

- 原型仅使用菜名、分类、地区、食材名称等事实性元数据，并链接回原始页面。
- 如用于公开发布，需再次核对 TheMealDB 的使用条款与署名要求。
- 更新数据时保留 retrievedAt、来源 URL 和稳定 ID，不覆盖用户本地偏好。

