在 Koa.js 中使用 JsonWebToken

## 0.准备

首先，需要了解 [Koa.js](https://koa.bootcss.com/) 和 [JsonWebToken](https://jwt.io/) 是什么。

简单地说：

1. **Koa.js** 是一个 Node.js 的服务端框架，比 Express.js 书写更优雅
2. **JsonWebToken** 简称 JWT，是目前最流行的跨域认证解决方案

本文是我在开发一款信息展示小程序时，使用 Koa 与 JWT 时的笔记，如有表述错误，请勘误。

### 0.1 安装依赖

由于 Koa.js 所有方法均为异步，项目中也使用了一些 ES6 的语法，需要使用 `babel` 进行转换。

```shell
$ yarn add babel-cli babel-preset-env --dev # babel-cli 和 es6+ 最新语法
$ yarn add babel-register --dev # require 钩子
$ yarn add babel-polyfill --dev # 使 node 支持高版本的一些全局对象
$ yarn add koa koa-router koa-bodyparser koa-jwt # koa 套件
$ yarn add jsonwebtoken # jsonwebtoken 库
```

### 0.2 目录结构

建立一个最简单的工程目录。

```
| app.js
| main.js
| module/
| | —— token.js
| | —— database.js
| | —— result.js
| package.json
```

1. `app.js`：项目入口文件
2. `main.js`：实际启动文件
3. `module/token.js`：用于 token 处理的模块
4. `module/database.js`：用于数据库操作的模块
5. `module/result.js`：用于格式化数据返回的模块
6. `package.json`：项目描述文件

## 1. 开始

可以先喝杯咖啡再开始。

### 1.1 配置 ES6 环境

**1.1.1 编辑`package.json`**

```json
{
  "dependencies": {
    "jsonwebtoken": "^8.5.1",
    "koa": "^2.11.0",
    "koa-bodyparser": "^4.2.1",
    "koa-jwt": "^3.6.0",
    "koa-router": "^7.4.0"
  },
  "devDependencies": {
    "@babel/plugin-transform-async-to-generator": "^7.8.3",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-register": "^6.26.0"
  },
  + "scripts": {
  +  "start": "clear && node ./app"
  + }
}
```

**1.1.2 编辑`app.js`（入口文件）**

```js
console.log("\x1B[36m%s\x1B[0m", "正在启动...")

require("babel-polyfill")

require("babel-register")({
  presets: ["env"]
})

module.exports = require("./main.js")
```

**1.1.3 编辑`main.js`（实际启动文件）**

```js
import Koa from "koa"
import Router from "koa-router"
import bodyParser from "koa-bodyparser"
import koaJwt from "koa-jwt"

import { setToken, verifyToken, checkToken } from "./module/token"
import { fail, success } from "./lib/result"

const app = new Koa()

/* 设置 api 路由前缀 */
const router = new Router({
  prefix: "/api/v1"
})

/* 简单粗暴地配置跨域 */
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  )
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
  if (ctx.method == "OPTIONS") {
    ctx.body = 200
  } else {
    /* 鉴权的方法，详见 module/token.js */
    await checkToken(ctx, next)
  }
})

/**
 * 统一错误处理
 * 注意：使用 koa-jwt 后，鉴权失败的情况，
 * 状态码为 401
 */
app.use(async (ctx, next) => {
  try {
    await next()
    if (parseInt(ctx.status) === 404) {
      ctx.response.body = fail(404, "电波无法到达呢")
    }
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = fail(
      ctx.response.status,
      (ctx.response.status === 401 && "登录状态已过期或未登录") || err.message
    )
  }
})

// 未完，接 1.1.4
```

**1.1.4 在 `main.js` 中使用 koa-jwt**

```js
// 接 1.1.3

/* koa-jwt */
const pathWhiteList = [
    "/token",
    "/user",
    "/wx",
    "/article",
    "/label",
    "/mdn",
    "/token2user"
  ],
  regWhiteList = pathWhiteList.map(item => new RegExp("^/api/v1" + item))

console.log("以下路由不需要鉴权：")
console.info(pathWhiteList)

app.use(
  koaJwt({ secret: "你的 JWT Secret" }).unless({
    path: regWhiteList
  })
)

/* koa-bodyparser，能处理接收到的 post 等方法的请求体 */
app.use(bodyParser())

/* 默认路由 */
router.all("/", async (ctx, next) => {
  ctx.body = {
    hi: "hello, world!",
    author: "Meeken",
    github: "https://github.com/Meeken1998",
    site: "meek3n.cn"
  }
  await next()
})
```

-未完-