# FloraLink Flutter App

FloraLink 是一款面向花友的移动端应用，集植物管理、花期观测、社区互动与智能助手于一体。本仓库提供 Flutter 版本的客户端代码，可直接在 Android 或 iOS 设备上运行。

## ✨ 功能概览
- **仪表盘**：汇总花园概览、任务提醒、最新社区动态。
- **我的花园**：管理养护中的植物，查看养护建议与成长时间轴。
- **花期观测**：浏览地图与列表，了解各地实时花期，并可上传观测。
- **社区**：浏览花友圈子与帖子，参与讨论或分享照片。
- **植物百科**：查询植物资料，收藏常见植物。
- **智能助手**：向 AI 提问养护难题，获取即时建议。

## 🛠️ 开发环境
- Flutter 3.22+
- Dart 3.4+
- Android Studio / VS Code with Flutter 插件

## 🚀 快速开始
```bash
git clone https://github.com/1204-y/FloraLink.git
cd FloraLink
flutter pub get
flutter run
```

应用默认使用内置的演示数据与可配置的 REST API 客户端：
- 若已有后端，可在 `lib/services/api_config.dart` 中调整 `baseUrl`。
- 若暂无后端，可使用应用自带的本地假数据进行演示。

## 📁 目录结构
```
lib/
  app.dart               # App 根组件与路由
  main.dart              # 入口文件
  theme/                 # 主题与样式
  services/              # API、定位等服务
  models/                # 数据模型定义
  features/              # 各功能模块页面与组件
    dashboard/
    garden/
    observations/
    communities/
    encyclopedia/
    assistant/
  widgets/               # 通用 UI 组件
assets/
  images/                # 图片资源
```

## 🧪 测试
```bash
flutter test
```

当前仓库未包含端到端测试，可根据业务需求自行拓展。

## 📄 许可证
MIT License
