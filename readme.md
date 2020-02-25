一款基于 React、Next.js 的轻博客框架。

## 猫汤

猫汤是一款我自用的，简洁的、SEO 友好的博客框架，基于 React。

[![][1]](https://github.com/Meeken1998/maotang)
[![][2]](https://maotang.meek3n.cn)

## 特点

1. 极简风格，昼夜双版
2. 文档式阅读体验
3. 渲染 markdown，无数据库依赖
4. 速度优于一些 PHP 博客框架
5. SEO 友好
6. 自动化部署脚本

## 使用说明

### 下载

```shell
$ git clone https://github.com/Meeken1998/maotang
$ cd maotang
```

### 安装依赖

```shell
$ yarn #推荐使用 yarn 来安装依赖，也可以用 npm install
```

### 启动

**Linux/Mac 环境**

```shell
$ yarn dev-server #调试
$ yarn build #编译
$ yarn server
```

**Windows 环境**

```shell
$ yarn dev-server-win #调试
$ yarn build #编译
$ yarn server-win
```

### 使用

**网站信息配置**

请找到 `./src/public/static/config/maotang.json`，修改网站的配置信息（Next.js 约定中间层与浏览器端共用的静态目录为 ./src/public/static/）。

```json
{
  "site": {
    "title": "猫汤",
    "description": "喜欢彦彦猫的前端程序员",
    "keywords": "随笔,前端,日记"
  },

  "menu": [
    {
      "href": "/",
      "context": "首页"
    },
    {
      "href": "/archive",
      "context": "归档"
    },
    {
      "href": "/search",
      "context": "搜索"
    },
    {
      "href": "/category/项目",
      "context": "项目"
    }
  ]
}
```

**新建/修改文章**

- 文章存放目录： `./src/public/static/article/content`
- 文章标题信息： `./src/public/static/article/list.json`

或者使用更优雅的自动化部署脚本（开发中 XD）。

### 联系作者

- Github [@Meeken1998](https://github.com/Meeken1998)
- 博客 [@meek3n.cn](https://meek3n.cn)

### 协议

WTF

[1]: https://img.shields.io/github/license/Meeken1998/maotang
[2]: https://img.shields.io/badge/site-%E6%BC%94%E7%A4%BA-red
