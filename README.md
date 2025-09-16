# FloraLink

「花集 · FloraLink」是一个面向花友的社区平台，融合植物百科、线上花园、花期观测地图与 AI 养护助手。本仓库包含：

- **backend/**：基于 [FastAPI](https://fastapi.tiangolo.com/) 的后端服务，负责认证、植物与社区等核心能力；
- **frontend/**：使用 [Vite](https://vitejs.dev/) + React 构建的前端原型，覆盖仪表盘、花园、观测、社区、百科与智能助手页面。

---

## 后端（FastAPI）

### 功能概览
- 用户注册 / 登录与 JWT 鉴权
- 植物品种、个人花园与成长时间轴
- 养护提醒与任务规划
- 花期观测 crowdsourcing 数据
- 地域 / 品种社区圈子与帖子互动

### 开发环境准备
1. **创建虚拟环境（可选）**
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

2. **安装依赖**
   ```bash
   pip install -e .
   ```
   如需测试工具，执行：
   ```bash
   pip install -e .[test]
   ```

3. **启动服务**
   ```bash
   uvicorn floralink_backend.main:app --reload
   ```
   默认监听 `http://127.0.0.1:8000`，所有 API 以 `/api` 为前缀。

### 运行测试
```bash
pytest
```

### 目录结构
```
backend/
  floralink_backend/
    core/           # 配置与安全工具
    routers/        # FastAPI 路由模块
    database.py     # 数据库连接与 Session 管理
    models.py       # SQLAlchemy ORM 模型
    schemas.py      # Pydantic 请求 / 响应模型
    main.py         # FastAPI 应用入口
  tests/            # Pytest 集成测试
```

> 默认使用 SQLite 数据库，可通过 `FLORALINK_DATABASE_URL` 等环境变量覆盖。

---

## 前端（Vite + React）

### 功能概览
- 「今日亮点」仪表盘：养护进度、观测提醒、AI 问答等核心指标
- 「我的花园」：植物卡片、成长时间轴、待办任务
- 「城市花期地图」：观测点卡片与赏花推荐
- 「圈子广场」：社区圈子、热门帖子与互动入口
- 「植物百科」：推荐植物列表、亮点标签
- 「智能助手」：AI 问答建议与关联话题

### 开发环境准备
1. 安装依赖（首次执行需要下载 npm 依赖）：
   ```bash
   cd frontend
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```
   Vite 会默认启动在 `http://127.0.0.1:5173`，已配置将 `/api` 代理到本地 FastAPI 服务。

3. 构建生产版本：
   ```bash
   npm run build
   ```

前端目前以内置的示例数据渲染界面，可在 `/src/data/mockData.ts` 中对接真实 API。

---

## 联调建议
1. 启动后端 `uvicorn` 服务，确保可访问 `http://127.0.0.1:8000/api/...`。
2. 在 `frontend` 目录执行 `npm run dev`，浏览器访问 `http://127.0.0.1:5173`。
3. 根据需要调整 `frontend/src/api` 相关代码以接入真实接口，或替换示例数据。

欢迎继续扩展更多花友玩法与商业模式！
