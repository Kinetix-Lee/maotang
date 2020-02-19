Web 存储全攻略。

## 1. Cookie

更详细的说明：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

不是「小甜饼」，而是：某些网站为了辨别用户身份，**进行 Session 跟踪而储存在用户本地终端上的数据**（通常经过加密），由用户客户端计算机暂时或永久保存的信息。

**特点：**以 key = value 的形式存储，如

```
document.cookie = "user=meeken; expires=Thu, 18 Dec 2019 12:00:00 GMT";
// 过期时间为 UTC 或 GMT 时间
```

**大小限制：** ≤ 4kb

**个数限制：** ≤ 20（IE6），≤ 50（Firefox，IE7+），不设限（Chrome，Safari）

**使用场景：**

1. 保存用户登录状态
2. 跟踪用户行为
3. 个性化定制
4. 创建购物车 …等等

**优点：**

1. 无兼容问题（所有浏览器都支持）
2. 可作为同域、跨页面全局变量（同一个网站中所有页面共享一套 cookie）

**缺点：**

1. 大小有限制
2. 容易被清除，不能永久储存
3. 在请求中被直接携带，攻击者无需了解其含义

## 2. SessionStorage

SessionStorage 作为 WebStorage 特性的 API 之一，用于临时保存同一窗口（或标签页）的数据，在关闭窗口或标签页之后将会删除这些数据，但刷新页面或使用“前进”、“后退按钮”后 sessionStorage 仍然存在。

**特点：**

1. WebStorage 特性的 API 之一
2. **关闭会话窗口后即清除**
3. 内置 CRUD 方法

   sessionStorage.setItem('user', 'meeken') //增 / 改
   sessionStorage.getItem('user') // 查
   sessionStorage.removeItem('user') // 删，clear() 为全删

## 3. LocalStorage

LocalStorage 同为 WebStorage 特性的 API 之一。**localStorage 为浏览器持久存储提供了可能**，解决了 cookie 大小、时效有限等问题。

**特点：**

1. 持久化存储数据，若非主动删除，会一直存在
2. 和 sessionStorage 一样，提供了 CRUD 方法

   localStorage.setItem('user', 'meeken') //增 / 改
   localStorage.getItem('user') // 查
   localStorage.removeItem('user') // 删

## 4. userData

IE 支持的数据存储方法，但是很少用到。