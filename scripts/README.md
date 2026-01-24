# 项目数据自动化更新脚本

## 📝 说明

这个脚本用于自动从 GitHub API 导出的 JSON 文件中提取项目信息，并生成 VitePress 项目展示页面所需的 TypeScript 配置文件。

## 🚀 使用方法

### 1. 更新项目数据

当你的 `docs/FeHelper-20260124141556.json` 文件更新后，运行以下命令：

```bash
npm run update:projects
```

或者直接运行脚本：

```bash
node scripts/generate-projects.cjs
```

### 2. 查看结果

脚本会自动：
- ✅ 读取 `docs/FeHelper-20260124141556.json`
- ✅ 提取项目的关键信息（name, description, stars, language, homepage, topics）
- ✅ 按 stars 数量排序
- ✅ 自动分类到不同的类别
- ✅ 生成 `docs/.vitepress/projects.ts` 文件
- ✅ 输出详细的统计信息

## 📊 项目分类规则

脚本会根据以下规则自动分类项目：

| 分类 | 规则 |
|------|------|
| 🔥 热门项目 | stars >= 20 |
| 🛠️ 构建工具 & 工程化 | 包含 vite, webpack, bundle, esbuild, rolldown 等关键词 |
| ⚛️ React 生态 | 语言为 TypeScript/JavaScript 且包含 react, hooks 等关键词 |
| 🌲 Vue 生态 | 语言为 Vue 或包含 vue, pinia 等关键词 |
| 📦 工具库 & SDK | 包含 sdk, library, kit, processor 等关键词 |
| 🔨 编译器 & 转换工具 | 包含 compiler, babel, jsx, oxc, formatter 等关键词 |
| 🎨 可视化 & 图形 | 包含 chart, draw, canvas, visualization 等关键词 |
| 🔍 开发工具 | 包含 cli, finder, proxy, commit 等关键词 |
| 🦀 Rust 项目 | 语言为 Rust |
| 🟢 Node.js & 后端 | node, koa, express 或语言为 Go |
| 💻 桌面应用 & 扩展 | 包含 electron, tauri 等关键词 |
| 🤖 AI & 机器学习 | 包含 ai, machine-learning 等关键词 |
| 🎮 其他项目 | 不符合以上规则的项目 |

## ⚙️ 配置

可以在 `scripts/generate-projects.cjs` 文件顶部修改配置：

```javascript
const CONFIG = {
    inputFile: path.join(__dirname, '../docs/FeHelper-20260124141556.json'),
    outputFile: path.join(__dirname, '../docs/.vitepress/projects.ts'),
    minStarsForFeatured: 20,        // 热门项目的最低 stars 数
    maxTagsPerProject: 3,            // 每个项目显示的最大标签数
};
```

## 🎨 自定义图标

在脚本中的 `iconMap` 对象中添加或修改项目图标：

```javascript
const iconMap = {
    'your-project-name': '🚀',
    // ... 更多图标映射
};
```

## 🔧 容错机制

脚本包含完善的容错机制：

- ✅ 自动验证 JSON 文件是否存在
- ✅ 自动验证 JSON 数据格式
- ✅ 处理缺失的字段（description, homepage, topics 等）
- ✅ 分类失败时自动归类到"其他项目"
- ✅ 生成代码失败时使用默认模板
- ✅ 详细的日志输出，便于排查问题

## 📝 输出示例

```
ℹ️  正在读取项目数据...
✅ 成功读取 80 个项目
ℹ️  项目按 stars 排序完成
ℹ️  开始分类项目...
ℹ️  生成 TypeScript 代码...
✅ projects.ts 生成成功！

📊 项目统计:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 总项目数: 80
🔥 热门项目: 5
🛠️  构建工具: 12
⚛️  React: 7
🌲 Vue: 4
📦 工具库: 5
🔨 编译器: 6
🎨 可视化: 4
🔍 开发工具: 5
🦀 Rust: 6
🟢 后端: 3
💻 桌面应用: 1
🤖 AI: 1
🎮 其他: 21
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ✨ 所有任务完成！
```

## 🔄 工作流程

1. 从 GitHub 导出项目数据到 `docs/FeHelper-20260124141556.json`
2. 运行 `npm run update:projects`
3. 脚本自动生成 `docs/.vitepress/projects.ts`
4. VitePress 自动读取配置并渲染项目展示页面

## 🐛 故障排除

### 问题：找不到输入文件

确保 `docs/FeHelper-20260124141556.json` 文件存在且路径正确。

### 问题：JSON 解析失败

检查 JSON 文件格式是否正确，可以使用在线 JSON 验证工具。

### 问题：生成的文件有语法错误

脚本会自动转义特殊字符，如果仍有问题，检查项目描述中是否包含特殊字符。

## 📄 许可

MIT License
