# 风电运维系统 REST API 规范



## 1. 仪表盘（Dashboard）

### GET `/api/dashboard/summary`
- 说明：获取首页概览数据
- Query
  - `farmId` (可选) - 风场 ID
  - `dateRange` (可选) - 时间范围，例如 `7d`, `30d`
- 响应
  - `title` - 页面标题
  - `subtitle` - 页面副标题
  - `status` - 系统状态，如 `online`
  - `statusLabel` - 显示标签文本，如 `系统在线`
  - `overallMetrics`
    - `coordinationRate` - 任务协同成功率（百分比）
    - `responseTime` - 闭环响应时间（小时）
  - `turbineStatusList` - 风机状态展示块
    - `turbineName`
    - `status` - `normal` / `review` / `high_risk`

### GET `/api/dashboard/kpis`
- 说明：获取首页 KPI 卡片数据
- 响应
  - `items` - 数组
    - `title`
    - `value`
    - `sub`
    - `icon` (可选) - 图标类型

### GET `/api/dashboard/trends`
- 说明：获取首页趋势图数据
- Query
  - `period` (可选) - `week` / `month`
- 响应
  - `weeklyTrend` - 数组
    - `name` - 周几
    - `defect`
    - `close`
    - `risk`
  - `highRiskTrend` - 可选，若前端拆分为单独接口

---

## 2. 实时监控（Monitor）

### GET `/api/monitor/farm-health`
- 说明：获取风场健康度数据
- Query
  - `farmId` (可选)
- 响应
  - `farmHealth` - 数组
    - `name` - 风场名称
    - `score` - 健康评分

### GET `/api/monitor/timeline`
- 说明：获取实时事件流 / 业务时间线
- Query
  - `limit` (可选)
- 响应
  - `timeline` - 数组
    - `time`
    - `title`
    - `type` - `planning` / `detect` / `risk` / `decision` / `work`
    - `desc` - 事件说明

---

## 3. 缺陷识别（Detect）

### GET `/api/defects`
- 说明：获取缺陷列表
- Query
  - `page` (可选)
  - `limit` (可选)
  - `status` (可选)
  - `priority` (可选)
  - `turbine` (可选)
  - `search` (可选)
- 响应
  - `total`
  - `page`
  - `limit`
  - `items` - 数组
    - `id`
    - `turbine`
    - `blade`
    - `type`
    - `level`
    - `confidence`
    - `area`
    - `status`
    - `desc`

### GET `/api/defects/{id}`
- 说明：获取单条缺陷详情
- 响应
  - `id`
  - `turbine`
  - `blade`
  - `type`
  - `level`
  - `confidence`
  - `area`
  - `status`
  - `desc`
  - `createdAt`
  - `updatedAt`
  - `location` (可选)
  - `severityScore` (可选)

### GET `/api/defects/{id}/images`
- 说明：获取缺陷图像 / 热力图 / 检测框
- 响应
  - `images` - 数组
    - `type` - `visible` / `infrared` / `heatmap`
    - `url`
    - `annotations` (可选)
      - `x`
      - `y`
      - `width`
      - `height`
      - `label`

### GET `/api/defects/types`
- 说明：获取缺陷类型分布
- 响应
  - `defectTypes` - 数组
    - `name`
    - `value`

---

## 4. 风险评估（Risk）

### GET `/api/risk/assessment`
- 说明：获取风险评估结果
- Query
  - `defectId` (可选)
  - `farmId` (可选)
- 响应
  - `score` - 风险评分
  - `model` - 模型名称
  - `summary`
  - `indicators` - 数组
    - `name`
    - `value`
    - `description`

### GET `/api/risk/suggestions`
- 说明：获取自动化风险建议
- Query
  - `defectId` (可选)
  - `turbine` (可选)
- 响应
  - `suggestions` - 数组
    - `title`
    - `desc`

### GET `/api/knowledge`
- 说明：获取知识库检索结果
- Query
  - `q`
  - `page` (可选)
  - `limit` (可选)
- 响应
  - `items` - 数组
    - `id`
    - `title`
    - `summary`
    - `source`
    - `link`

---

## 5. 运维工单（Workorder）

### GET `/api/workorders`
- 说明：获取工单列表
- Query
  - `page` (可选)
  - `limit` (可选)
  - `status` (可选)
  - `priority` (可选)
  - `turbine` (可选)
  - `team` (可选)
  - `search` (可选)
- 响应
  - `total`
  - `page`
  - `limit`
  - `items` - 数组
    - `id`
    - `turbine`
    - `priority`
    - `team`
    - `eta`
    - `state`
    - `createdAt` (可选)
    - `updatedAt` (可选)

### GET `/api/workorders/{id}`
- 说明：获取单个工单详情
- 响应
  - `id`
  - `turbine`
  - `priority`
  - `team`
  - `eta`
  - `state`
  - `defectId` (可选)
  - `description`
  - `assignedTo` (可选)
  - `history` - 数组
    - `time`
    - `action`
    - `operator`

### POST `/api/workorders`
- 说明：新建工单
- Body
  - `turbine`
  - `priority`
  - `team`
  - `eta`
  - `state`
  - `defectId` (可选)
  - `description`
  - `assignedTo` (可选)
- 响应
  - `id`
  - `message`

### PATCH `/api/workorders/{id}`
- 说明：更新工单状态或信息
- Body
  - `priority` (可选)
  - `team` (可选)
  - `eta` (可选)
  - `state` (可选)
  - `assignedTo` (可选)
  - `description` (可选)
- 响应
  - `id`
  - `updatedFields`
  - `message`

---

## 6. 搜索与导出

### GET `/api/search`
- 说明：顶部搜索框的搜索接口
- Query
  - `q`
  - `type` (可选) - `defect` / `workorder` / `turbine`
- 响应
  - `results`
    - `defects` - 数组
    - `workorders` - 数组
    - `turbines` - 数组

### POST `/api/reports/export`
- 说明：导出答辩报告
- Body
  - `type` - `demo` / `summary` / `custom`
  - `fromDate` (可选)
  - `toDate` (可选)
  - `filters` (可选)
- 响应
  - `reportId`
  - `downloadUrl`
  - `expiresAt`

---

## 7. 可选认证（如果后续加登录）

### POST `/api/auth/login`
- Body
  - `username`
  - `password`
- 响应
  - `token`
  - `user`
    - `id`
    - `name`
    - `role`

### GET `/api/auth/me`
- 说明：获取当前登录用户信息
- 响应
  - `id`
  - `name`
  - `role`
  - `permissions`

---

## UI 数据对应说明

- `DashboardPage`
  - `/api/dashboard/summary`
  - `/api/dashboard/kpis`
  - `/api/dashboard/trends`
- `MonitorPage`
  - `/api/monitor/farm-health`
  - `/api/monitor/timeline`
- `DetectPage`
  - `/api/defects`
  - `/api/defects/{id}`
  - `/api/defects/{id}/images`
  - `/api/defects/types`
- `RiskPage`
  - `/api/risk/assessment`
  - `/api/risk/suggestions`
  - `/api/knowledge`
- `WorkorderPage`
  - `/api/workorders`
  - `/api/workorders/{id}`
  - `/api/workorders` (POST)
  - `/api/workorders/{id}` (PATCH)
- `TopBar/search`
  - `/api/search`
- `导出答辩报告按钮`
  - `/api/reports/export`
