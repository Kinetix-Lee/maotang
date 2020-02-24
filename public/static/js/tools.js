// const translate = require("@vitalets/google-translate-api")

const isNight = function() {
  return new Date().getHours() >= 18 || new Date().getHours() <= 6
  //return true
}

const formatDate = function(date) {
  let tmp = new Date(date)
  tmp = tmp.toLocaleDateString().split("/")
  tmp = tmp.map(item => (item.length === 1 ? "0" + item : item))
  return tmp.join("/")
}

const getSearchParam = function(url, key) {
  if (typeof url == "string" && url.includes("?")) {
    url = url.split("")
    url.splice(0, 1)
    url = url.join("")
    url = url.split("=")
    if (url.indexOf(key) > -1) {
      return url[url.indexOf(key) + 1]
    } else {
      return ""
    }
  } else {
    return ""
  }
}

const getRandomKey = function() {
  return "p_" + new Date().valueOf() + parseInt(Math.random() * 10000)
}

const md2html = function(md) {
  let html =
    "Web 存储全攻略。\n\n## 1. Cookie\n\n更详细的说明：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)\n\n不是「小甜饼」，而是：某些网站为了辨别用户身份，**进行 Session 跟踪而储存在用户本地终端上的数据**（通常经过加密），由用户客户端计算机暂时或永久保存的信息。\n\n**特点：**以 key = value 的形式存储，如\n\n    document.cookie = \"user=meeken; expires=Thu, 18 Dec 2019 12:00:00 GMT\";\n    // 过期时间为 UTC 或 GMT 时间\n\n**大小限制：** ≤ 4kb\n\n**个数限制：** ≤ 20（IE6），≤ 50（Firefox，IE7+），不设限（Chrome，Safari）\n\n**使用场景：**\n\n1. 保存用户登录状态\n2. 跟踪用户行为\n3. 个性化定制\n4. 创建购物车 …等等\n\n**优点：**\n\n1. 无兼容问题（所有浏览器都支持）\n2. 可作为同域、跨页面全局变量（同一个网站中所有页面共享一套 cookie）\n\n**缺点：**\n\n1. 大小有限制\n2. 容易被清除，不能永久储存\n3. 在请求中被直接携带，攻击者无需了解其含义\n\n## 2. SessionStorage\n\nSessionStorage 作为 WebStorage 特性的 API 之一，用于临时保存同一窗口（或标签页）的数据，在关闭窗口或标签页之后将会删除这些数据，但刷新页面或使用“前进”、“后退按钮”后 sessionStorage 仍然存在。\n\n**特点：**\n\n1. WebStorage 特性的 API 之一\n2. **关闭会话窗口后即清除**\n3. 内置 CRUD 方法\n\n    sessionStorage.setItem('user', 'meeken') //增 / 改\n    sessionStorage.getItem('user') // 查\n    sessionStorage.removeItem('user') // 删，clear() 为全删\n\n## 3. LocalStorage\n\nLocalStorage 同为 WebStorage 特性的 API 之一。**localStorage 为浏览器持久存储提供了可能**，解决了cookie 大小、时效有限等问题。\n\n**特点：**\n\n1. 持久化存储数据，若非主动删除，会一直存在\n2. 和 sessionStorage 一样，提供了 CRUD 方法\n\n    localStorage.setItem('user', 'meeken') //增 / 改\n    localStorage.getItem('user') // 查\n    localStorage.removeItem('user') // 删\n\n## 4. userData\n\nIE 支持的数据存储方法，但是很少用到。"
  return html
}

// const translatePage = function(html, cb) {
//   translate(html, { to: "zh-CN" })
//     .then(res => {
//       cb(res.text)
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

const parseUrl = function(url = "") {
  try {
    let parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
      result = parse_url.exec(url),
      names = [
        "url",
        "scheme",
        "slash",
        "host",
        "port",
        "path",
        "query",
        "hash"
      ],
      obj = {}
    names.forEach((item, index) => {
      if (result[index] !== undefined) {
        obj[item] = decodeURI(result[index])
      }
    })

    if (obj["query"] && obj["query"].includes("=")) {
      let query = {}
      if (obj["query"].includes("&")) {
        obj["query"].split("&").forEach(item => {
          if (typeof item == "string" && item.includes("=")) {
            let tmp = item.split("=")
            query[tmp[0]] = tmp[1]
          }
        })
      } else {
        let tmp = obj["query"].split("=")
        query[tmp[0]] = tmp[1]
      }
      obj["query"] = JSON.parse(JSON.stringify(query))
    }
    return obj
  } catch (err) {
    return null
  }
}

module.exports = {
  isNight,
  getSearchParam,
  getRandomKey,
  md2html,
  parseUrl,
  formatDate
  // translatePage
}
