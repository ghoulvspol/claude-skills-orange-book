# Claude Code Skills 橙皮书

用技能扩展AI编程的边界

**版本**: v1.0
**作者**: 滔哥
**为谁创建**: Claude Code 用户、AI 工具开发者、技术团队负责人
**基于**: Claude Code Skills 生态（2026年5月）
**最后更新**: 2026年5月4日
**适用场景**: 技能开发、工作流定制、团队效率提升、AI 编程进阶

---

## 前言

2026年4月，我在一个项目里用了30多个 Skills。

不是因为我想收集，是因为每个 Skill 真的能解决一个问题。有的帮我写测试，有的帮我做设计，有的帮我审查代码安全。以前这些事情要么手动做，要么写一堆脚本。现在一个 SKILL.md 文件就搞定了。

Claude Code Skills 是什么？一句话：**给 Claude Code 装技能包**。

你的 Claude Code 默认什么都会一点，但什么都不精。装上 Skill 之后，它在某个领域突然变强了。就像游戏里给角色装装备——本体能力不变，但输出完全不同。

这本书是我基于 Claude Code Skills 生态的实际使用经验写的深度手册。它不是功能列表的翻译，而是告诉你怎么用 Skills、怎么写 Skills、怎么用 Skills 构建完整的工作流。

**这本书能帮你做到什么：**

- 30分钟上手 Claude Code Skills，安装并使用第一个 Skill
- 1天内掌握 Skills 的核心机制，知道什么时候触发、怎么加载
- 1周内学会自己写 Skills，把你的工作流变成可复用的技能包
- 1个月内用 Skills 构建完整的开发流程，从编码到部署

**这本书不适合谁：**

- 想找"开箱即用完美方案"的人——Skills 需要你根据项目调整
- 不愿意写 SKILL.md 的人——最好的 Skill 是自己写的
- 把 AI 当万能的人——Skills 是工具，不是魔法

好，我们开始。

---

## 阅读指南

| 时间 | 章节 | 目标 |
|------|------|------|
| Day 1 | §01-§04 | 理解 Skills，安装并使用第一个 Skill |
| Day 2 | §05-§08 | 掌握触发机制，熟悉内置和社区 Skills |
| Day 3 | §09-§12 | 学会创建自己的 Skills |
| Day 4-5 | §13-§16 | 进阶技巧，多 Skills 协作 |
| Day 6 | §17-§24 | Skills 生态全集，七大类 Skill 详解 |
| Day 7 | §25-§29 | 工程化方法论、案例与 AI-Native 组织 |
| Day 8 | §30-§32 | 实战场景，综合运用 |

---

## Part 1: 认识 Skills

从零开始。读完这部分，你会知道 Skills 是什么、能做什么、跟其他扩展方式的本质区别是什么。

---

## §01 Skills 是什么

### 01.1 一个真实的场景

2026年3月。我在做一个 React 项目。写完功能代码，该写测试了。

以前的流程：打开 Jest 文档 → 复制模板 → 改改改 → 跑一下 → 报错 → 再改。一轮下来20分钟。

那天我试了一下项目里的一个 Skill。在 Claude Code 里输入 `/tdd`。Claude 自动读取了我的代码，理解了组件结构，生成了完整的测试文件。跑一下，过了。

3分钟。

这就是 Skills 的价值。**不是让 AI 更聪明，是让 AI 更专注。**

### 01.2 Skills 的本质

Skills 本质上是一个**指令包**。它告诉 Claude Code：

- 你是谁（角色定位）
- 你要做什么（任务描述）
- 你怎么做的（工作流程）
- 你用什么工具（脚本、参考文件）

没有 Skills，Claude Code 是一个什么都会的通才。
装上 Skills，Claude Code 是某个领域的专家。

```
Claude Code + Skills = 通才 + 专业装备
```

### 01.3 Skills vs 其他扩展方式

| 扩展方式 | 本质 | 适用场景 | 复杂度 |
|----------|------|---------|--------|
| CLAUDE.md | 全局指令 | 项目规范、通用规则 | 低 |
| Skills | 领域专精 | 特定任务的工作流 | 中 |
| Agents | 任务执行 | 多步骤自动化 | 高 |
| MCP Server | 外部能力 | 访问外部系统 | 高 |

**重点看第三列。**

CLAUDE.md 适合写"代码风格用2空格"这种全局规则。Skills 适合写"写测试时先分析代码结构再生成"这种专业工作流。Agent 适合做"从代码到部署"这种多步骤任务。MCP Server 适合连飞书、GitHub 这种外部系统。

它们不冲突，可以叠加。一个项目里，CLAUDE.md 定规范，Skills 定专业流程，Agent 做自动化。

### 01.4 核心价值

Skills 给 Claude Code 带来的三个核心价值：

**第一，专注。** 没有 Skills 的时候，Claude Code 每次都要从零理解你的需求。装上 Skill，它已经知道该怎么做。

**第二，复用。** 你花一下午调好的工作流，打包成 Skill，下次直接用。团队其他人也能用。

**第三，标准化。** 10个人用同一个 Skill，产出质量一致。不会出现"小王写得好，小李写得差"的情况。

> **滔哥的经验**：
>
> 我一开始觉得 Skills 是"高级用户才需要的东西"。用了一个月后发现，越是日常任务越需要 Skills。因为日常任务重复度高，一个好 Skill 能省下的时间是指数级的。

§01讲了"为什么"。§02讲 Skills 的文件结构——一个 Skill 到底长什么样。

---

## §02 Skills 的文件结构

### 02.1 一个 Skill 的最小组成

一个 Skill 最少只需要一个文件：

```
my-skill/
└── SKILL.md
```

就这么简单。SKILL.md 是 Skill 的核心。没有它，Skill 不存在。

### 02.2 SKILL.md 的两部分

SKILL.md 由两部分组成：

```markdown
---
name: my-skill
description: 这个 Skill 做什么
---

# 这里是 Skill 的正文

具体的工作流程、规则、模板...
```

**第一部分：YAML 前置元数据（frontmatter）**

用 `---` 包裹，定义 Skill 的基本信息。

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | Skill 的名称，用于 `/name` 触发 |
| description | 是 | 一句话描述，Claude 用它判断什么时候触发 |
| model | 否 | 指定使用的模型（haiku/sonnet/opus） |
| user-invocable | 否 | 是否可以被用户直接调用（默认 true） |

**第二部分：Markdown 正文**

告诉 Claude 具体怎么做。这是 Skill 的灵魂。

### 02.3 完整的 Skill 目录结构

一个完整的 Skill 可以包含更多内容：

```
my-skill/
├── SKILL.md              # 核心指令（必需）
├── scripts/              # 可执行脚本
│   ├── preamble.sh       # 前置脚本（每次触发先运行）
│   ├── build.sh          # 构建脚本
│   └── test.sh           # 测试脚本
├── references/           # 参考文档
│   ├── patterns.md       # 代码模式
│   └── examples/         # 示例代码
├── assets/               # 静态资源
│   ├── template.html     # 模板文件
│   └── config.json       # 配置文件
├── _metadata.json        # 元数据（版本、作者等）
└── tools.yml             # 工具声明
```

不是每个 Skill 都需要这些。简单的工作流只要 SKILL.md。复杂的工具型 Skill 才需要脚本和资源。

### 02.4 各目录的作用

| 目录 | 作用 | 什么时候用 |
|------|------|-----------|
| SKILL.md | 定义 Skill 的行为 | 必须 |
| scripts/ | 运行时执行的脚本 | 需要调用外部命令时 |
| references/ | 提供给 Claude 的参考文档 | 需要 Claude 参考模式或示例时 |
| assets/ | 模板和静态资源 | 需要生成文件时 |
| _metadata.json | Skill 的版本和元信息 | 发布到社区时 |
| tools.yml | 声明需要的工具 | Skill 依赖外部工具时 |

### 02.5 三级渐进式加载

这是 Skills 最精妙的设计。

```
Level 1: 元数据（始终在上下文中）
    ↓ 需要时加载
Level 2: SKILL.md 正文（触发时加载）
    ↓ 需要时加载
Level 3: 脚本和参考文件（按需加载）
```

**Level 1** 是 description 字段。它始终在 Claude 的上下文里，但只有一句话。Claude 用它判断"这个 Skill 跟当前任务相关吗"。

**Level 2** 是 SKILL.md 的正文。当 Claude 判断相关，或者用户直接输入 `/skill-name` 时，正文被加载。

**Level 3** 是脚本和参考文件。只有 SKILL.md 里明确引用时才加载。

这个设计很关键。因为上下文窗口有限。如果所有 Skill 的全部内容都加载，Claude 的上下文早就爆了。三级加载保证了：**只加载需要的，忽略不需要的。**

> **核心建议**：
>
> 写 Skill 时，把最重要的信息放在 SKILL.md 正文里。参考文件放 Level 3。不要把所有东西都塞进 SKILL.md——它会被优先加载，太大了浪费上下文。

§02讲了 Skill 长什么样。§03讲怎么安装和管理。

---

## §03 Skills 的安装和管理

### 03.1 三种安装方式

| 方式 | 命令 | 适用场景 |
|------|------|---------|
| npm | `npx skills add <name>` | 社区 Skills |
| 插件 | `/plugin install <name>` | 插件市场 Skills |
| 手动 | `git clone` + 复制目录 | 自定义 Skills |

### 03.2 npm 安装

最简单的方式。

```bash
npx skills add nuwa-skill
```

这条命令会：
1. 从 npm 下载 Skill 包
2. 复制到项目的 `.claude/skills/` 目录
3. 自动注册到 Claude Code

安装完成后，输入 `/nuwa-skill` 就能触发。

### 03.3 插件安装

如果 Skill 发布在 Claude Code 的插件市场：

```bash
/plugin install huashu-design
```

### 03.4 手动安装

最灵活的方式。适合你自己写的 Skill，或者从 GitHub 克隆的 Skill。

```bash
# 克隆仓库
git clone https://github.com/example/awesome-skill.git

# 复制到 skills 目录
cp -r awesome-skill .claude/skills/

# 或者直接在 .claude/skills/ 下创建
mkdir -p .claude/skills/my-skill
```

### 03.5 Skills 的存放位置

Skills 可以放在三个地方：

| 位置 | 路径 | 作用域 |
|------|------|--------|
| 项目级 | `项目/.claude/skills/` | 当前项目 |
| 用户级 | `~/.claude/skills/` | 所有项目 |
| 全局级 | npm / 插件市场 | 跨项目共享 |

**项目级**放项目特有的 Skills。比如这个项目的测试规范、部署流程。

**用户级**放你个人通用的 Skills。比如你写代码的习惯、常用的 prompt 模板。

**全局级**放社区共享的 Skills。经过社区验证，质量有保证。

### 03.6 查看已安装的 Skills

```bash
ls .claude/skills/
ls ~/.claude/skills/
```

每个目录就是一个 Skill。目录名就是 Skill 名。

### 03.7 卸载 Skills

```bash
rm -rf .claude/skills/my-skill
```

就这么直接。删除目录就卸载了。

> **滔哥的经验**：
>
> 我的习惯是：先装几个社区 Skills 跑通流程，然后开始自己写。社区 Skills 质量参差不齐，自己的才是最合手的。别怕写 SKILL.md，它比你想象的简单。

§03讲了安装。§04我们来做第一个项目——安装一个 Skill 并使用它。

---

## §04 第一个 Skill：10分钟上手

### 04.1 你需要什么

- Claude Code 已安装并可用
- 一个项目目录

预计时间：10分钟。

### 04.2 安装一个社区 Skill

打开终端，进入你的项目目录：

```bash
cd your-project
npx skills add alirezarezvani/claude-skills/skills/code-reviewer
```

如果 npm 不行，手动克隆：

```bash
git clone https://github.com/alirezarezvani/claude-skills.git /tmp/claude-skills
mkdir -p .claude/skills
cp -r /tmp/claude-skills/skills/code-reviewer .claude/skills/
```

### 04.3 查看 Skill 内容

```bash
cat .claude/skills/code-reviewer/SKILL.md
```

你会看到类似这样的结构：

```markdown
---
name: code-reviewer
description: Review code for best practices, bugs, and improvements
---

# Code Reviewer Skill

When reviewing code, follow this process:

1. **Read the code** - Understand what it does
2. **Check for bugs** - Look for common patterns
3. **Review style** - Check naming, structure
4. **Suggest improvements** - Actionable feedback
...
```

### 04.4 使用 Skill

打开 Claude Code：

```bash
claude
```

在 Claude Code 中输入：

```
/review
```

或者描述你的需求：

```
帮我审查一下 src/index.ts 的代码质量
```

Claude 会自动触发 code-reviewer Skill，按照 Skill 定义的流程审查你的代码。

### 04.5 看看输出

Skill 会按以下流程输出：

1. 读取代码文件
2. 分析代码结构
3. 列出发现的问题
4. 给出改进建议

每个步骤都有清晰的说明。比直接让 Claude "帮我看看代码" 专业得多。

### 04.6 回顾

10分钟，从安装到使用。跑通了这个流程，你就知道 Skills 是怎么回事了。

关键收获：

- Skills 就是一个目录，里面有一个 SKILL.md
- SKILL.md 定义了 Claude 的工作流程
- 安装就是复制目录，使用就是输入 `/skill-name`

§04完成了第一个项目。§05开始深入 Skills 的触发机制——Claude 怎么知道该用哪个 Skill。

> **核心建议**：
>
> 第一个 Skill 不要自己写。先用社区的，跑通流程，理解 Skills 是怎么工作的。然后再开始自己写。站在别人肩膀上，比从零开始效率高。

---

## Part 2: 使用 Skills

掌握 Skills 的触发和加载机制。读完这部分，你会知道 Skills 什么时候启动、怎么加载、怎么跟 Claude 的上下文配合。

---

## §05 Skills 的触发机制

### 05.1 两种触发方式

| 触发方式 | 示例 | 谁决定 |
|----------|------|--------|
| 用户显式触发 | `/review`、`/tdd` | 用户 |
| Claude 自动触发 | "帮我写测试" → 自动加载 tdd Skill | Claude |

**用户显式触发**最可靠。你输入 `/skill-name`，Claude 直接加载对应的 SKILL.md。

**Claude 自动触发**更智能。Claude 根据你的描述和 Skill 的 description 字段，判断哪个 Skill 最相关。但有时候会判断错。

### 05.2 description 字段的重要性

description 是 Skills 触发的关键。Claude 用它来判断"这个 Skill 跟当前任务相关吗"。

```yaml
# 好的 description
description: Review code for best practices, bugs, and security issues

# 不好的 description
description: A tool for code
```

好的 description 具体、明确。不好的 description 太模糊，Claude 不知道什么时候该触发。

### 05.3 显式触发的写法

```
/review              # 最简洁
/review src/main.ts  # 带参数
/skill:review        # 带前缀（如果配置了 SKILL_PREFIX）
```

### 05.4 自动触发的条件

Claude 自动触发 Skill 需要满足：

1. Skill 的 description 跟当前任务相关
2. Skill 的 user-invocable 不是 false
3. 当前没有其他 Skill 正在执行

如果你不想让某个 Skill 被自动触发：

```yaml
---
name: my-private-skill
description: 只有我知道的 Skill
user-invocable: false
---
```

### 05.5 冲突处理

如果多个 Skill 的 description 都跟当前任务相关，Claude 会选最相关的一个。如果分不清，Claude 会问你。

> **核心建议**：
>
> description 写得越具体，自动触发越准确。"Write unit tests using Jest with snapshot testing" 比 "Write tests" 好10倍。

---

## §06 Skills 的三级渐进式加载

### 06.1 为什么要渐进式加载

Claude 的上下文窗口有限。如果所有 Skill 的全部内容都加载进来，上下文早就爆了。

三级加载解决了这个问题：**只加载需要的，跳过不需要的。**

### 06.2 Level 1：元数据层

```
始终在上下文中
```

每个 Skill 的 name 和 description 始终在 Claude 的上下文里。这一层极小，几乎不占空间。

Claude 用这一层做快速判断："这个 Skill 跟当前任务有关吗？"

### 06.3 Level 2：SKILL.md 正文

```
触发时加载
```

当 Claude 判断相关，或者用户直接输入 `/skill-name` 时，SKILL.md 的正文被加载到上下文中。

这一层包含 Skill 的核心指令：工作流程、规则、模板。

### 06.4 Level 3：脚本和参考文件

```
按需加载
```

SKILL.md 里可以引用脚本和参考文件。只有当 Claude 执行到需要它们的步骤时，才会加载。

```markdown
## 参考文件

在写测试前，先读取 `references/test-patterns.md` 了解项目的测试模式。
```

Claude 读到这句话时，才会去加载 `references/test-patterns.md`。

### 06.5 加载流程图

```
用户输入
    ↓
Claude 读取所有 Skill 的 description（Level 1）
    ↓
判断哪个 Skill 最相关
    ↓
加载该 Skill 的 SKILL.md（Level 2）
    ↓
按需加载脚本和参考文件（Level 3）
    ↓
执行任务
```

### 06.6 上下文管理策略

| 策略 | 做法 | 效果 |
|------|------|------|
| description 精简 | 一句话说清楚 | Level 1 极小 |
| SKILL.md 聚焦 | 只放核心指令 | Level 2 适中 |
| 参考文件分离 | 模式和示例放 references/ | Level 3 按需 |
| 脚本外部化 | 复杂逻辑用脚本 | 不占上下文 |

> **滔哥的经验**：
>
> 我见过有人把整个 API 文档塞进 SKILL.md。结果每次触发 Skill，上下文就占了一大半。正确做法是把文档放到 references/ 目录，SKILL.md 里只写"需要时读取 references/api-docs.md"。加载时机由 Claude 决定。

---

## §07 常用内置 Skills 详解

### 07.1 什么是内置 Skills

Claude Code 本身带了一些基础能力。这些不算严格意义上的 Skills（没有 SKILL.md 文件），但它们的行为模式跟 Skills 一样：触发 → 加载指令 → 执行。

### 07.2 /commit

**用途**：智能提交代码

**工作流**：
1. 分析当前改动（git diff）
2. 自动生成规范的 commit message
3. 执行 git commit

**跟直接 git commit 的区别**：它会分析你的改动，生成有意义的 commit message。不是"fix bug"这种废话，而是"fix: resolve race condition in user auth middleware"这种有用的信息。

### 07.3 /review

**用途**：代码审查

**工作流**：
1. 读取代码文件
2. 检查代码风格、潜在 bug、安全问题
3. 给出具体的改进建议

**适合场景**：提交前自查、PR 前检查。

### 07.4 /help

**用途**：获取帮助

**工作流**：
1. 列出所有可用的 Skills
2. 显示每个 Skill 的简短说明
3. 给出使用建议

### 07.5 /clear

**用途**：清除上下文

**工作流**：
1. 清除当前对话的上下文
2. 保留项目配置

**什么时候用**：上下文太长，Claude 开始"忘事"的时候。

> **核心建议**：
>
> 内置 Skills 是起点，不是终点。用它们理解 Skills 的工作方式，然后开始自己写。自己写的 Skill 才是最适合你的。

---

## §08 社区 Skills 生态

### 08.1 生态概览

2026年5月，Claude Code Skills 生态已经相当成熟：

| 指标 | 数据 |
|------|------|
| 社区 Skills 数量 | 658+ |
| 最高星仓库 | 40K+（anthropics/skills 官方）|
| 覆盖领域 | 开发、设计、运维、文档、测试、数据分析、学术、视频 |

### 08.2 通用高频 Skills（必装）

根据社区共识，以下 Skills 解决了 Claude 最核心的痛点：

| 类别 | Skill 名称 | 核心功能 | 备注 |
|------|-----------|---------|------|
| 元技能 | find-skills | "技能的技能"，帮你搜索和安装其他 Skills | 建议第一个安装 |
| 联网搜索 | web-access | 解决原生联网弱问题，支持并行爬取 | 中文开发者推荐 |
| 联网搜索 | Web Search | 官方/通用网页搜索 | - |
| 开发核心 | Superpowers | 社区最火工作流，管开发全生命周期 | 安装量极高 |
| 开发核心 | Frontend Design | 注入设计系统，极大提升 UI 质量 | Anthropic 官方 |
| 开发核心 | Code Interpreter | 执行 Python 代码、调试、绘图 | - |
| 开发核心 | ralph-wiggum | 死磕代码，循环迭代直到跑通 | 适合模糊需求 |
| 文档处理 | Document Reader | 读取 PDF/Word/PPT | - |
| 文档处理 | docx/pdf/xlsx | 官方 Office 套件处理 | Anthropic 官方 |

### 08.3 高星数仓库榜单（>1K Stars）

以下是在 GitHub 上星数超过 1K 的顶级仓库，质量经过社区验证：

| 仓库 | Stars | 特点 |
|------|-------|------|
| anthropics/skills | 40K+ | 官方正统，含文档处理、MCP 构建等基础能力 |
| affaan-m/everything-claude-code | 25K+ | 黑客松冠军，包含子代理和工作流 |
| sickn33/antigravity-awesome-skills | 23K+ | 海量技能，支持 CLI 一键安装 |
| obra/superpowers | 22K+ | 社区之王，20+ 实战技能，工程化首选 |
| ComposioHQ/awesome-claude-skills | 19K+ | 大合集，分类清晰，覆盖面广 |
| VoltAgent/awesome-agent-skills | 18K+ | 跨平台，兼容 Claude/Codex/Gemini |
| alchaincyf/nuwa-skill | 17K+ | 思维蒸馏，"蒸馏任何人的思维方式" |
| alchaincyf/huashu-design | 11.7K | HTML 原生设计，20种风格评审 |
| alirezarezvani/claude-skills | 5K+ | 235个生产级 Skills，按岗位分类 |
| K-Dense-AI/claude-scientific-skills | 5K+ | 科研专属，140+ 科学领域技能 |

### 08.4 怎么选择社区 Skills

选 Skill 的三个标准：

1. **Stars 数**：超过 100 的一般靠谱
2. **最近更新**：3个月内有更新的
3. **SKILL.md 质量**：结构清晰、说明具体

### 08.5 社区 Skills 的局限

社区 Skills 有几个问题：

- **质量参差不齐**：有些是半成品
- **不一定适合你的项目**：通用 vs 项目特定
- **可能过时**：Claude Code 更新后，旧 Skill 可能不兼容

> **滔哥的经验**：
>
> 我装过30多个社区 Skills。真正长期在用的不到5个。原因很简单：社区 Skills 是通用的，我的项目是特定的。最好的策略是：用社区 Skills 学习怎么写，然后自己写适合自己的。

---

## Part 3: 创建 Skills

从使用者变成创造者。读完这部分，你能写出自己的 Skills，并发布到社区。

---

## §09 SKILL.md 的编写规范

### 09.1 基本结构

```markdown
---
name: my-skill
description: 一句话说明这个 Skill 做什么
---

# Skill 标题

## 什么时候用

描述触发场景。

## 工作流程

1. 第一步做什么
2. 第二步做什么
3. 第三步做什么

## 规则

- 规则一
- 规则二

## 参考

需要读取的文件或资源。
```

### 09.2 YAML 前置元数据

```yaml
---
name: tdd                    # Skill 名称（必填）
description: >                # 触发描述（必填）
  Write tests first, then code.
  Use Jest for unit tests.
model: sonnet                 # 指定模型（可选）
user-invocable: true          # 用户可调用（可选，默认 true）
---
```

**name**：Skill 的唯一标识。用户通过 `/name` 触发。用小写字母和连字符。

**description**：最关键的一句话。Claude 用它判断什么时候触发。写得越具体越好。

**model**：可以指定 Skill 使用哪个模型。haiku 最快最便宜，opus 最强最贵。

### 09.3 正文编写技巧

**技巧一：用指令式语气**

```markdown
# 好
读取代码文件，分析函数签名，生成测试用例。

# 不好
这个 Skill 会读取代码文件，然后分析函数签名，最后生成测试用例。
```

Claude 理解指令比理解描述更准确。

**技巧二：用编号列表定义流程**

```markdown
1. 读取目标文件
2. 分析导出的函数
3. 为每个函数生成测试
4. 运行测试确认通过
```

编号列表告诉 Claude："按这个顺序执行。"

**技巧三：用规则约束行为**

```markdown
## 规则

- 测试文件放在 `__tests__/` 目录
- 测试函数名用 `should` 开头
- 不要 mock 数据库
```

规则比建议更有约束力。Claude 会更严格地遵守。

**技巧四：用示例说明期望**

```markdown
## 示例

输入：`src/utils.ts` 包含 `add(a, b)` 函数

期望输出：
```typescript
// __tests__/utils.test.ts
describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```
```

示例比描述更直观。Claude 看到示例后，产出质量明显更高。

### 09.4 description 的写法

```yaml
# 好的 description
description: >
  Generate comprehensive unit tests for TypeScript functions.
  Uses Jest framework with snapshot testing support.

# 不好的 description
description: "A testing tool"
```

好的 description 包含：
- 做什么（Generate unit tests）
- 技术栈（TypeScript, Jest）
- 特色（snapshot testing support）

### 09.5 常见错误

| 错误 | 问题 | 正确做法 |
|------|------|---------|
| description 太短 | Claude 不知道什么时候触发 | 写清楚做什么、怎么做 |
| 正文太长 | 浪费上下文 | 核心指令放正文，细节放 references/ |
| 没有示例 | Claude 理解偏差 | 给一个输入输出示例 |
| 没有规则 | 行为不可控 | 用规则约束关键行为 |

> **核心建议**：
>
> 写 SKILL.md 的时候，想象你在带一个新同事。你会怎么告诉他做这件事？用同样的方式写。不要假设 Claude "应该知道"——它不知道，除非你写下来。

---

## §10 前置脚本（Preamble）

### 10.1 什么是 Preamble

Preamble 是 Skill 触发时**最先运行**的脚本。它在 Claude 开始执行任务之前运行，用来收集信息、设置环境。

```
用户触发 Skill → 运行 Preamble → Claude 读取输出 → 执行任务
```

### 10.2 Preamble 的用途

| 用途 | 示例 |
|------|------|
| 收集环境信息 | 当前分支、Git 状态、文件列表 |
| 检查依赖 | 工具是否安装、配置是否正确 |
| 设置变量 | 定义路径、版本号等 |
| 预处理 | 生成临时文件、清理缓存 |

### 10.3 怎么写 Preamble

在 SKILL.md 中引用脚本：

```markdown
## Preamble

Run this script before starting:

```bash
#!/bin/bash
_BRANCH=$(git branch --show-current)
_STATUS=$(git status --short)
echo "Branch: $_BRANCH"
echo "Status: $_STATUS"
```
```

Claude 执行 Skill 时，会先运行这个脚本，读取输出，然后开始任务。

### 10.4 实际示例

一个代码审查 Skill 的 Preamble：

```bash
#!/bin/bash
# 收集项目信息
echo "PROJECT: $(basename $(pwd))"
echo "BRANCH: $(git branch --show-current 2>/dev/null || echo 'not a git repo')"
echo "CHANGED_FILES: $(git diff --name-only HEAD 2>/dev/null | wc -l | tr -d ' ')"
echo "LANG: $(cat package.json 2>/dev/null | grep -o '"typescript"' | head -1 || echo 'unknown')"
```

输出类似：

```
PROJECT: my-app
BRANCH: feature/auth
CHANGED_FILES: 5
LANG: typescript
```

Claude 读取这些信息后，审查时就知道：这是一个 TypeScript 项目，当前在 feature/auth 分支，有5个文件改动。

### 10.5 Preamble 的注意事项

- **快速**：Preamble 会阻塞 Skill 的启动。太慢会影响体验。
- **安静**：不要输出太多。只输出 Claude 需要的信息。
- **容错**：用 `|| echo 'default'` 处理命令失败的情况。

> **滔哥的经验**：
>
> 我写过一个 Preamble 太重了——跑了10秒。每次触发 Skill 都要等。后来精简到只收集必要信息，200ms 就跑完了。记住：Preamble 是"前菜"，不是"正餐"。快、准、轻。

---

## §11 参考文件（References）

### 11.1 为什么需要 References

SKILL.md 的正文是核心指令。但有时候，Claude 需要更多的上下文：

- 项目的代码规范
- API 文档
- 设计模式示例
- 配置模板

这些内容不适合放在 SKILL.md 里（太大），但 Claude 需要时得能看到。

References 解决这个问题。

### 11.2 References 的结构

```
my-skill/
├── SKILL.md
└── references/
    ├── code-style.md        # 代码风格指南
    ├── api-docs.md          # API 文档
    ├── examples/            # 示例目录
    │   ├── good.ts
    │   └── bad.ts
    └── templates/           # 模板目录
        └── component.tsx
```

### 11.3 在 SKILL.md 中引用

```markdown
## 参考文件

在写代码前，先读取以下参考文件：

1. `references/code-style.md` — 了解项目的代码风格
2. `references/api-docs.md` — 了解可用的 API
3. `references/examples/good.ts` — 看一个好例子

根据这些参考文件来写代码。
```

Claude 读到这段话时，才会去加载这些文件。不读到就不会加载——这就是 Level 3 按需加载。

### 11.4 什么时候用 References

| 内容 | 放 SKILL.md | 放 References |
|------|------------|---------------|
| 核心指令 | ✅ | ❌ |
| 工作流程 | ✅ | ❌ |
| 代码规范 | ❌ | ✅ |
| API 文档 | ❌ | ✅ |
| 示例代码 | ❌ | ✅ |
| 配置模板 | ❌ | ✅ |

### 11.5 References 的大小管理

References 文件不要太大。建议：

- 单个文件 < 500 行
- 总量 < 2000 行
- 用目录分组，不要平铺

> **核心建议**：
>
> References 是 Skill 的"参考书架"。SKILL.md 告诉 Claude "怎么做"，References 告诉 Claude "参考什么"。分开管理，按需加载。

---

## §12 打包发布

### 12.1 什么时候发布

你的 Skill 满足以下条件时，考虑发布：

1. 你自己用了至少一周
2. 没有严重的 bug
3. 文档完整（SKILL.md 写清楚了）
4. 对其他人也有用

### 12.2 发布到 npm

```bash
# 初始化 package.json
npm init -y

# 设置 package name
# package.json 里加上：
# "name": "@yourname/skill-name"
# "keywords": ["claude-code-skill"]

# 发布
npm publish
```

发布后，其他人可以这样安装：

```bash
npx skills add @yourname/skill-name
```

### 12.3 发布到 GitHub

```bash
# 创建仓库
gh repo create my-skill --public

# 推送代码
git init
git add .
git commit -m "feat: initial release"
git push
```

其他人可以这样安装：

```bash
npx skills add yourname/my-skill
```

### 12.4 _metadata.json

发布前，建议加上元数据文件：

```json
{
  "version": "1.0.0",
  "author": "yourname",
  "license": "MIT",
  "repository": "https://github.com/yourname/my-skill",
  "description": "A skill for..."
}
```

### 12.5 发布清单

- [ ] SKILL.md 完整（name、description、正文）
- [ ] 测试过至少一周
- [ ] README.md 说明安装和使用
- [ ] _metadata.json 包含版本信息
- [ ] 没有硬编码的路径或密钥
- [ ] 脚本有错误处理

> **滔哥的经验**：
>
> 我第一个发布的 Skill，README 写了3行。结果没人用。后来加了安装说明、使用示例、截图，才有人开始装。文档是 Skill 的门面。没有好文档，再好的 Skill 也没人知道。

---

## Part 4: 进阶技巧

掌握这些技巧，你能用 Skills 做更复杂的事：条件触发、多 Skills 协作、性能优化。

---

## §13 条件触发和上下文感知

### 13.1 Skills 怎么感知上下文

Claude 在触发 Skill 之前，已经有了当前对话的上下文：你在做什么项目、改了什么文件、之前说了什么。

Skill 可以利用这些上下文。

### 13.2 在 SKILL.md 中写条件逻辑

```markdown
## 工作流程

1. 检查当前项目类型
   - 如果是 React 项目：使用 React Testing Library
   - 如果是 Vue 项目：使用 Vue Test Utils
   - 如果是 Node 项目：使用 Jest 直接测试

2. 检查测试框架
   - 如果已有 Jest 配置：使用 Jest
   - 如果已有 Vitest 配置：使用 Vitest
   - 如果没有测试框架：推荐 Jest
```

Claude 会根据项目的实际情况，选择对应的路径。

### 13.3 利用 Preamble 提供上下文

```bash
#!/bin/bash
# 检测项目类型
if [ -f "package.json" ]; then
  if grep -q "react" package.json; then
    echo "PROJECT_TYPE: react"
  elif grep -q "vue" package.json; then
    echo "PROJECT_TYPE: vue"
  else
    echo "PROJECT_TYPE: node"
  fi
fi

# 检测测试框架
if [ -f "jest.config.js" ] || [ -f "jest.config.ts" ]; then
  echo "TEST_FRAMEWORK: jest"
elif [ -f "vitest.config.ts" ]; then
  echo "TEST_FRAMEWORK: vitest"
else
  echo "TEST_FRAMEWORK: none"
fi
```

### 13.4 条件触发的最佳实践

| 场景 | 做法 |
|------|------|
| 项目类型不同 | 用 Preamble 检测，在 SKILL.md 写分支 |
| 文件类型不同 | 用 Claude 的上下文判断 |
| 用户偏好不同 | 用 CLAUDE.md 定义偏好 |

> **核心建议**：
>
> 不要写一个大而全的 Skill。写多个小 Skill，每个处理一个场景。Claude 会自动选择最相关的那个。

---

## §14 多 Skills 协作

### 14.1 串联执行

一个任务可能需要多个 Skills 依次完成。

```
/review → 发现问题 → /fix → 修复代码 → /test → 跑测试
```

你可以手动串联，也可以写一个"编排 Skill"。

### 14.2 编排 Skill

```markdown
---
name: full-check
description: Run full code quality check: review, fix, test
---

# Full Check

执行完整的代码质量检查流程：

1. 运行 code-reviewer Skill 审查代码
2. 根据审查结果修复问题
3. 运行 test Skill 确认测试通过
4. 生成质量报告
```

### 14.3 并行执行

有些 Skills 可以并行：

```
同时运行：
- /lint 检查代码风格
- /type-check 检查类型
- /test 跑测试
```

Claude Code 支持并行执行多个独立任务。

### 14.4 Skills 之间的通信

Skills 之间不直接通信。它们通过以下方式共享信息：

- **文件**：一个 Skill 写文件，另一个读文件
- **Git**：一个 Skill 提交代码，另一个读取 diff
- **上下文**：都在同一个对话里，共享上下文

### 14.5 团队工作流示例

```
开发者日常：
1. 写代码
2. /tdd — 先写测试
3. /commit — 智能提交
4. /review — 自我审查
5. /ship — 发布

设计师日常：
1. /huashu-design — 生成设计
2. /review — 审查设计
3. /commit — 提交设计文件

运维日常：
1. /investigate — 排查问题
2. /fix — 修复
3. /deploy — 部署
4. /canary — 监控
```

> **滔哥的经验**：
>
> 多 Skills 协作的关键是"接口清晰"。每个 Skill 的输入输出要明确。我通常会在 SKILL.md 里写清楚："这个 Skill 读取什么、输出什么、格式是什么。"这样其他 Skill 就能无缝衔接。

---

## §15 Skills 的性能优化

### 15.1 上下文是稀缺资源

Claude 的上下文窗口有限。每个 Skill 的 SKILL.md 加载进来，都会占用上下文。

如果一个 Skill 的 SKILL.md 有 2000 行，每次触发就占掉大量上下文。留给实际任务的空间就少了。

### 15.2 优化策略

**策略一：精简 SKILL.md**

```
核心指令 → SKILL.md
参考内容 → references/
示例代码 → references/examples/
配置模板 → assets/
```

SKILL.md 只放"怎么做"，不放"参考什么"。

**策略二：用 Preamble 预处理**

```bash
# 不要在 SKILL.md 里写"先检查 package.json"
# 而是在 Preamble 里检查，输出结果
cat package.json | grep -o '"react"' | head -1
```

Preamble 的输出直接进入上下文，比在 SKILL.md 里写"请先检查"更高效。

**策略三：合理使用 model**

```yaml
model: haiku  # 简单任务用 haiku
model: sonnet # 中等任务用 sonnet
model: opus   # 复杂任务用 opus
```

简单任务不需要最强的模型。用 haiku 快 3 倍，便宜 10 倍。

**策略四：按需加载 Level 3**

```markdown
只有当用户要求生成报告时，才读取 `references/report-template.md`。
```

不要在 SKILL.md 开头就让 Claude 加载所有参考文件。

### 15.3 监控上下文使用

在对话中输入 `/cost`，查看当前上下文使用情况。如果发现上下文快满了：

1. `/clear` 清除上下文
2. 检查哪些 Skill 加载了太多内容
3. 优化 SKILL.md 和 References

> **核心建议**：
>
> 性能优化的第一步是测量。先看看你的 Skill 占了多少上下文，再决定怎么优化。不要盲目精简——有些内容是必须的。

---

## §16 Skills 和 Agent、MCP 的配合

### 16.1 三种扩展方式的关系

```
Skills：怎么做事（方法论）
Agent：谁来做（执行者）
MCP：用什么工具（外部能力）
```

它们是三层：

```
Agent（任务层）
    ↓ 调用
Skills（方法层）
    ↓ 使用
MCP（工具层）
```

### 16.2 Skills + Agent

Agent 可以调用 Skills。一个"代码审查 Agent"可以：

1. 调用 /review Skill 审查代码
2. 调用 /fix Skill 修复问题
3. 调用 /test Skill 跑测试
4. 生成报告

### 16.3 Skills + MCP

Skills 可以使用 MCP 提供的工具。一个"部署 Skill"可以：

1. 用 GitHub MCP 创建 PR
2. 用 Vercel MCP 触发部署
3. 用 Slack MCP 发送通知

### 16.4 完整的工作流示例

```
用户：发布新版本

Agent（编排）
    ├── /commit Skill（提交代码）
    ├── /review Skill（审查代码）
    ├── GitHub MCP（创建 PR）
    ├── /test Skill（跑测试）
    ├── Vercel MCP（部署）
    └── Slack MCP（通知团队）
```

### 16.5 配置建议

| 需求 | 方案 |
|------|------|
| 单一任务 | 用 Skill |
| 多步骤任务 | 用 Agent + Skills |
| 需要外部能力 | Skill + MCP |
| 完整流程 | Agent + Skills + MCP |

> **滔哥的经验**：
>
> 刚开始我只用 Skills。后来发现有些任务太复杂，一个 Skill 搞不定。就开始写 Agent 来编排多个 Skills。再后来发现有些能力 Claude 自己没有（比如发 Slack 消息），就加上 MCP。三层叠加，才能覆盖真实的工作场景。

---

## Part 5: Skills 生态全集

精选社区最实用的 Skills，按类别组织。读完这部分，你知道每个领域有什么好用的 Skill。

---

## §17 开发类 Skills

### 17.1 必装开发 Skills

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| Superpowers | obra/superpowers | 22K+ Stars，开发全生命周期工作流 | ★★★★★ |
| Frontend Design | Anthropic 官方 | 注入设计系统，极大提升 UI 质量 | ★★★★★ |
| ralph-wiggum | 社区 | 死磕代码，循环迭代直到跑通 | ★★★★★ |
| code-reviewer | alirezarezvani | 代码审查 | ★★★★★ |
| Code Interpreter | 社区 | 执行 Python 代码、调试、绘图 | ★★★★ |

**Superpowers** 是社区安装量最高的 Skill。它不是一个单一功能，而是覆盖了整个开发生命周期：写代码 → 测试 → 审查 → 提交 → 部署。

**ralph-wiggum** 解决了一个特殊问题：当需求模糊、Claude 第一次生成的代码跑不通时，它会自动循环迭代，直到代码能运行为止。适合"我也说不清要什么，但你给我试"的场景。

### 17.2 代码质量

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| code-reviewer | alirezarezvani | 代码审查 | ★★★★★ |
| linter | 社区 | 代码风格检查 | ★★★★ |
| formatter | 社区 | 代码格式化 | ★★★★ |
| refactor | 社区 | 代码重构 | ★★★★ |

### 17.3 测试

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| tdd | 社区 | 测试驱动开发 | ★★★★★ |
| unit-test | 社区 | 单元测试生成 | ★★★★ |
| e2e-test | 社区 | 端到端测试 | ★★★ |
| snapshot | 社区 | 快照测试 | ★★★ |

### 17.4 开发类 Skill 使用建议

```
日常开发：
1. /tdd — 先写测试
2. 写代码
3. /commit — 智能提交
4. /review — 自查

发布前：
1. /review — 完整审查
2. /test — 跑测试
3. /ship — 发布
```

> **核心建议**：
>
> 开发类 Skills 不需要装太多。一个代码审查、一个测试、一个提交，就够了。装太多反而会让 Claude 在选择时犹豫。

---

## §18 设计类 Skills

### 18.1 设计生成

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| huashu-design | alchaincyf | HTML 原生设计，20种风格评审 | ★★★★★ |
| Frontend Design | Anthropic 官方 | 注入设计系统，提升 UI 质量 | ★★★★★ |
| ui-builder | 社区 | UI 组件生成 | ★★★★ |
| figma-export | 社区 | Figma 导出 | ★★★ |

**huashu-design** 是设计类 Skill 中最独特的一个。它不是生成设计稿，而是直接生成 HTML。你告诉它想要什么设计，它输出可用的网页代码。支持20种设计风格：包豪斯、Neo-Brutalism、瑞士国际主义、浮世绘、像素画等。

### 18.2 设计审查

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| design-review | gstack | 设计审查 | ★★★★★ |
| accessibility | 社区 | 可访问性检查 | ★★★★ |

### 18.3 设计类 Skill 的工作流

```
1. /huashu-design — 生成设计
2. 浏览器预览
3. /design-review — 审查设计
4. 迭代修改
5. /commit — 提交
```

> **滔哥的经验**：
>
> huashu-design 改变了我的设计工作流。以前用 Figma 画设计稿，再手动写 HTML。现在直接用 Skill 生成 HTML，省掉了中间环节。设计到代码的时间从2天缩短到2小时。

---

## §19 运维类 Skills

### 19.1 部署

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| ship | gstack | 完整发布流程 | ★★★★★ |
| deploy | 社区 | 部署脚本 | ★★★★ |
| docker | 社区 | Docker 构建 | ★★★★ |
| ci-cd | 社区 | CI/CD 配置 | ★★★ |

**ship** 是最完整的发布 Skill。它包含：代码审查 → 测试 → 提交 → 创建 PR → 通知团队。

### 19.2 监控和排查

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| investigate | gstack | 问题排查 | ★★★★★ |
| canary | gstack | 部署后监控 | ★★★★ |
| log-analyzer | 社区 | 日志分析 | ★★★ |

**investigate** 是排查问题的利器。输入错误信息，它会系统性地分析原因、定位代码、提出修复方案。

### 19.3 安全

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| cso | gstack | 安全审计 | ★★★★★ |
| dependency-check | 社区 | 依赖安全检查 | ★★★★ |
| secrets-scanner | 社区 | 密钥扫描 | ★★★★ |

### 19.4 运维类 Skill 使用建议

```
发布流程：
1. /ship — 完整发布
2. /canary — 监控部署
3. /investigate — 排查问题（如有）

安全流程：
1. /cso — 安全审计
2. /dependency-check — 检查依赖
3. /secrets-scanner — 扫描密钥
```

> **核心建议**：
>
> 运维类 Skills 是"平时不用，用时救命"。建议提前装好 /investigate 和 /cso。出问题时再装就来不及了。

---

## §20 效率类 Skills

### 20.1 文档生成

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| doc-generator | 社区 | 文档生成 | ★★★★ |
| readme-writer | 社区 | README 生成 | ★★★★ |
| changelog | 社区 | 变更日志 | ★★★ |
| api-doc | 社区 | API 文档 | ★★★★ |

### 20.2 代码转换

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| migrate | 社区 | 框架迁移 | ★★★★ |
| upgrade | 社区 | 版本升级 | ★★★★ |
| convert | 社区 | 语言转换 | ★★★ |

### 20.3 思维增强

| Skill | 来源 | 功能 | 推荐度 |
|-------|------|------|--------|
| nuwa-skill | alchaincyf | 思维蒸馏 | ★★★★★ |
| brainstorm | 社区 | 头脑风暴 | ★★★★ |
| decision | 社区 | 决策分析 | ★★★ |

**nuwa-skill** 是最特别的效率类 Skill。它不是帮你做事，而是帮你思考。输入一个人的思维方式，它能生成一个模拟那个思维方式的 Skill。

### 20.4 效率类 Skill 使用建议

```
项目启动：
1. /doc-generator — 生成文档
2. /readme-writer — 写 README

日常开发：
1. /api-doc — 生成 API 文档
2. /changelog — 更新变更日志

思考辅助：
1. /nuwa-skill — 思维蒸馏
2. /brainstorm — 头脑风暴
```

> **滔哥的经验**：
>
> nuwa-skill 让我重新理解了 Skills 的边界。它不是"帮你做事"的工具，是"帮你思考"的工具。你可以把任何人的思维方式蒸馏成一个 Skill，然后在需要时"召唤"那个思维方式来帮你分析问题。这比直接问 Claude 更有针对性。

---

## §21 数据分析类 Skills

### 21.1 数据处理

| Skill | 核心能力 | 适用场景 |
|-------|---------|---------|
| data-analyst | CSV 加载、统计分析、可视化 | 通用数据分析 |
| CSV Data Summarizer | 生成分布图、热图、缺失矩阵 | 数据清洗与概览 |
| Senior Data Engineer | ETL/ELT 系统设计 | 大数据管道 |
| Clickhouse | 高性能数据库查询优化 | 海量数据分析 |

### 21.2 数据可视化

| Skill | 核心能力 | 适用场景 |
|-------|---------|---------|
| Dashboard Creator | 生成交互式 HTML 仪表盘 | 商业报表 |
| D3.js Visualization | 出版级自定义图表 | 科研绘图、复杂可视化 |
| huashu-data-pro | Excel 转交互式 HTML 报告（ECharts） | 数据报告 |

**huashu-data-pro** 是花叔系列中专门做数据可视化的 Skill。输入一个 Excel 文件，它自动分析数据结构，生成一个带 ECharts 图表的交互式 HTML 报告。比手动做 Excel 图表好看10倍。

### 21.3 数据分析工作流

```
1. /data-analyst — 加载数据，做初步分析
2. /CSV Data Summarizer — 生成数据概览
3. /Dashboard Creator — 做成交互式仪表盘
4. /commit — 提交报告
```

> **核心建议**：
>
> 数据分析类 Skills 最大的价值不是"帮你算"，是"帮你可视化"。Claude 自己能做计算，但 Skills 让它输出好看的图表和报告。

---

## §22 学术研究类 Skills

### 22.1 论文写作

| Skill | 核心能力 | 适用场景 |
|-------|---------|---------|
| manuscript-writing | 论文章节结构化指导 | 期刊/会议论文 |
| language-polishing | 语法纠错、学术语言规范化 | 润色修改 |
| abstract | 摘要生成 | 投稿 |
| coverletter | 投稿信生成 | 投稿 |
| 审稿回复 | 结构化回复审稿意见 | 修改重投 |

### 22.2 文献管理

| Skill | 核心能力 | 适用场景 |
|-------|---------|---------|
| citation-manager | APA/MLA/GB-T 7714 格式生成 | 参考文献管理 |
| 文献分析 | 提取研究问题/方法/发现 | 文献综述 |
| anthropics/skills | 官方文档处理（Word/PPT/PDF） | 格式规范 |

### 22.3 科研专属 Skills

**K-Dense-AI/claude-scientific-skills** 是科研领域最全面的 Skill 集合，包含 140+ 个科学领域技能，覆盖：

- 实验设计
- 数据分析
- 论文写作
- 文献综述
- 统计方法

### 22.4 学术工作流

```
1. /文献分析 — 梳理已有文献
2. /manuswriting — 搭建论文框架
3. /language-polishing — 润色语言
4. /citation-manager — 管理参考文献
5. /abstract — 生成摘要
6. /coverletter — 写投稿信
```

> **滔哥的经验**：
>
> 学术类 Skills 最实用的是 citation-manager。以前手动调参考文献格式，每次投稿都要改半天。现在一键生成 APA 或 GB-T 7714 格式。这个 Skill 本身不复杂，但省的时间最多。

---

## §23 视频制作类 Skills

### 23.1 视频生成

| Skill | 核心能力 | 适用场景 |
|-------|---------|---------|
| Remotion Skills | React 代码生成视频/动画 | 技术解说、动态视频 |
| sora2video | 图片生成视频 | 素材生成 |
| video-use | 自动剪口癖、加字幕、调色 | 后期剪辑（替代剪映） |

### 23.2 脚本和运营

| Skill | 核心能力 | 适用场景 |
|-------|---------|---------|
| huashu-douyin-script | 竞品分析到脚本生成的短视频闭环 | 短视频运营 |
| huashu-video-check | 基于 MrBeast 策略检查标题/封面 | 视频优化 |

**huashu-douyin-script** 是花叔系列中做短视频的 Skill。输入一个竞品视频链接，它会分析脚本结构、节奏、钩子，然后生成一个类似风格但内容不同的脚本。从竞品分析到脚本输出，一气呵成。

### 23.3 配图生成

| Skill | 核心能力 | 适用场景 |
|-------|---------|---------|
| huashu-wechat-image | 生成公众号配图 | 微信公众号 |
| huashu-xhs-image | 生成小红书配图 | 小红书运营 |

### 23.4 视频制作工作流

```
1. /huashu-douyin-script — 生成脚本
2. /Remotion Skills — 生成动画素材
3. /video-use — 自动剪辑
4. /huashu-video-check — 检查标题和封面
```

> **核心建议**：
>
> 视频类 Skills 目前最适合技术解说类视频。Remotion 用 React 代码生成动画，非常适合编程教程。真人出镜类视频，Skills 帮助有限，主要在脚本和后期环节。

---

## §24 花叔 Skills 全家桶详解

### 24.1 花叔是谁

花叔（Alchaincyf），30万+ AI 博主。他的 Skills 仓库是中文开发者社区中质量最高的个人项目之一。

**特点**：文档写得像产品说明书，覆盖内容创作全链路，错误处理极佳。

### 24.2 核心工作流 Skills

| Skill | 功能亮点 |
|-------|---------|
| huashu-slides | 一句话生成 PPTX |
| huashu-data-pro | Excel 转交互式 HTML 报告（ECharts） |
| huashu-design | 设计哲学顾问，20种风格评审 |
| huashu-douyin-script | 竞品分析到脚本生成的短视频闭环 |

### 24.3 写作与审校

| Skill | 功能亮点 |
|-------|---------|
| huashu-proofreading | 三遍审校，将 AI 检测率压至 30% 以下 |
| huashu-material-search | 调用 1800+ 个人素材库，增加"人味" |
| huashu-article-to-x | 长文转社交媒体短文 |

**huashu-proofreading** 最特别。它不是简单的语法检查，而是三遍审校：第一遍查逻辑，第二遍查语言，第三遍查"AI 味"。最终把 AI 生成内容的检测率压到 30% 以下。

### 24.4 视频与配图

| Skill | 功能亮点 |
|-------|---------|
| huashu-video-check | 基于 MrBeast 策略检查标题/封面 |
| huashu-wechat-image | 生成公众号配图 |
| huashu-xhs-image | 生成小红书配图 |

### 24.5 huashu-slides 深度解析

**如何触发**：

```
"帮我做一个关于 [主题] 的演示文稿"
"生成一个介绍 [产品] 的 Slides"
```

**18种设计风格**：

| 类别 | 风格 |
|------|------|
| 艺术类 | 浮世绘、Snoopy 漫画、像素画、蒙德里安 |
| 设计类 | 包豪斯、Neo-Brutalism、瑞士国际主义、田中一光、极简主义 |

AI 在插画/漫画类风格表现最佳，极简类稍弱。

**3种协作模式**：

| 模式 | 交互程度 | 适合人群 |
|------|---------|---------|
| Full Auto（全自动） | 低（仅确认主题） | 赶时间、需求明确 |
| Guided（引导式） | 中（推荐） | 大多数用户，平衡效率与控制力 |
| Collaborative（协作式） | 高（逐页审批） | 对细节要求极高的汇报 |

**2种技术路径**：

| 路径 | 流程 | 优劣 |
|------|------|------|
| Path A（可编辑） | HTML 排版 → PPTX | 推荐，文字可在 Office 中二次编辑 |
| Path B（视觉版） | AI 生成整页图片 → PPTX | 视觉冲击力强，但文字不可编辑 |

> **滔哥的经验**：
>
> 花叔 Skills 最大的价值不是单个 Skill 有多强，而是它们形成了一个完整的内容创作工作流。从写文章（huashu-proofreading）到做 PPT（huashu-slides）到做视频（huashu-douyin-script）到配图（huashu-wechat-image），一条链走完。如果你是内容创作者，装一套花叔 Skills，效率能提升 5 倍。

---

## Part 7: 工程化方法论

Skills 不是孤岛。当你的 Skills 足够多，就需要一套工程化的方法来管理它们。这部分讲的是怎么把 Skills 组织成一套完整的开发流程。

---

## §25 挑选 Skill 的三条硬线

### 25.1 不是越多越好

装 Skills 不是收藏，是为工作流配工作站。桌面越干净，速度越稳。

三条硬线帮你决定该不该装一个 Skill：

| 原则 | 说明 |
|------|------|
| 一周用得到三次以上 | Skill 描述会被注入每一轮对话的 system prompt，不管你用没用。低频 Skill 在白白消耗 token |
| 没它，prompt 写起来真的会累 | 5行 prompt 能搞定的事，没必要装 Skill；但像处理 docx 表格/批注这种，装了直接读，省心差距明显 |
| 描述精准，不会乱触发 | 好的 Skill 描述清晰说明触发场景，避免污染 context |

### 25.2 新手必装 5 个

| # | Skill | 核心功能 | 典型场景 |
|---|-------|---------|---------|
| 1 | skill-creator | 让 Claude 帮你造 Skill，交互式访谈 → 生成 SKILL.md | 把重复 prompt 沉淀为 Skill |
| 2 | pdf | 读/写/合并/拆分/加水印/OCR/提取表格/填表单 | 合作方案 PDF 拆章分发 |
| 3 | docx | 复杂格式、表格、批注、tracked changes、图片插入 | 批量替换、保留批注 |
| 4 | canvas-design | 基于设计原则生成 png/pdf 视觉作品 | 900×383 封面图 3 分钟搞定 |
| 5 | xlsx 或 pptx（二选一） | Office 文档处理 | 看最近 30 天哪个用得多装哪个 |

### 25.3 进阶推荐 5 个

| # | Skill | 核心功能 |
|---|-------|---------|
| 1 | NanoBanana-PPT-Skills（歸藏） | 杂志风格/横滑/WebGL 流体背景，2.1K star |
| 2 | mcp-builder | 教 Claude 写 MCP server，连接外部 API |
| 3 | web-artifacts-builder | 多组件 React + Tailwind + shadcn/ui 项目生成 |
| 4 | code-review（NeoLabHQ） | 多角色 PR 审查：bug-hunter/security/quality |
| 5 | last30days-skill | 抓取 Reddit/X/YouTube/HN 过去 30 天热门内容 |

### 25.4 四类劝你别装的 Skill

- **"通用助手"型**：描述太宽，触发条件太松，污染 context
- **"行业特化"备胎**：每月用不到一次，天天在后台吃 token
- **"功能仿制"型**：和官方 Skill 高度重叠，Anthropic 官方已覆盖 90% 场景
- **30天未触发**：每月翻 `~/.claude/skills/` 看访问时间，移走（不删）上个月没访问的

> **核心建议**：
>
> 装之前先看 SKILL.md 的 description 字段，那一行决定了它会不会污染你的 context。

---

## §26 AI 编程工程化：OpenSpec + gstack

### 26.1 解决的问题

| 痛点 | OpenSpec 方案 | gstack 方案 | 组合效果 |
|------|-------------|------------|---------|
| 需求不明确 | 结构化规格文档 | CEO 角色定义 | 规格+战略双重保障 |
| 角色混乱 | 无角色概念 | 23个明确角色 | 规格驱动角色协作 |
| 质量保障 | 行为验证 | QA+工程经理审查 | 多层质量关卡 |
| 变更追溯 | 完整归档机制 | 依赖 Git 历史 | 规格归档+Git 追溯 |
| 部署发布 | 无专门机制 | 发布经理角色 | 规格验收+发布流程 |

### 26.2 核心概念对比

| 维度 | OpenSpec | gstack | Superpowers |
|------|---------|--------|------------|
| 定位 | 规格驱动变更管理 | 角色化技能集合 | 行为约束工作流 |
| 核心能力 | 提案→设计→规格→任务→归档 | 23个角色技能 | 14个流程 Skills |
| 适用工具 | 25+ AI 助手 | Claude Code 为主 | Claude Code/Codex |

### 26.3 gstack 核心角色（23个）

| 角色 | 命令 | 职责 |
|------|------|------|
| CEO | /gstack:ceo | 产品战略、愿景、高层需求 |
| 工程经理 | /gstack:eng-manager | 架构审查、代码质量、技术规划 |
| 工程师 | /gstack:engineer | 功能实现、编写生产级代码 |
| QA | /gstack:qa | 浏览器测试、编写测试套件 |
| 发布经理 | /gstack:release-manager | 版本管理、变更日志、部署准备 |
| 设计师 | /gstack:design | UI/UX 设计审查 |
| 文档工程师 | /gstack:doc | 技术文档编写 |
| DevEx | /gstack:devex | 开发者体验优化 |

### 26.4 完整工作流

```
战略 → 规格 → 实现 → 测试 → 验证 → 发布
  ↓       ↓       ↓       ↓       ↓        ↓
 CEO   OpenSpec  Engineer QA    OpenSpec  Release
Eng.Mgr         Eng.Mgr         Eng.Mgr  Manager
                              QA
```

**阶段一：战略与规格定义**

1. `/gstack:ceo` — 输入战略愿景
2. `/opsx:explore` — 技术探索
3. `/opsx:propose` — 创建正式提案
4. `/gstack:eng-manager` — 技术审查
5. 更新规格文档

**阶段二：角色化执行**

6. `/gstack:eng-manager` — 任务拆分（2-4小时粒度）
7. `/gstack:engineer` — 实现代码
8. `/gstack:qa` — 测试

**阶段三：验证与发布**

9. `/opsx:verify` — 验证
10. `/gstack:release-manager` — 准备发布
11. `/opsx:archive` — 归档

### 26.5 安装

```bash
# OpenSpec
npm install -g @fission-ai/openspec@latest

# gstack
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git \
  ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

### 26.6 最佳实践

- 不要直接让工程师实现，先定义规格
- 小型变更（<4h）：简化流程
- 中型变更（1-3天）：标准流程
- 大型变更（>3天）：完整流程 + 多变更管理

> **滔哥的经验**：
>
> OpenSpec + gstack 解决了一个我一直没解决的问题：需求到代码的"翻译损耗"。以前产品经理说一句，工程师理解一句，最后做出来的东西跟需求差了30%。现在有了结构化规格文档 + 角色化执行，翻译损耗降到了 5% 以下。

---

## §27 三大 AI 编程神器合体指南

### 27.1 三套插件一览

| 插件 | 仓库 | 定位 |
|------|------|------|
| oh-my-openagent | code-yeongyu/oh-my-openagent | 多 Agent 编排框架 |
| superpowers | obra/superpowers | 开发最佳实践方法论库 |
| gstack | garrytan/gstack | 标准研发流水线 |

### 27.2 核心差异对比

| 维度 | superpowers | gstack | oh-my-openagent |
|------|------------|--------|----------------|
| 核心理念 | 开发活动拆成可复用 Skill | Think→Plan→Build→Review→Test→Ship→Reflect | 多 Agent 并行编排 |
| 组织方式 | 按主题分组 | 按冲刺阶段串联 | 模式+功能+技能+Agent 角色 |
| 使用方式 | 按需调用单个 Skill | 按流程逐步推进 | 命令拉起多 Agent |
| 最佳场景 | 日常工程规范化 | 单 feature 全流程交付 | 多任务并行、复杂项目 |

### 27.3 各插件核心能力

**superpowers（方法论技能库）**：

| Skill | 功能 |
|-------|------|
| brainstorming | 苏格拉底式需求头脑风暴 |
| test-driven-development | RED→GREEN→REFACTOR |
| systematic-debugging | 4阶段 root cause 流程 |
| subagent-driven-development | 双阶段评审 |
| writing-plans / executing-plans | 计划与执行 |

**gstack（冲刺流水线）**：

| Skill | 功能 |
|-------|------|
| /office-hours | YC 办公室访谈，6个 forcing questions |
| /plan-eng-review | 架构审查 |
| /review | Staff Engineer 找 CI 通过的隐藏 bug |
| /qa | 测试→找 bug→修复→复验 |
| /ship | 同步 main→跑测试→push→开 PR |

**oh-my-openagent（多 Agent 编排）**：

| Skill | 功能 |
|-------|------|
| ultrawork/ulw | 一键多 Agent 开发模式 |
| deep-interview | 苏格拉底式访谈 |
| /team 3:executor | 多智能体协作流水线 |
| autopilot | 全自动 5 阶段执行 |

### 27.4 推荐组合使用

| 阶段 | 推荐指令 |
|------|---------|
| 想清楚 | superpowers/brainstorming + gstack/office-hours |
| 规划 | gstack/plan-eng-review + oh-my-openagent/omc-plan |
| 开发 | oh-my-openagent/ultrawork + superpowers/TDD |
| 审查 | gstack/review + oh-my-openagent/team:code-reviewer |
| 发布 | gstack/ship + gstack/document-release |

### 27.5 /findme 指令

自定义 Skill：每次输入 `/findme`，AI 进入访谈模式，判断当前需求和阶段，推荐最适合的指令。

> **核心建议**：
>
> 三套插件不冲突，可以叠加。superpowers 管"怎么做"，gstack 管"什么流程"，oh-my-openagent 管"谁来做"。三者组合，覆盖了从想法到部署的完整链路。

---

## Part 8: 案例与方法论

看别人怎么用 Skills 和 AI 编程工具，能帮你少走弯路。这部分是真实案例和组织方法论。

---

## §28 Claude Code 黑客松三强案例

### 28.1 比赛概况

Anthropic「Built with Opus 4.7」黑客松，288个项目，全部用 Claude Code + Opus 4.7 搭建。

### 28.2 三强项目

**金牌：MedKit — 把会诊室搬进浏览器**

- 作者：Bedirhan Keskin（土耳其，医生转软件工程师）
- 全语音、不打字，AI 病人有人味（会犹豫、反问、焦虑）
- 三维度评分：数据采集/临床管理/人际沟通
- 引用真实指南条文（NICE/ESC/AHA/GINA/GOLD），无伪造引用
- 链接：medkit-app.vercel.app

**银牌：Wrench Board — 电子维修诊断工作台**

- 作者：Alexis Chapellier（法国，微焊技师）
- 4个正交工作流 + 36个专用 agent 工具
- 反幻觉：不允许编造元件位号，服务端 post-hoc sanitizer
- 12种 boardview 格式解析器
- Apache 2.0 开源

**铜牌：Maieutic — 写代码前先讲清你为啥这么写**

- 作者：Paula Vasquez-Henriquez（智利，教育圈）
- 命名来自苏格拉底「产婆术」
- 先思考、再编码，强迫元认知
- AI 时代的编程教育解药

### 28.3 共同公式

```
我最懂的那行 × Opus 4.7 的 agent 能力 = 能立刻交付价值的工具
```

三个获奖者有一个共同点：**他们都不是职业程序员**。一个是医生，一个是微焊技师，一个是教育工作者。但他们都在自己最懂的领域，用 Claude Code 做出了真正有用的工具。

> **滔哥的经验**：
>
> 黑客松三强给我最大的启发是：AI 编程的门槛不在"会不会写代码"，在"懂不懂问题"。你最懂的那个领域，就是你最大的优势。Claude Code 负责写代码，你负责定义问题。

---

## §29 YC：AI-Native 公司组织方法论

### 29.1 核心命题

"AI should not be a tool your company just uses. It should be the operating system your company runs on."

— Diana Hu, YC Partner

### 29.2 关键概念

| 概念 | 说明 |
|------|------|
| 闭环公司 vs 开环公司 | 传统公司是 open loop（无系统反馈）；AI-native 应是 closed loop（信息→反馈→修正流程） |
| 可查询公司（Queryable Company） | 整个组织对 AI 可读、可理解、可回放。会议记录、减少 DM、嵌入 agent、打通 dashboard |
| Software Factories | 人写 spec → agent 生成实现 → 循环迭代直到通过测试 |
| 中层管理变成了 markdown | 12个 agent 通过纯文本文件共享上下文。管理没有消失，变成了约束文档 |
| Token Maxing | 拼 token 投入强度而非人头数。最强公司 = 最敢把 API 预算当生产力投资 |

### 29.3 AI-Native 的五个特征

1. **信息对 AI 可读**：会议记录、决策文档、代码规范都以结构化格式存储
2. **反馈闭环**：agent 做完事情后，结果自动回流到决策系统
3. **角色由 Skill 定义**：不是"某个人是 QA"，而是"QA 这个角色由 /gstack:qa 这个 Skill 承担"
4. **管理变成了文档**：约束规则、质量标准、发布流程都写在 markdown 里，agent 读取执行
5. **Token 是生产力投资**：不是"省着用"，而是"投越多，产出越高"

### 29.4 争议与反思

**支持方**：queryable company 概念正确，agent 读文件→干活→写回，这是最自然的工作方式。

**质疑方**：

- 很难假设心智模型能通过 spec 准确映射到代码每个细节 → agent drift
- 闭源模型 API 调用 = 把公司一切交给外部 → 信息安全风险

> **滔哥的经验**：
>
> YC 的方法论我不完全认同，但有一个观点我深信不疑：**管理没有消失，变成了约束文档**。以前管理者靠开会传达要求，现在写成 markdown，agent 读取执行。这个转变已经在发生了。你写的 CLAUDE.md，本质上就是你的管理文档。

---

## Part 9: 实战场景

真实项目中的 Skills 用法。这部分综合运用前面学到的所有能力。

---

## §30 场景一：用 Skills 搭建完整开发流程

### 25.1 需求

一个5人的前端团队，想用 Skills 标准化开发流程。每个人写代码的习惯不同，提交质量参差不齐，代码审查靠人肉。

### 30.2 Skill 清单

```
.claude/skills/
├── commit/           # 智能提交
│   └── SKILL.md
├── review/           # 代码审查
│   └── SKILL.md
├── tdd/              # 测试驱动
│   └── SKILL.md
├── ship/             # 发布流程
│   └── SKILL.md
└── investigate/      # 问题排查
    └── SKILL.md
```

### 30.3 每个 Skill 的核心逻辑

**commit Skill**：
```
1. 分析 git diff
2. 判断改动类型（feat/fix/refactor/docs）
3. 生成规范的 commit message
4. 执行提交
```

**review Skill**：
```
1. 读取改动文件
2. 检查代码风格
3. 检查潜在 bug
4. 检查安全问题
5. 生成审查报告
```

**tdd Skill**：
```
1. 读取目标代码
2. 分析函数签名
3. 生成测试用例
4. 运行测试
5. 确认通过
```

### 30.4 实际效果

| 指标 | 使用前 | 使用后 |
|------|--------|--------|
| commit message 质量 | "fix bug" | "fix: resolve race condition in auth middleware" |
| 代码审查时间 | 2小时/PR | 20分钟/PR |
| 测试覆盖率 | 40% | 85% |
| 发布时间 | 30分钟 | 5分钟 |

### 30.5 团队反馈

- 开发者A："以前写测试是最痛苦的事，现在 /tdd 直接生成，我只用检查。"
- 开发者B："commit message 终于不用猜了。"
- 技术负责人："代码审查从'人肉检查'变成了'人+AI 检查'，质量上去了，时间下来了。"

> **滔哥的经验**：
>
> 这个场景不是假设。我自己的团队就是这么做的。5个人用了2个月，效果确实好。关键是 Skills 不是替代人的判断，而是替代人的重复劳动。审查还是人在做，但 Claude 先过一遍，人只需要看 Claude 标记的问题。

---

## §31 场景二：从零构建一个 Skill

### 31.1 需求

做一个"API 文档生成" Skill。每次写完接口，自动扫描代码，生成 API 文档。

### 31.2 第一步：定义 Skill 的行为

```markdown
---
name: api-doc
description: >
  Scan TypeScript/JavaScript code for API endpoints (Express, Fastify, Hono)
  and generate API documentation in Markdown format.
---

# API Doc Generator

扫描代码中的 API 端点，生成 API 文档。

## 工作流程

1. 扫描项目中的路由定义
2. 提取端点信息（路径、方法、参数、返回值）
3. 生成 Markdown 格式的 API 文档
4. 输出到 docs/api.md

## 规则

- 只扫描 Express/Fastify/Hono 的路由定义
- 参数类型从 TypeScript 类型推断
- 返回值类型从响应对象推断
- 生成的文档包含：路径、方法、参数、返回值、示例
```

### 31.3 第二步：写 Preamble

```bash
#!/bin/bash
# 检测使用的框架
if grep -q "express" package.json 2>/dev/null; then
  echo "FRAMEWORK: express"
elif grep -q "fastify" package.json 2>/dev/null; then
  echo "FRAMEWORK: fastify"
elif grep -q "hono" package.json 2>/dev/null; then
  echo "FRAMEWORK: hono"
else
  echo "FRAMEWORK: unknown"
fi

# 统计路由文件数
echo "ROUTE_FILES: $(find src -name "*.ts" -exec grep -l "router\.\|app\.\|get\|post\|put\|delete" {} \; 2>/dev/null | wc -l | tr -d ' ')"
```

### 31.4 第三步：添加参考文件

```
.claude/skills/api-doc/
├── SKILL.md
├── scripts/
│   └── preamble.sh
└── references/
    ├── express-patterns.md    # Express 路由模式
    ├── fastify-patterns.md    # Fastify 路由模式
    └── doc-template.md        # 文档模板
```

### 31.5 第四步：测试

```bash
# 在项目中测试
cd my-api-project
claude

# 触发 Skill
/api-doc
```

检查输出的文档是否准确。

### 31.6 第五步：迭代

根据测试结果调整：

- 路由扫描不准？调整正则表达式
- 参数类型不对？改进类型推断逻辑
- 文档格式不好看？修改模板

### 31.7 第六步：发布

```bash
# 写 README
echo "# API Doc Generator\n\nGenerate API documentation from code." > README.md

# 发布
npm publish
```

> **核心建议**：
>
> 构建 Skill 的关键是"先让它能用，再让它好用"。第一个版本不需要完美。能扫描出80%的路由就够了。后面再迭代优化。

---

## §32 场景三：团队协作中的 Skills

### 32.1 需求

一个分布式团队，3个城市、8个人。需要统一的代码规范和工作流程。

### 32.2 方案：共享 Skills 仓库

```
team-skills/                    # 独立仓库
├── .claude/
│   └── skills/
│       ├── code-style/         # 代码风格
│       ├── commit-convention/  # 提交规范
│       ├── review-checklist/   # 审查清单
│       └── deploy-checklist/   # 部署清单
├── README.md
└── install.sh                  # 一键安装脚本
```

### 32.3 一键安装脚本

```bash
#!/bin/bash
# install.sh
SKILL_DIR=".claude/skills"
mkdir -p "$SKILL_DIR"

# 复制 Skills
cp -r skills/* "$SKILL_DIR/"

echo "✓ Skills installed to $SKILL_DIR"
echo "Available skills:"
ls "$SKILL_DIR"
```

团队成员只需要：

```bash
git clone https://github.com/team/team-skills.git /tmp/team-skills
cd your-project
/tmp/team-skills/install.sh
```

### 32.4 版本管理

Skills 仓库用 Git 管理版本：

```bash
# 更新 Skills
cd team-skills
git pull
./install.sh  # 重新安装到项目
```

### 32.5 团队规范

| 规范 | 负责 Skill | 作用 |
|------|-----------|------|
| 代码风格 | code-style | 统一缩进、命名、注释 |
| 提交规范 | commit-convention | 统一 commit message 格式 |
| 审查标准 | review-checklist | 统一审查清单 |
| 部署流程 | deploy-checklist | 统一部署步骤 |

### 32.6 实际效果

- 新人入职第一天就能用上团队的 Skills
- 不同城市的开发者用同一套规范
- 代码风格差异从"经常出现"降到"几乎没有"
- 部署错误从"每月2-3次"降到"几乎为零"

> **滔哥的经验**：
>
> 团队协作最大的挑战不是技术，是"统一"。8个人，8种写代码习惯。Skills 解决了这个问题——不是靠培训（培训完了还是会忘），是靠工具（每次写代码都自动执行规范）。这是 Skills 最被低估的价值。

---

## 附录

---

### 附录 A：SKILL.md 模板库

**代码审查模板**：

```markdown
---
name: code-reviewer
description: >
  Review code for bugs, security issues, and best practices.
  Analyzes code structure, naming conventions, and potential improvements.
---

# Code Reviewer

审查代码质量，发现问题并给出改进建议。

## 工作流程

1. 读取目标文件
2. 分析代码结构
3. 检查常见问题
4. 生成审查报告

## 检查清单

- [ ] 命名是否清晰
- [ ] 函数是否过长（>30行）
- [ ] 是否有未处理的异常
- [ ] 是否有硬编码的值
- [ ] 是否有安全风险
- [ ] 是否有性能问题

## 输出格式

按严重程度排序：
- 🔴 严重：必须修复
- 🟡 警告：建议修复
- 🟢 建议：可以改进
```

**测试生成模板**：

```markdown
---
name: test-generator
description: >
  Generate unit tests for TypeScript/JavaScript functions.
  Uses Jest with snapshot testing for React components.
---

# Test Generator

为目标代码生成单元测试。

## 工作流程

1. 读取目标代码
2. 分析导出的函数和类
3. 确定测试框架（Jest/Vitest）
4. 生成测试文件
5. 运行测试确认通过

## 规则

- 测试文件放在 `__tests__/` 目录
- 测试函数名用 `should` 开头
- 每个函数至少3个测试用例
- 包含正常路径和边界情况
```

**部署检查模板**：

```markdown
---
name: deploy-checklist
description: >
  Pre-deployment checklist for production releases.
  Checks environment, dependencies, tests, and security.
---

# Deploy Checklist

部署前检查清单。

## 检查项

1. **测试**：所有测试是否通过？
2. **依赖**：是否有安全漏洞？
3. **环境变量**：生产环境变量是否配置？
4. **数据库**：是否需要迁移？
5. **回滚计划**：出问题怎么回滚？
6. **监控**：监控是否就绪？

## 输出

按检查项逐项报告，每项标记 ✅ 或 ❌。
```

---

### 附录 B：常见问题和解决方案

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| Skill 不触发 | description 不匹配 | 优化 description 关键词 |
| 触发了错误的 Skill | description 太宽泛 | 让 description 更具体 |
| 上下文爆了 | SKILL.md 太长 | 精简正文，内容移 references/ |
| 脚本执行失败 | 权限问题 | `chmod +x scripts/*.sh` |
| Skill 之间冲突 | 同时触发 | 用 description 区分场景 |
| 输出质量不好 | 指令不够详细 | 加示例和规则 |
| 安装后找不到 | 目录位置错 | 检查 `.claude/skills/` 路径 |

---

### 附录 C：Skills 生态资源

**高星仓库（>1K Stars）**：

| 仓库 | Stars | 说明 |
|------|-------|------|
| anthropics/skills | 40K+ | 官方正统，基础能力 |
| affaan-m/everything-claude-code | 25K+ | 黑客松冠军，子代理和工作流 |
| sickn33/antigravity-awesome-skills | 23K+ | 海量技能，CLI 一键安装 |
| obra/superpowers | 22K+ | 社区之王，20+ 实战技能 |
| ComposioHQ/awesome-claude-skills | 19K+ | 大合集，分类清晰 |
| VoltAgent/awesome-agent-skills | 18K+ | 跨平台兼容 |
| alchaincyf/nuwa-skill | 17K+ | 思维蒸馏 |
| alchaincyf/huashu-design | 11.7K | HTML 原生设计 |
| alirezarezvani/claude-skills | 5K+ | 235个生产级 Skills |
| K-Dense-AI/claude-scientific-skills | 5K+ | 科研专属，140+ 技能 |

**推荐组合**：

| 人群 | 推荐 Skills |
|------|------------|
| 全能开发者 | Superpowers + Frontend Design + ralph-wiggum |
| 自媒体博主 | huashu-skills（全套）+ video-use |
| 科研人员 | claude-scientific-skills + citation-manager + data-analyst |

**其他资源**：

| 资源 | 链接 | 说明 |
|------|------|------|
| 官方文档 | code.claude.com/docs/en/skills | Skills 官方指南 |
| Skills 市场 | skills.sh | Skills 搜索和安装 |
| npm skills | npmjs.com/search?q=claude-code-skill | npm 上的 Skills |

---

### 附录 D：Skill 开发清单

**第一步：定义**
- [ ] 明确 Skill 的用途
- [ ] 确定触发场景
- [ ] 设计工作流程

**第二步：编写**
- [ ] 创建 SKILL.md
- [ ] 写 YAML 元数据（name、description）
- [ ] 写工作流程（编号列表）
- [ ] 写规则（约束行为）
- [ ] 写示例（输入输出）

**第三步：资源**
- [ ] 添加 Preamble 脚本（如需要）
- [ ] 添加 References 文件（如需要）
- [ ] 添加 Assets 资源（如需要）

**第四步：测试**
- [ ] 在项目中测试
- [ ] 检查触发是否准确
- [ ] 检查输出质量
- [ ] 检查上下文使用

**第五步：发布**
- [ ] 写 README.md
- [ ] 添加 _metadata.json
- [ ] 发布到 npm 或 GitHub

---

## 写在最后

Skills 改变的不是 Claude Code 的能力，是 Claude Code 的专注度。

没有 Skills，Claude Code 是一个什么都会的通才。有了 Skills，它在每个领域都能变成专家。

这本书的32个章节，从"Skills 是什么"讲到"团队协作中的 Skills"。每章都建立在前一章的基础上。

我的建议：

1. **先用**。安装几个社区 Skills，跑通流程
2. **再学**。理解触发机制、三级加载、性能优化
3. **再写**。从简单的 Skill 开始，逐步增加复杂度
4. **再分享**。发布到社区，或者团队共享

Skills 是 Claude Code 生态中最容易上手、也最容易被低估的能力。

它不需要你会写代码（虽然会写更好）。它需要你会描述"怎么做一件事"。

如果你能把一件事描述清楚，你就能写一个 Skill。

如果你能写一个 Skill，你就能让你的 Claude Code 变成任何领域的专家。

---

**滔哥**
2026年5月4日

---

> **Claude Code Skills 橙皮书** · v1.0
> 基于 Claude Code Skills 生态（2026年5月）
> 作者：滔哥
> 最后更新：2026年5月4日
