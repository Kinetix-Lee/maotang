const Koa = require("koa")
const next = require("next")
const Router = require("koa-router")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require("koa-bodyparser")

const Translate = require("google-translate-open-api")

const startServer = async () => {
  try {
    await app.prepare()
    const server = new Koa()
    const router = new Router()

    router
      .get("/", async ctx => {
        await app.render(ctx.req, ctx.res, "/index", ctx.query)
        ctx.respond = false
      })
      .get("/page/:id", async ctx => {
        await app.render(ctx.req, ctx.res, "/index", ctx.query)
        ctx.respond = false
      })

    router
      .get("/blog/:id", async ctx => {
        await app.render(ctx.req, ctx.res, "/article", ctx.query)
        ctx.respond = false
      })
      .get("/article", async ctx => {
        await app.render(ctx.req, ctx.res, "/article", ctx.query)
        ctx.respond = false
      })

    router
      .get("/archive", async ctx => {
        await app.render(ctx.req, ctx.res, "/archive", ctx.query)
        ctx.respond = false
      })
      .get("/archive/:id", async ctx => {
        await app.render(ctx.req, ctx.res, "/category", ctx.query)
        ctx.respond = false
      })

    router.use(bodyParser())

    router.post("/translate", async ctx => {
      const arr = ctx.request.body.arr,
        lang = ctx.request.body.lang || "en"
      res = await Translate.default(arr, {
        tld: "cn",
        to: lang
      })
      ctx.body = res.data
    })

    router.get("*", async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      ctx.set("Access-Control-Allow-Origin", "*")
      ctx.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
      )
      ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
      await next()
    })

    server.use(router.routes())

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  } catch (err) {}
}

const main = async () => {
  startServer()
}

main()
