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
| controller/
| | —— article.js
| | —— user.js
| package.json
```

1. `app.js`：项目入口文件
2. `main.js`：实际启动文件
3. `module/token.js`：用于 token 处理的模块
4. `module/database.js`：用于数据库操作的模块
5. `module/result.js`：用于格式化数据返回的模块
6. `controller/article.js`： 文章的控制器
7. `controller/user.js`：用户的控制器
8. `package.json`：项目描述文件

其余文件可以根据需求自建。

## 1. 开始

可以先喝杯咖啡再开始。

### 1.1 配置 ES6 环境

#### 1.1.1 编辑`package.json`

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

#### 1.1.2 编辑 `app.js`（入口文件）

```js
console.log("\x1B[36m%s\x1B[0m", "正在启动...")

require("babel-polyfill")

require("babel-register")({
  presets: ["env"]
})

module.exports = require("./main.js")
```

#### 1.1.3 编辑 `main.js`（实际启动文件）

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

#### 1.1.4 在 `main.js` 中使用 koa-jwt

```js
// 接 1.1.3

/* koa-jwt */
const pathWhiteList = [
    "/article", // 假设有一个接口用来获取文章
    "/login" // 登录接口
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

/* 添加几个示例路由 */
router
  .get("/article", async (ctx, next) => {
    ctx.body = await require("./controller/article").get(ctx, next)
  })
  .get("/article/:id", async (ctx, next) => {
    ctx.body = await require("./controller/article").get(ctx, next, true)
  })

router
  .post("/user", async (ctx, next) => {
    ctx.body = await require("./controller/user").register(ctx, next)
  })
  .post("/login", async (ctx, next) => {
    ctx.body = await require("./controller/user").login(ctx, next)
  })
  .get("/user/:id", async (ctx, next) => {
    ctx.body = await require("./controller/user").user(ctx, next)
  })

console.log("\x1B[36m%s\x1B[0m", `🐶 app 运行在 9527 端口`)
app.listen(9527)

// -EOF-
```

## 2.完善

到目前位为止，一个简单的 Koa.js 的要素都具备了，我们还需要完善：

1. `module/token.js`：token 模块
2. `controller/user.js`：用户控制器

下面主要介绍 `module/token.js`，不具体展开写用户控制器的实现。

### 2.1 编辑 `module/token.js`

1.1.3 中，使用了 `import { setToken, verifyToken, checkToken } from "./module/token"` 语句，引入并解构了 token 模块。我们需要先封装这三个方法。

为了实现以下功能，使用了 `jsonwebtoken` 这个库，可以在 [jsonwebtoken-npm](https://www.npmjs.com/package/jsonwebtoken) 中查看 API 和用法。

#### 2.1.1 `setToken`

首先，引入 jsonwebtoken 库，并先完成 `setToken` 方法。

```js
import jwt from "jsonwebtoken"

/**
 * @description 生成一个 token。
 * @param {String}  userName 用户名，默认为空
 * @param {Number} userId 用户 ID，默认为 0
 * @param {Number} expiresHours 令牌过期时间（小时），默认为 1
 * @return {String} token 值
 */
const setToken = function(userName = "", userId = 0, expiresHours = 1) {
  const token = jwt.sign(
    {
      username: userName,
      _id: userId
    },
    config.authorization.jwt,
    { expiresIn: expiresHours + "h" }
  )
  return token
}

// 接 2.1.2
```

#### 2.1.2 `verifyToken`

考虑到 `token` 通常在请求头中以 `authorization: Bearer xxxxxxx.xxxxxx.xxx` 的形式传入。为了应对这个情况要稍作处理。

```js
// 接 2.1.1

/**
 * @description 解析一个 token，支持传入 header 内的 authorization 的值。
 * @param {String} token 令牌值
 * @param {Boolean} isNormal 是否直接处理 token，默认为 true。若为 false 则为 header 传入情况。
 * @return {any} token 的解析对象或者 null
 */
const verifyToken = function(token = "", isNormal = true) {
  try {
    if (typeof token === "string" && token.includes(" ") && !isNormal) {
      token = token.split(" ")[1]
    }
    return jwt.verify(token, "你的 JWT Secret")
  } catch {
    return null
  }
}

// 接 2.1.3
```

#### 2.1.3 `checkToken`

调用 `verifyToken` 后，若 `token` 有效且未过期，会返回一个对象。

对象大概是这样的：

```js
{
  iat: 1532135735, // token 创建时间戳（10 位， 精确到秒）
  exp: 1532136735, // token 过期时间戳
  username: 'Meeken', // 用户名
  _id: 1' // 用户 id
}
```

我认为需要封装一个 `checkToken` 方法，来校验 token 的合法性。

**PS：在这里我没有直接校验，而是将 `token` 存入 Koa 的全局对象`ctx.state` 中，以保证所有上下文中都可以访问到用户信息。**

```js
// 接 2.1.2

/**
 * @description main.js 中用来存储用户信息的方法。
 * @param {Object} ctx ctx
 * @param {Object} next next
 * @return void
 */
const checkToken = async function(ctx, next) {
  /* 鉴权 */
  const token = ctx.headers.authorization
  if (token) {
    const userInfo = verifyToken(token, false)
    if (
      typeof userInfo === "object" &&
      typeof userInfo._id === "number" &&
      typeof userInfo.username === "string"
    ) {
      // 用户登录
      if (!ctx.state) {
        ctx.state = {
          userInfo
        }
      } else {
        ctx.state.userInfo = userInfo
      }
    }
    await next()
  } else {
    await next()
  }
}

// 输出三个封装好的方法
module.exports = {
  setToken,
  verifyToken,
  checkToken
}

// -EOF-
```

## 总结

这篇笔记记录了我的 `Koa.js` 结合 `JsonWebToken` 的使用方法，这也是使用 Koa 搭建服务器的比较好的实践。

文中没有过多的剖析原理，如需知其所以然，可以看看 [《辩证的眼光看待 JWT 这个知识点》](https://mp.weixin.qq.com/s/QDTRkPmgScM9GZpwAW8VEQ)。简单地说，JWT 被用来在多个服务之间鉴权、确认客户端用户身份。

JWT 不是银弹，使用前请判断场景，如果是为单个应用设计「用户模块」，也许账号密码或者单点登录是更好的选择。
