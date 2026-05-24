# 个人博客文章发布手册

这份文档说明如何用 Markdown 管理文章，以及这个博客当前使用的 GitHub Pages + Jekyll 工作流。

现在你只需要写 Markdown 文件，不需要为每篇文章手写 HTML。

## 推荐工作流

```text
写 Markdown 文章
↓
填写文章信息
↓
放进 _posts/ 文件夹
↓
本地预览
↓
git push
↓
GitHub Pages 自动发布
```

## 一篇文章长什么样

Markdown 文件顶部需要写一段文章信息，叫 front matter。正文直接写在下面。

```markdown
---
layout: post
title: "文章标题"
date: 2026-05-24
topic: "杂谈"
tags: ["游戏", "感想", "生活"]
summary: "这里写一两句话摘要，用于首页和文章列表。"
---

这里开始写正文。

## 小标题

可以正常使用 Markdown：

- 列表
- **加粗**
- 引用
- 代码块
- 图片

> 这里是一段引用。
```

## 必填信息

每篇文章建议至少填写这些字段：

```yaml
layout: post
title: "文章标题"
date: 2026-05-24
topic: "杂谈"
tags: ["游戏", "感想"]
summary: "文章摘要。"
```

字段含义：

- `layout`: 固定写 `post`。
- `title`: 文章标题。
- `date`: 发布日期，格式用 `YYYY-MM-DD`。
- `topic`: 大主题，目前建议从 `杂谈`、`技术`、`研究` 中选择。
- `tags`: 更细的标签，可以写多个。
- `summary`: 首页和文章列表展示的短摘要。

## 文件命名规则

Jekyll 文章建议放在 `_posts/` 文件夹里，并使用这种文件名：

```text
YYYY-MM-DD-english-slug.md
```

例子：

```text
_posts/2026-05-24-first-post.md
_posts/2026-06-02-game-notes.md
_posts/2026-06-10-learning-git.md
```

文件名里建议使用英文、小写字母和连字符。文章标题可以正常写中文。

## 主题与标签

当前主题暂定为三类：

```text
杂谈：随笔、游戏、生活、感想
技术：前端、GitHub Pages、工具、笔记
研究：哲思、读书、论文、问题
```

一篇文章只能选一个主要 `topic`，但可以有多个 `tags`。

例子：

```yaml
topic: "杂谈"
tags: ["游戏", "哲思", "感想"]
```

## 如何插入图片

把图片放进：

```text
assets/images/
```

然后在 Markdown 里这样引用：

```markdown
![图片说明](/assets/images/example.jpg)
```

如果图片只属于某篇文章，也可以用更具体的名字：

```text
assets/images/2026-05-24-coffee-note.jpg
```

## 本地预览

推荐使用独立 conda 环境维护博客。这个环境不属于项目文件，只需要在本机创建一次：

```bash
conda create -n GithubBlog -c conda-forge ruby=3.2 make pkg-config
conda activate GithubBlog
```

然后安装 `Gemfile` 里的 Jekyll/GitHub Pages 依赖：

```bash
bundle install
```

之后启动本地 Jekyll 服务：

```bash
bundle exec jekyll serve
```

然后打开：

```text
http://localhost:4000
```

如果你只是想快速看图片、CSS 这类静态文件，`python3 -m http.server` 仍然能打开文件；但它不会渲染 Jekyll 的模板和 Markdown 文章。

## 本地构建检查

进入 `GithubBlog` 环境并安装依赖后，可以运行：

```bash
bundle exec jekyll build
```

如果构建成功，生成的网站会出现在：

```text
_site/
```

## 发布到 GitHub Pages

写完文章后，提交并推送：

```bash
git add .
git commit -m "Add new post"
git push
```

GitHub Pages 会自动重新构建网站。通常等一小会儿后，文章就会出现在：

```text
https://zzr2311559.github.io
```

## 当前 Jekyll 结构

当前仓库已经包含：

```text
_config.yml
_layouts/default.html
_layouts/post.html
_posts/
```

首页、文章列表、主题页会自动读取 `_posts/` 里的 Markdown 文章。
