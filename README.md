# zzr2311559 的个人博客

这是一个部署在 GitHub Pages 上的个人博客框架。

## 文件结构

```text
.
├── index.html              首页
├── posts.html              文章列表
├── tags.html               主题索引
├── about.html              关于页面
├── styles.css              全站样式
├── search.js               首页搜索逻辑
├── posts/
│   └── first-post.html     示例文章
└── assets/
    └── images/             图片、背景图、文章配图
```

## 如何新增一篇文章

1. 复制 `posts/first-post.html`。
2. 把复制出来的文件改名，例如 `posts/my-new-post.html`。
3. 修改新文件里的标题、日期、标签和正文。
4. 打开 `posts.html`，复制一段文章条目，把链接改成新文章的路径。
5. 打开 `index.html`，在文章列表里添加同样的文章条目，并保留 `data-post`，这样首页搜索才能检索到它。
6. 打开 `tags.html`，把文章链接加到对应主题下面。

## 内容组织建议

先用主题做大分类，再用 tags 做细索引。当前主题暂定为：

```text
杂谈：#随笔 #游戏 #生活 #感想
技术：#前端 #GitHub Pages #工具 #笔记
研究：#哲思 #读书 #论文 #问题
```

一篇文章可以属于一个主题，也可以带多个 tags。这样即使以后内容方向变多，网站也能保持简洁。

## 如何更换首页图片

首页当前使用：

```text
assets/images/coffee-shoujo.jpg
```

如果想换成另一张图片，把新图片放进 `assets/images/`，然后在 `index.html` 中找到：

```html
<img src="assets/images/coffee-shoujo.jpg" alt="暖色咖啡店里的安静片刻">
```

把 `src` 改成新图片路径即可。

## 如何更换背景图

把图片放到 `assets/images/` 文件夹，并命名为：

```text
background.jpg
```

然后在 `styles.css` 中找到这一行：

```css
--background-image: none;
```

改成：

```css
--background-image: url("assets/images/background.jpg");
```

如果图片文件名不同，把 `background.jpg` 改成自己的文件名。
