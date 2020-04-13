const withCss = require("@zeit/next-css")
const withLess = require("@zeit/next-less")

const marked = require("marked")

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

const renderer = new marked.Renderer()

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {}
}

module.exports = withCss(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    webpack(config, options) {
      config &&
        config.module &&
        config.module.rules instanceof Array &&
        config.module.rules.push({
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                // pedantic: true,
                renderer
              }
            }
          ]
        })
      config.node = {
        fs: "empty"
      }
      return config
    }
  })
)

