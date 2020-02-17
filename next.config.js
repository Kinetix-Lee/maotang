const withCss = require("@zeit/next-css")
const withLess = require("@zeit/next-less")

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {}
}

module.exports = withCss(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true
    }
  })
)

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
