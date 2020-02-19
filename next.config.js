const withCss = require("@zeit/next-css")
const withLess = require("@zeit/next-less")

const marked = require("marked")

const renderer = new marked.Renderer()

marked.setOptions({
  renderer: renderer,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

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
                pedantic: true,
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

/* 
module.exports = {
  webpack: function(config, { isServer }) {
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
              pedantic: true,
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
} */

// module.exports = withLess(
//   withCss({
//     webpack: (config, { isServer }) => {
//       if (isServer) {
//         const antStyles = /antd\/.*?\/style\/css.*?/
//         const origExternals = [...config.externals]
//         config.externals = [
//           (context, request, callback) => {
//             if (request.match(antStyles)) return callback()
//             if (typeof origExternals[0] === "function") {
//               origExternals[0](context, request, callback)
//             } else {
//               callback()
//             }
//           },
//           ...(typeof origExternals[0] === "function" ? [] : origExternals)
//         ]

//         config.module.rules.unshift({
//           test: antStyles,
//           use: "null-loader"
//         })

//         config.module.rules.push({})
//       }
//       return config
//     }
//   })
// )
