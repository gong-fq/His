# Chronos: 英国历史探索

龚凤乾教授设计的交互式英国历史时间线学习工具，集成 DeepSeek AI 智能问答助手。

## 功能特点

- 📚 13个英国历史时代的详细介绍
- 🎯 中英双语内容展示
- 🔊 语音朗读功能
- 🤖 AI智能历史助手（基于 DeepSeek API）
- 📖 权威参考资料链接

## 快速部署到 Netlify

### 1. 准备工作

确保您拥有：
- GitHub 账户
- Netlify 账户（可使用 GitHub 登录）
- DeepSeek API Key（从 https://platform.deepseek.com 获取）

### 2. 部署步骤

#### 方法一：通过 Netlify 网站部署（推荐）

1. **上传到 GitHub**
   - 创建新的 GitHub 仓库
   - 将所有文件上传到仓库

2. **连接 Netlify**
   - 登录 https://app.netlify.com
   - 点击 "Add new site" > "Import an existing project"
   - 选择 "GitHub"，授权并选择您的仓库

3. **配置构建设置**
   - Build command: `echo 'No build required'`
   - Publish directory: `.`（保持空或输入当前目录）
   - 点击 "Deploy site"

4. **设置环境变量**
   - 进入 Site settings > Environment variables
   - 添加变量：
     - Key: `DEEPSEEK_API_KEY`
     - Value: 您的 DeepSeek API Key
   - 保存后重新部署站点

#### 方法二：通过 Netlify CLI 部署

1. **安装 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登录 Netlify**
   ```bash
   netlify login
   ```

3. **初始化项目**
   ```bash
   cd /path/to/your/project
   netlify init
   ```

4. **设置环境变量**
   ```bash
   netlify env:set DEEPSEEK_API_KEY your_deepseek_api_key_here
   ```

5. **部署**
   ```bash
   netlify deploy --prod
   ```

### 3. 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **创建 .env 文件**
   ```bash
   cp .env.example .env
   ```
   然后编辑 `.env` 文件，添加您的 API Key：
   ```
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   ```

3. **启动开发服务器**
   ```bash
   netlify dev
   ```

4. **访问应用**
   打开浏览器访问 http://localhost:8888

## 文件结构

```
chronos-british-history/
├── index.html              # 主页面
├── netlify.toml           # Netlify 配置
├── package.json           # 项目配置
├── .env.example          # 环境变量模板
├── README.md             # 说明文档
└── netlify/
    └── functions/
        └── chat.js       # AI 聊天后端函数
```

## 使用说明

### 浏览历史时代
- 左侧导航栏选择不同的历史时期
- 查看中英双语内容
- 点击语音按钮听取朗读

### AI 助手功能
- 点击右下角蓝色聊天按钮
- 输入关于当前历史时期的问题
- AI 助手将基于专业历史知识回答

### 示例问题
- "这个时代有哪些重要事件？"
- "请介绍一下这个时期的主要特征"
- "有哪些著名的历史人物？"
- "这个时代对后世有什么影响？"

## 技术栈

- **前端**: React (CDN), TailwindCSS
- **后端**: Netlify Functions (Node.js)
- **AI**: DeepSeek API
- **部署**: Netlify

## 注意事项

1. **API Key 安全**
   - 永远不要将 API Key 直接写在前端代码中
   - 使用环境变量存储敏感信息
   - 不要将 `.env` 文件提交到 Git

2. **成本控制**
   - DeepSeek API 调用会产生费用
   - 建议设置 API 使用限额
   - 监控 API 调用次数

3. **Git 配置**
   创建 `.gitignore` 文件：
   ```
   .env
   node_modules/
   .netlify/
   ```

## 故障排查

### AI 助手无响应
- 检查环境变量是否正确设置
- 验证 DeepSeek API Key 是否有效
- 查看 Netlify Functions 日志

### 部署失败
- 确认所有文件都已上传
- 检查 `netlify.toml` 配置
- 查看 Netlify 部署日志

## 获取帮助

- DeepSeek API 文档: https://platform.deepseek.com/docs
- Netlify 文档: https://docs.netlify.com
- Netlify Functions 指南: https://docs.netlify.com/functions/overview

## 许可证

MIT License

## 作者

龚凤乾教授

---

享受探索英国历史的旅程！🇬🇧📖
